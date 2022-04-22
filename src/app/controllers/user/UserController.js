
require('dotenv').config()

const UserModel = require('../../models/user/UserModel');

const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt');

const createUserToken = require('../../helpers/createUserToken');
const getToken = require('../../helpers/getToken');
const getUserByToken = require('../../helpers/getUserByToken');
module.exports = class UserController {
    static async register(req, res){
        const { 
            name, 
            email, 
            password, 
            passwordConfirmation, 
            image, 
            phone  
        } = req.body;

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
            await createUserToken(newUser, req, res);
        } catch (error) {
            res.status(500).json({ message: error });
        }

    }

    static async login(req, res){
        const { email, password } = req.body;
        if(!email){
            res.status(422).json({ message: 'Email é obrigátorio'});
            return;
        }

        if(!password){
            res.status(422).json({ message: 'Senha é obrigátorio'});
            return;
        }

        const user = await UserModel.findOne({email: email});

        if(!user){
            res.status(422).json({ message: 'Não existe usuário cadastrado com esse email'});
            return;
        }

        // Check if password is valid

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            res.status(422).json({ message: 'Senha inválida'});
        }

        await createUserToken(user, req, res);
    }

    static async checkUser(req, res){
        let currentUser;

        if(req.headers.authorization){
            const token = getToken(req);
            const decoded = jwt.verify(token, process.env.SECRET);
            currentUser = await UserModel.findById(decoded.id)
            currentUser.password = undefined;
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res){
        const { id } = req.params;

        const user = await UserModel.findById(id).select("-password");

        if(!user){
            res.status(422).json({ message: 'Usuário não existe'});
            return;
        }

        return res.json(user)
    }

    static async update(req, res){
    
        const token = getToken(req);

        const user = await getUserByToken(token);

        const { 
            name,
            email,
            phone,
            password,
            passwordConfirmation,
            image
        } = req.body;

        
        // let image = '';

        if(!name){
            res.status(422).json({ message: 'Nome é obrigátorio'});
            return;
        }

        user.name = name;

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

        if(!phone){
            res.status(422).json({ message: 'Telefone é obrigátorio'});
            return;
        }

        const userPhoneExists = await UserModel.findOne({phone: phone});
        if(user.phone != phone && userPhoneExists){
            res.status(422).json({ message: 'Esse Telefone já está em uso'});
            return;
        }

        user.phone = phone;
        

        if(password !== passwordConfirmation){
            res.status(422).json({ message: 'O campo senha e confirmação de senha não pode ser diferente'});
            return;
        } else if(password === passwordConfirmation && password !== null){
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt); 
            user.password = passwordHash
        }

        const userExists = await UserModel.findOne({email: email});

        if(user.email != email && userExists){
            res.status(422).json({ message: 'Email já está uso, utilize outro email'});
            return;
        }

        user.email = email

        
        if(!user){
            res.status(422).json({ message: 'Usuário não encontrado'});
            return;
        }

        try {
            await UserModel.findOneAndUpdate(
                { _id: user.id},
                {$set: user},
                {new: true}
            );

            return res.json({ message: 'Usuário atualizado com sucesso!' })


        } catch (error) {
            res.status(500).json({ message: error});
        }
     
    }
}

