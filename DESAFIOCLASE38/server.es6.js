/*SERVER */
const express = require("express");
/*EXPRESS */
const app = express();
/*CONSTANTE */
const http = require("http").Server(app);

/*HTTP */
const io = require("socket.io")(http);

/*MODULO HANDLEBARS */
const handlebars = require("express-handlebars");

/*CORS */
const cors = require("cors");
app.use(cors());

/*COMPRESSION*/
const compression = require("compression");
app.use(compression());

/*MULTER*/
const multer = require("multer");
const storageMulter = multer.diskStorage({
  destination: "public/avatar",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
app.use(
  multer({
    storage: storageMulter,
    dest: "public/avatar",
  }).single("avatar")
);

/*PASSPORT */
const passport = require("passport");
/*SESSO*/
const session = require("express-session");
/*COOKIE-PARSER */
const cookieParser = require("cookie-parser");
/*MONGO STORE */
const MongoStore = require("connect-mongo");
/*MONGO ATLAS */
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
/*MONGO STORE */
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://guillesapag:mercyful69@cluster0.eh9yf.mongodb.net/baseterror?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      ttl: 600,
    }),
    secret: "Soy un gran secreto",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 180000,
    },
  })
);
app.use(cookieParser());

/*Middleware Passport:  ANTES QUE LAS RUTAS */
app.use(passport.initialize());
app.use(passport.session());

/*Router */
/*Se requieren las  rutas que va a ofrecer nuestra aplicación */
const routesProducts = require("./src/routes/routesProducts");
const routerProducts = express.Router();
const routesCart = require("./src/routes/routesCart");
const routerCart = express.Router();
const routesMessagesChat = require("./src/routes/routesMessagesChat");
const routerMessagesChat = express.Router();
const routesAuth = require("./src/routes/routesAuth");
const routerAuth = express.Router();
const routesProcessInfo = require("./src/routes/routesProcessInfo");
const routerProcessInfo = express.Router();
const routesRandom = require("./src/routes/routesRandom");
const routerRandom = express.Router();

/*Rutas a las view */
const routesView = require("./src/routes/routesView");
const routerViews = express.Router();

/*Rutas a las view via IO */
const routesIoChat = require("./src/routes/routesIOChat");
const routerIoChat = express.Router();

/*Body Parser: YA NO SE USA */
const bodyParser = require("body-parser");
// /*Uso de Middlewares*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(express.json()); // Por algun motivo extraño el express.json() no me estaría funcionando

/*Configuración del motor de plantilla*/
app.engine(
  "hbs",
  handlebars({
    extname: "hbs", // Extension a utilizar
    defaultLayout: "main.hbs", // El layout que va a cargar en todas las paginas por default
    layoutsDir: `./views/layouts`, // Donde se van a encontrar las layouts
    partialsDir: `./views/partials/`, // Donde se van a encontrar los partials
  })
);
// Estableciendo el motor de plantilla que se utiliza
app.set("view engine", "hbs");
// Estableciendo el directorio donde se encuentran los archivos de plantillas
app.set("views", "./views");

/*Sirve para ofrecer archivos staticos, ej:
http://localhost:8080/static/css/style.css
http://localhost:8080/static/js/index.js
*/
// Utilizamos el prefijo virtual '/static'
app.use("/static", express.static(__dirname + "/public"));

/*Rutas del API: Productos*/
app.use(routesProducts(routerProducts));
/*Rutas del API: Cart*/
app.use(routesCart(routerCart));
/*Rutas del API: Mensaje de chat*/
app.use(routesMessagesChat(routerMessagesChat));
/*Rutas del API: Ruta de session*/
app.use(routesAuth(routerAuth));
/*Rutas IO chat*/
app.use(routesIoChat(routerIoChat));
/*Rutas del views productos, agregar y chat*/
app.use(routesView(routerViews));
/*Rutas de ProcessInfo */
app.use(routesProcessInfo(routerProcessInfo));
/*Rutas de Random */
app.use(routesRandom(routerRandom));

/*Socket.io: Chat */
/* Funcion socketIo que lo que contiene adentro es toda la conexión IO. */
const socketConnection = require("./src/services/messagesIOchat");
socketConnection(io);

/*Exportamos servidor */
module.exports = http;
