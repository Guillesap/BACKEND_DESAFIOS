const { options } = require ('./optionsSQLite3')
const knex = require('knex')(options)


async function insertMensaje(mensaje) {
    
    await knex('mensajes').insert(mensaje)
        .then(() => console.log('Mensaje guardado'))

}

module.exports = insertMensaje