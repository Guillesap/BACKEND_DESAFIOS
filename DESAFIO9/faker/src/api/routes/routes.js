const express =  require('express')
const myRoutes = express.Router()
const generateRandomProducts = require ('../class/faker')
const listProducts = generateRandomProducts(5)

myRoutes.get('/', (req, res) => {
          res.render('faker');
    })

myRoutes.get('/api/productos-test', (req, res) => {
  res.render('faker', {listProd: listProducts});
})
  

module.exports = myRoutes