const conn = require('./lib/connections.js')

async function main(){
    const mariaDB = require('knex')(conn.mariaDb)
    const sqlite = require('knex')(conn.sqlite)
    
    // Drop tabla Películas
    await mariaDB.schema.dropTableIfExists('productos')
        .catch(err => {
            console.log('Error al dropear tabla de Películas')
            console.log(err)
        })
        
    // Drop tabla Mensajes
    await sqlite.schema.dropTableIfExists('mensajes')
        .catch(err => {
            console.log('Error al dropear tabla de Mensajes')
            console.log(err)
        })

    mariaDB.destroy()
    sqlite.destroy()
}

main()