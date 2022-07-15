const { options } = require ('./optionsMariaDB')
const knex = require('knex')(options)


async function insertProducto(producto) {
    await knex('productos').insert(producto)
        .then(() => console.log('Producto agregado'))

}

module.exports = insertProducto
