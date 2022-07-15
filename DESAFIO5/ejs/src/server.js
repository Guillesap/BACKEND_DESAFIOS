const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("views", "./src/views");
app.set("view engine", "ejs");

const productos = [
  {
    title: 'Anabelle Welcome Home',
    price: 3500,
    thumbnail: "https://media.vogue.es/photos/5d2782a1695efa000881bb80/master/pass/ANNABELLE%20VUELVE%20A%20CASA%20MAIN.jpg",
  },
];

const PORT = 8080;
const srv = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en http://localhost:${PORT}`);
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
  res.render("index", {
    productos,
    cargar: true,
  });
});

app.get("/productos", (req, res) => {
  res.render("index", {
    productos,
    cargar: false,
  });
});

app.post("/productos", (req, res) => {
  const { body } = req;
  productos.push(body);
  res.render("index", {
    productos,
    cargar: false,
  });
});
