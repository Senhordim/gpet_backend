const UserModel = require('../../models/user/UserModel');


module.exports = class UserController {
    static async register(req, res){
        // const { name, email, password, image, phone,  } = req.body;
        return res.json({ hello: 'Hello'})
    }
}

