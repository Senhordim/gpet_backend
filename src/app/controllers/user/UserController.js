const UserModel = require('../../models/user/UserModel');


module.exports = class UserController {
    static async register(req, res){
        const { name, email, password, passwordConfirmation, image, phone,  } = req.body;

        if(!name){
            res.status(422).json({ message: 'Nome é obrigátorio'});
            return;
        }

        if(!email){
            res.status(422).json({ message: 'Email é obrigátorio'});
            return;
        }

        if(!password){
            res.status(422).json({ message: 'Senha é obrigátorio'});
            return;
        }

        if(!passwordConfirmation){
            res.status(422).json({ message: 'Confirmação de senha é obrigátorio'});
            return;
        }

        if(!image){
            res.status(422).json({ message: 'Imagem é obrigátorio'});
            return;
        }

        if(!phone){
            res.status(422).json({ message: 'Telefone é obrigátorio'});
            return;
        }

        if(password !== passwordConfirmation){
            res.status(422).json({ message: 'O campo senha e confirmação de senha não pode ser diferente'});
            return;
        }

        return res.json({ hello: 'Hello'})
    }
}

