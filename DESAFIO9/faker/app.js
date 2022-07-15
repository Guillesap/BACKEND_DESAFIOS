const express = require('express')
const app = express()

const myRoutes = require('./src/api/routes/routes')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(myRoutes)

app.set('view engine', 'ejs');
app.set('views','./public/views');

module.exports = app