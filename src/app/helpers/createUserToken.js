const jwt = require("jsonwebtoken");

const createUserToken = async(user, _, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "nossosecret");

    res.json({
        message: "Autenticação concluida com sucesso!",
        token: token,
        userId: user._id
    })
}

module.exports = createUserToken;