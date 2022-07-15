const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("views", "./src/views");
app.set("view engine", "pug");

const productos = [
  {
    title: 'Psicosis',
    price: 3400,
    thumbnail: "https://i.pinimg.com/originals/fe/38/60/fe38605c43aedc7581d376252ed24867.png",
  },
];

const PORT = 8082;
const srv = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en http://localhost:${PORT}`);
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
  res.render("cargaProducto", {});
});

app.get("/productos", (req, res) => {
  res.render("vistaProductos", {
    productos,
  });
});

app.post("/productos", (req, res) => {
  const { body } = req;
  productos.push(body);
  res.render("vistaProductos", {
    productos,
  });
});
