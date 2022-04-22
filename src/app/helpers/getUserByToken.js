require('dotenv').config()

const jwt = require('jsonwebtoken');

const UserModel = require('../models/user/UserModel');

const getUserByToken = async (token) => {

    if(!token){
        return res.status(401).json({message: 'Acesso negado!'});
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;

    const user = await UserModel.findOne({_id: userId});

    return user;
}

module.exports  = getUserByToken