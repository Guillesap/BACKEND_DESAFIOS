import express from 'express';
import { fork } from "child_process";

const randoms = express.Router();

randoms.get("/", (req, res) => {
    const cantidad = req.query.cant || 100000000;
    const calcular = fork("./src/utils/randomNumbers.js");
    calcular.send(cantidad);
    calcular.on("message", (numeros) => {
        res.json(numeros);
    });
});



export default randoms;