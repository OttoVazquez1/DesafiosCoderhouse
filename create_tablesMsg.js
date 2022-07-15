const {opcionesLite} = require('./options.js');
const knex = require('knex')(opcionesLite);



async function crearTablaSqlite(){
    try{
        await knex.schema.createTable('Mensajes', (table) => {
            table.string("message");
            table.string('email');
        });
        console.log('Table created')
    } catch(err) {
        console.log(err);
    } finally {
        knex.destroy();
    }
}

module.exports = {crearTablaSqlite}