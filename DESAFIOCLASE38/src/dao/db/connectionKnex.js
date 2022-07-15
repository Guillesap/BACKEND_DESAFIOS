/* Requiero DB y configuración de la misma */
const { options } = require('../../../options/mysqlDB');
const knex = require('knex')(options);

/*Chequear que tabla 'history-chat' esté creada, sino crear tabla historial de chat */
knex.schema.hasTable('history-chat').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('history-chat', table => {
        table.string('user');
        table.string('msg');
        table.string('date');
      }).then(() => console.log('Table history-chat created!')).catch((err)=>console.log(err))
      // .finally(()=> knex.destroy());
    } else {
      console.log('Table history-chat already created!')
    }
  })
  
  
  /*Chequear que tabla 'products' esté creada, sino crear tabla historial de chat */
  knex.schema.hasTable('products').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('products', (table) => {
        table.increments('id').primary();;
        table.string('title');
        table.integer('price');
        table.string('thumbnail');
      }).then(() => console.log('Table products created!')).catch((err)=>console.log(err))
      // .finally(()=> knex.destroy());
    } else {
      console.log('Table products already created!')
    }
  })
  
  module.exports = knex