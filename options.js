var opcionesLite = {
    client: 'sqlite3',
    connection: { filename: './ecommerce/clase16.db3' },
    useNullAsDefault: true,
  }

const opcionesMariadb = {
    client: "mysql",
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'clase16'
    }
}


module.exports = {opcionesMariadb, opcionesLite}