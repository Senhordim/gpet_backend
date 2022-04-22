require('dotenv').config()

const jwt = require('jsonwebtoken');

const getToken = require('./getToken');

const checkToken = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({message: 'Acesso negado!'})
    }
    

    const token = getToken(req)
    if(!token){
        return res.status(401).json({message: 'Acesso negado!'})
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).json({message: 'Token inválido!'})
    }
}

module.exports = checkToken;