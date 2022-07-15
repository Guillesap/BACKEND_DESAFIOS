import express from 'express';
import passport from "passport";;

const login = express.Router();

login.get("/", (req, res) => {

    if (req.isAuthenticated()) {
        return res.redirect('/home')
    }
    else {
        return res.render("../views/login.ejs");
    }
});

login.post("/", passport.authenticate('local',
    { successRedirect: '/home', failureRedirect: '/login-error' }),
);

export default login;