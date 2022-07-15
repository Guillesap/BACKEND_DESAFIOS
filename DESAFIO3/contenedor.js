class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async save(producto) {
    let productos = [];
    const fs = require("fs");
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      productos = JSON.parse(contenido);
    } catch {}
    producto.id = this.leerMaxId(productos) + 1;
    productos.push(producto);
    console.log("Producto Guardado: " + JSON.stringify(producto));
    try {
      await this.guardarProductos(productos);
    } catch (err) {
      console.log(`Error al Guardar el Archivo: ${err}`);
    }
  }

  leerMaxId(productos) {
    let id = 1;
    productos.map((prod) => {
      if (prod.id > id) {
        id = prod.id;
      }
    });
    return id;
  }
  async guardarProductos(productos) {
    const fs = require("fs");
    try {
      await fs.promises.writeFile(this.archivo, JSON.stringify(productos));
      console.log("Películas Guardadas.");
    } catch (err) {
      console.log(`Error al Guardar el Archivo: ${err}`);
    }
  }

  async getAll() {
    const fs = require("fs");
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      const productos = JSON.parse(contenido);
      return productos;
    } catch (err) {
      console.log("No existen Péliculas.");
      return null;
    }
  }

  async getById(Number) {
    try {
      const productos = await this.getAll();
      if (productos != null) {
        const prod = productos.find((prod) => prod.id == Number);
        return prod;
      } else {
        console.log("No existen Películas.");
        return null;
      }
    } catch (err) {
      console.log("No existen Películas.");
      return null;
    }
  }

  async deleteById(Number) {
    let productos = [];
    const fs = require("fs");
    productos = fs.readFile(this.archivo, "utf-8", (error, contenido) => {
      if (error) {
        console.log("No existen Películas. Nada para Borrar");
      } else {
        productos = JSON.parse(contenido);
        const prod = productos.find((prod) => prod.id == Number);
        try {
          if (prod.length == 0) {
            console.log(`No se Encontró el Producto con ID ${Number}`);
          } else {
            const i = productos.indexOf(prod);
            console.log(`Indice ${i}`);
            productos.splice(i, 1);
            this.guardarProductos(productos);
            console.log(`Producto con ID ${Number} Eliminado !!!!`);
          }
        } catch {
          console.log(`No se Encontró el Producto con ID ${Number}`);
        }
      }
    });
  }

  deleteAll() {
    const fs = require("fs");
    fs.unlink(this.archivo, (error) => {
      if (error) {
        console.log("No se Pudieron Eliminar las Películas.");
      } else {
        console.log("Productos Eliminados.");
      }
    });
  }
}

async function Proceso() {
  const prodVhs = new Contenedor("productos.json");

  const prod1 = {
    name: "Scream",
    price: 3500,
    imag: "https://i.pinimg.com/originals/7a/e8/61/7ae861d3cec861c7b94eb3fc8dffe744.png",
  };
  await prodVhs.save(prod1);
  const prod2 = {
    name: "Se lo que hicieron el Verano Pasado",
    price: 3500,
    imag: "https://mx.web.img3.acsta.net/c_310_420/pictures/18/09/26/02/24/0005052.jpg",
  };
  await prodVhs.save(prod2);

  const prod3 = {
    name: "Saw I",
    price: 4500,
    imag: "https://mx.web.img3.acsta.net/c_310_420/pictures/18/09/26/02/24/0005052.jpg",
  };
  await prodVhs.save(prod3);

  const prod = await prodVhs.getById(2);
  console.log("Película Encontrada: " + JSON.stringify(prod));

  const prods = await prodVhs.getAll();
  console.log("Conjunto de Películas: " + JSON.stringify(prods));
}

module.exports = Contenedor;


