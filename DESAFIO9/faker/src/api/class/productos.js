const selectProductos = require('../../db/mariaDB/select')
const insertProducto = require('../../db/mariaDB/insert')

class ContenedorProductos{

    async getAllProductos(){
        try {
            const list = await selectProductos()
            return list
        } catch(error){
            throw new Error(`Se produjo un error en getAllProductos: ${error.message}`)
        }
    }

    async saveProductos(producto){
        try{
            const newProducto = {
                title: producto.title,
                price: producto.price,
                url: producto.url,
            }
            await insertProducto(newProducto)
            return newProducto

        } catch(error){
            throw new Error(`Se produjo un error al guardar el nuevo producto: ${error.message}`)
        }
    }
}

module.exports = ContenedorProductos
