const { options } = require ('./optionsMariaDB')
const knex = require('knex')(options);

(async () => {
    try {
        await knex.schema.createTable('productos', table => {
            table.increments('id')
            table.string('title')
            table.float('price')
            table.string('url')
        })
        console.log('La tabla "productos" se ha creado')
            
    }catch(err) { 
        console.log(err); throw err 
    }
    finally {
        knex.destroy();
    }
})()