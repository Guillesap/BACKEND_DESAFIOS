import express from 'express';

const loginError = express.Router();

loginError.get('/', (req, res) => {
    res.render("../views/login-error.ejs");
});

export default loginError;