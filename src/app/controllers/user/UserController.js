const bcrypt = require('bcrypt');
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

        const userExists = await UserModel.findOne({email: email});

        if(userExists){
            res.status(422).json({ message: 'Email já está uso, utilize outro email'});
            return;
        }

        // Criar senha 
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create User

        const user = new UserModel({
            name: name,
            email: email,
            image: image,
            phone: phone,
            password: passwordHash,
        })

        try {
            const newUser = await user.save();
            res.status(201).json({ message: 'Usuário criado com sucesso', newUser});
        } catch (error) {
            res.status(500).json({ message: error });
        }



        return res.json({ hello: 'Hello'})
    }
}

