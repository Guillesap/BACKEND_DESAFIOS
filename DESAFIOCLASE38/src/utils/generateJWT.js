const jwt = require('jsonwebtoken')

const generateToken = (user) => {

    return jwt.sign({data: user},"SECRET_KEY", {expiresIn: "1w"});

}

const verifyToken = (req,rext, next) => {
    const { authorization } => req.headers;
    if(!authorization) res.json({msg:' Please provide de token'});
    jwt.verify(authorization, "SECRET_KEY", (err, data) => {
        if(err) res.json({msg:'Ivalid Token'});
        req.user = value.data;
        next();
    })
}

module.exports = generateToken, verifyToken