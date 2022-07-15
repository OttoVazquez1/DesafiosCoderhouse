const {crearTablaMariaDb} = require('./create_tablesProd');
const {crearTablaSqlite} = require('./create_tablesMsg');

try {
    crearTablaSqlite()
    crearTablaMariaDb()
} catch (error) {
    console.log(error);
}