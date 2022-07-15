const app = require('./app')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Productos = require('./src/api/class/productos')
const storeProd = new Productos()

const historialChat = require('./src/api/class/historialChat')
const historial = new historialChat()


io.on('connection', async (socket) => {
    console.log('Un cliente conectó');

    //productos
    socket.emit("productos", await storeProd.getAllProductos())

    socket.on("guardarNuevoProducto", async (nuevoProducto) => {
        await storeProd.saveProductos(nuevoProducto)

        io.sockets.emit("productos", await storeProd.getAllProductos())
    })
     
    //mensajes
    
    socket.emit("messages", await historial.loadMessage())

    socket.on("messegesNew", async (data) => {

        await historial.saveMessage(data)
        io.sockets.emit("messages", await historial.loadMessage())
    })

});

module.exports = httpServer