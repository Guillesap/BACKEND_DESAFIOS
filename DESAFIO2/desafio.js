const fs = require('fs')

class Contenedor {
    constructor(name) {
        this.fileName = name
        this.countID = 0
        this.content = []
    }

    async write() { //Método que escribe/sobreescribe
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.content))
    }

    save(object) {
        this.countID++ //Aumento la propiedad que va guardando el ID más alto
        object["id"] = this.countID //Agrego la propiedad id al objeto pasado como parámetro
        this.content.push(object) //Agrego el objeto al contenido(array)
        this.write() //Agrego el objeto al archivo
        return `El id del objeto añadido es ${this.countID}` //Retorna el ID 
    }

    async getAll() { //Devuelve un array con los objetos presentes en el archivo
        return this.content
    }

    getById(id) { //Recibe un id y devuelve el objeto con ese id, o null si no está.
        let result
        if (this.content !== []) {
            result = this.content.find(x => x.id === id)
            if (result === undefined) {
                result = null
            }
        } else {
            result = 'El archivo se encuentra vacío'
        }
        return result
    }

    deleteById(id) { //Elimina del archivo el objeto con el id que se busca
        let result
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent
            this.write() //Se sobreescribe el archivo
            result = 'OK'
        } else {
            result = `El archivo está vacío`
        }
        return result
    }

    async deleteAll() { //Elimina todos los objetos presentes en el archivo.
        this.content = this.content.splice(0, this.content.length)
        this.write()
    }
}

module.exports = Contenedor