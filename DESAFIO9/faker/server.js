const httpServer = require('./socket')

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => console.log('Servidor corriendo en http://localhost:8080/api/productos-test'))
