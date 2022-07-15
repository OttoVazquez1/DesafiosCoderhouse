//Requires 
const express = require('express');
const { Server: HttpServer} = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const {opcionesLite} = require('./options.js');
const knex = require('knex')(opcionesLite);

const handlebars = require("express-handlebars")
const { engine } = require("express-handlebars")
const {router, productos} = require('./routes');

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layout',
        partialsDir: __dirname + '/views/partials'
    })
    );
app.set("view engine", "hbs");
app.set("views", "./views")

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static('./public'));
app.use('/', router);

httpServer.listen(8080, () => console.log('Servidor montado con exito en puerto 8080'));






io.on('connection', (socket) => {
    console.log('Usuario conectado');

    io.sockets.emit('producto', productos)

    socket.on('new-message',data => {
        
        knex('Mensajes').insert(data)
        .then(() => console.log('Mensaje insertado'))
        .catch((err) => {console.log(err); throw err})

        /* io.sockets.emit('messages', mensajes); */

        knex('Mensajes').select('*')
        .then((mensajes) => {io.sockets.emit('messages', mensajes)})
        .catch((err) => console.log(err))
    });


})
