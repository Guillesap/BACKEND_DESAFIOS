import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import messageDao from "./src/daos/index.js"
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import config from "./src/utils/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(session({
    store: MongoStore.create({ mongoUrl: config.mongodb.url, mongoOptions: advancedOptions }),
    secret: 'keyboard cat',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

io.on("connection", async (socket) => {
    console.log("Usuario conectado con id: " + socket.id);

    socket.emit("messages", await messageDao.listarTabla());
    console.log(await messageDao.listarTabla());
    socket.on("new-message", async (message) => {

        await messageDao.insertarArticulo(message, "messages");
        socket.emit("messages", await messageDao.listarTabla());
    });
});

function auth(req, res, next) {
    if (req.session?.user) {
        next();
    } else {
        res.redirect("/login");
    }
}

app.get('/', (req, res) => {
    res.redirect('/login')
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/home", auth, (req, res) => {
    res.render(__dirname + "/views/index.ejs", {
        name: req.session.user
    });
});

app.post("/login", (req, res) => {
    req.session.user = req.body.name;
    res.redirect('/home');
});

app.get("/logout", auth, (req, res) => {
    res.render(__dirname + "/views/logout.ejs", {
        name: req.session.user
    });
    req.session.destroy();
});

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

server.on("error", (error) => {
    console.log(error);
});
