const bcrypt = require("bcrypt");
const saltRounds = 12;


const createHash = (password) => {
    console.log('Ingresó a /bcrypt createHash')
    
    const passwordCripted = bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds), null);
    return passwordCripted;
}

const isValidPassword = (user, password) => {
    console.log('Ingresó a /bcrypt isValidPassword');
    const isValid = bcrypt.compareSync(user, password);
    console.log(isValid);
    return isValid;
}

module.exports = { createHash, isValidPassword }