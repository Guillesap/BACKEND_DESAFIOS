const { options } = require ('./optionsSQLite3')
const knex = require('knex')(options);

async function createTableMensajes() {
    try {
        await knex.schema.createTable("mensajes", table => {
            table.increments('id')
            table.string('email')
            table.string('textoMensaje')
            table.timestamp('date')
        })
        console.log('La tabla "mensajes" se ha creado')

    }catch(err) { 
        console.log(err); throw err 
    }
    finally {
        knex.destroy();
    }
}

module.exports = createTableMensajes