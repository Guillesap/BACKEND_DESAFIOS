import express from 'express';
import { usersDao } from '../daos/index.js';

const register = express.Router();

register.get("/", (req, res) => {
    res.render("../views/register.ejs");
});

register.post("/", (req, res) => {
    const userData = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }
    const id = req.body.email;

    id ? usersDao.findById(id).then(user => {
        if (user) {
            res.render("../views/register-error.ejs");
        } else {
            usersDao.insertOne(userData, id).then(() => {
                console.log("Usuario creado");
                res.redirect("/login");
            });
        }
    }) : res.sendFile("../views/register-error.ejs");

});

export default register;