const { options } = require('./optionsSQLite3')
const knex = require('knex')(options)


async function selectMensajes() {
    try {
        const list = await knex.from("mensajes").select('*')
        return list
    }catch(e){
        throw new Error(`Se produjo un error en selectMensajes: ${e.message}`)
    }
}

module.exports = selectMensajes