const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("views", "./src/views");
app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

const productos = [
  {
    title: 'Actividad Paranormal',
    price: 4000,
    thumbnail: "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2018/10/30/15408545306259.jpg",
  },
];

const PORT = 8081;
const srv = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en http://localhost:${PORT}`);
});
srv.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/", (req, res) => {
  res.render("main", {
    productos,
    cargar: true,
  });
});

app.get("/productos", (req, res) => {
  res.render("main", {
    productos,
    cargar: false,
  });
});

app.post("/productos", (req, res) => {
  const { body } = req;
  productos.push(body);
  res.render("main", {
    productos,
    cargar: false,
  });
});
