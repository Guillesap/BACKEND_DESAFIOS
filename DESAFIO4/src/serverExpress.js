
const express = require("express");
const { Router } = express;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


const routerPeliculas = new Router();
let peliculas = [];


function checkId(req, res, next) {
  if (peliculas.length === 0) {
    req.peliId = 1;
  } else {
    req.peliId = peliculas.length + 1;
  }
  next();
}
/* ----------------------------- GET ----------------------------- */
routerPeliculas.get("/", (req, res) => {
  res.json({
    peliculas,
  });
});
routerPeliculas.get("/:id", (req, res) => {
  const { id } = req.params;
  const pelicula = peliculas.find((p) => p.id == id);
  res.json({
    pelicula,
  });
});
/* ------------------------------ POST ----------------------------- */

routerPeliculas.post("/", checkId, (req, res) => {
  let data = req.body;
  let id = req.peliId;
  data = { ...data, id };
  console.log(data);
  peliculas.push(data);
  res.json(peliculas);
});

/* -----------------------------  PUT ----------------------------- */

routerPeliculas.put("/:id", (req, res) => {
  const { id } = req.params;
  let pelicula = peliculas.find((p) => p.id == id);
  let data = req.body;
  if (pelicula) {
    const peliculaIndex = peliculas.findIndex((p) => p.id == id);
    peliculas[peliculaIndex] = data;
    res.json({
      peliculas,
    });
  } else {
    res.json({ error: "Pelicula no encontrada" });
  }
});

/* ---------------------------- DELETE --------------------------- */
routerPeliculas.delete("/:id", (req, res) => {
  const { id } = req.params;
  let pelicula = peliculas.find((p) => p.id == id);
  if (pelicula) {
    peliculas = peliculas.filter((p) => p.id != id);
    res.json({
      peliculas,
    });
  } else {
    res.json({ error: "Pelicula no encontrada" });
  }
});

/* ------------------------------- Router ------------------------------- */

app.use("/api/peliculas", routerPeliculas);

/* ---------------------------- Puerto --------------------------- */
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`El Server express se ha iniciado en ${PORT}`);
});
server.on("error", (error) => {
  console.log(error);
});

