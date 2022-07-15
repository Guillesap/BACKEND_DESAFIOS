import express from 'express';

const logout = express.Router();

logout.get("/", (req, res) => {
    req.logOut();
    res.redirect("/login");
});

export default logout;