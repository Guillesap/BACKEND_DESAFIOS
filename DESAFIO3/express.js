const express = require("express");
const Contenedor = require("./contenedor.js");

const app = express();
const PORT = 3000;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

const srv = app.listen(PORT, () => {
  
  const prod1 = {
    name: "Scream",
    price: 3500,
    imag: "https://i.pinimg.com/originals/7a/e8/61/7ae861d3cec861c7b94eb3fc8dffe744.png",
  };

  const prod2 = {
    name: "Se lo que hicieron el verano pasado",
    price: 3500,
    imag: "https://mx.web.img3.acsta.net/c_310_420/pictures/18/09/26/02/24/0005052.jpg",
  };

  const prod3 = {
    name: "Saw",
    price: 4500,
    imag: "https://i.pinimg.com/736x/97/01/e7/9701e7a30cb64c86755422984ac44d38--horror-posters-movie-posters.jpg",
  };

  console.log(`Servidor http escuchando en el puerto ${srv.address().port}`);
});

srv.on("error", (error) => console.log(`Error en servidor ${error}`));

function contenedorProd(name, price, imag) {
  let html = `<h1 style="background-color: blue;">Película SELECCIONADA</h1>`;
  html += `<br>`;
  html += `<ul>`;
  html += `   <li>Nombre: ${name}</li>`;
  html += `   <li>Precio $: ${price}</li>`;
  html += `<ul>`;
  html += `<img style="width: 400px" src="${imag}" alt="${name}"</td>`;
  html += `<br>`;
  html += `<a href="/"> Inicio</a>`;
  html += `<br>`;
  html += `<a href="/productos"> Ver Películas</a>`;
  return html;
}

app.get("/", (req, res) => {
  res.send(`
        <h1 style="color: red"> Bienvenidos a "VHS VIDEOS" </h1>
        <h2 style="color:green">La tienda Online de venta de VHS y DVD</h2>
        <br>
        <br>
        <a href="/productos"> Ver todas las Películas</a>
        <br>
        <a href="/productoRandom"> Ver una Película</a>
    `);
});

app.get("/productos", async (req, res) => {
  const productos = new Contenedor("productos.json");
  const prods = await productos.getAll();
  let html = `<h1 style="background-color: blue;">Películas en Stock</h1>`;
  html += `<br>`;
  html += `<table>`;
  html += `   <tr>`;
  html += `       <th>Título</th>`;
  html += `       <th>Precio</th>`;
  html += `       <th>Portada</th>`;
  html += `   </tr>`;
  for (let p of prods) {
    html += `<tr>`;
    html += ` <td>${p.name}</td>`;
    html += ` <td> $ ${p.price}</td>`;
    html += ` <td><img style="width: 70px" src="${p.imag}" alt="${p.name}"</td>`;
    html += `</tr>`;
  }
  html += `</table>`;
  html += `<br>`;
  html += `<a href="/"> Inicio</a>`;
  html += `<br>`;
  html += `<a href="/productoRandom"> Ver una Película</a>`;
  res.send(html);
});

app.get("/productoRandom", async (req, res) => {
  const productos = new Contenedor(`productos.json`);
  const prods = await productos.getAll();
  const id = getRandomInt(1, prods.length);
  const prod = prods[id];
  console.log(id);
  console.log(prod);
  res.send(contenedorProd(prod.name, prod.price, prod.imag));
});
