
exports.mariaDb = {
    client: 'mysql',
    connection: { 
        host: '127.0.0.1',
        user: 'roots',
        password: '',
        database: 'terror'
    }
}

exports.sqlite = {
    client: 'sqlite3',
    connection: { filename: './DB/ecommerce.db'}
}