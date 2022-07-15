const {opcionesMariadb} = require('./options.js');
const knexMaria = require('knex')(opcionesMariadb);



async function crearTablaMariaDb(){
    try{
        await knexMaria.schema.createTable('productos', (table) => {
            table.increments("id");
            table.string("nombre");
            table.integer("precio");
            table.string("thumbnail");
            table.integer("timestamp");
        });
        console.log('Table created')
    } catch(err) {
        console.log(err);
    } finally {
        knexMaria.destroy();
    }
}

module.exports = {crearTablaMariaDb}