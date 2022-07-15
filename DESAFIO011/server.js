import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { messageDao, usersDao } from "./src/daos/index.js"
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import config from "./src/utils/config.js";
import passport from "passport";
import { Strategy as StrategyFb } from "passport-facebook";
import { Strategy } from "passport-local";
import { profile } from "console";
const LocalStrategy = Strategy;

const FacebookStrategy = StrategyFb
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

passport.use(new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
        usersDao.findById(email)
            .then(user => {
                if (!user) {
                    return done(null, false, { message: "Incorrect email." });
                }
                if (user.password !== password) {
                    return done(null, false, { message: "Incorrect password." });
                }
                return done(null, user);
            })
            .catch(err => done(err));
    }
));




passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

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
    cookie: { maxAge: 60000 * 10 }
}));

app.use(passport.initialize());
app.use(passport.session());

io.on("connection", async (socket) => {
    console.log("Usuario conectado con id: " + socket.id);

    socket.emit("messages", await messageDao.listarTabla());
    console.log(await messageDao.listarTabla());
    socket.on("new-message", async (message) => {

        await messageDao.insertarArticulo(message, "messages");
        socket.emit("messages", await messageDao.listarTabla());
    });
});



app.get('/', (req, res) => {
    res.redirect('/login')
});

app.get('/login-error', (req, res) => {
    res.sendFile(__dirname + "/views/login-error.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
    req.isAuthenticated() ? res.redirect('/home') : console.log("No esta autenticado");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/views/register.html");
});

app.get("/home", (req, res) => {
    if (req.isAuthenticated()) {
        res.render(__dirname + "/views/index.ejs", {
            name: req.user.displayName ? req.user.displayName : req.user.name,
            photo: req.user.photos ? req.user.photos[0].value : "https://fotos.perfil.com/2021/06/18/trim/900/900/sebastian-sosa-1192599.jpg",
            email: req.user.emails ? req.user.emails[0].value : req.user.email
        });
    } else {
        res.redirect("/login");
    }
});

app.post("/login", passport.authenticate('local',
    { successRedirect: '/home', failureRedirect: '/login-error' }),
);

app.post("/register", (req, res) => {
    const userData = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }
    const id = req.body.email;

    id ? usersDao.findById(id).then(user => {
        if (user) {
            res.sendFile(__dirname + "/views/register-error.html");
        } else {
            usersDao.insertOne(userData, id).then(() => {
                console.log("Usuario creado");
                res.redirect("/login");
            });
        }
    }) : res.sendFile(__dirname + "/views/register-error.html");

});

app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
});

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor activado en el Puerto ${PORT}`);
});

server.on("error", (error) => {
    console.log(error);
});
