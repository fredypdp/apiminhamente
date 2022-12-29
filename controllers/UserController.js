const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer")
const User = require("../models/User")
const PasswordToken = require("../models/PasswordToken");
const DeleteToken = require("../models/DeleteToken");
const Email = require("../models/EnviarEmail");
const FileManager = require("../models/fileManager");

const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

const secret = process.env.SECRET;

class UserController {

    async Usuarios(req, res){
        try {
            let users = await User.findAll();
            res.status(200);
            res.json({users: users});
        } catch (error) {
            res.status(404)
            res.json({err: "Nenhum usuário encontrado"})
        }
    }

    async UsuarioById(req, res){
        let id = req.params.id

        if(user != undefined){
            try {                
                let user = await User.findById(id);
                res.status(200)
                res.json({user: user});
            } catch (error) {
                res.status(404)
                res.json({err: "Usuário não encontrado"});
            }
        }else{
            res.status(404);
            res.json({err: "Usuário não encontrado"});
        }
    }

    // CRUD
    
    async criar(req, res) {
        let {nome, email, senha} = req.body
        let avatar = req.file.destination+req.file.filename
        
        // Validações
        if (avatar == undefined) {
            res.status(400)
            res.json({err: "avatar inválido"})
            return
        }

        if (nome == undefined) {
            res.status(400)
            res.json({err: "nome inválido"})
            return
        }

        if (email == undefined) {
            res.status(400)
            res.json({err: "email inválido"})
            return
        }

        if (senha == undefined) {
            res.status(400)
            res.json({err: "senha inválida"})
            return
        }

        if (senha.length < 8) {
            res.status(400)
            res.json({err: "A senha precisa ter no mínimo 8 caracteres"})
            return
        }

        // Verificando se o email já foi cadastrado
        let emailExists = await User.findEmail(email)
        if (emailExists) {
            res.status(406)
            res.json({err: "Email já está cadastrado"})
            return
        }

        try {
            let cdn = await FileManager.upload(avatar) // Upload da imagem para a Cloudinary e retornando a cdn
            
            await unlinkAsync(avatar) // Deletando imagem da pasta "temp"
            await User.novo(cdn.secure_url, cdn.public_id, nome, email.toLowerCase(), senha) // Criando o usuário
            // Fazendo login depois de ter criado a conta
            let user = await User.findByEmail(email);
            if(user != undefined){
    
                let token = jwt.sign({id: user.id, nome: user.nome, email: user.email, avatar: user.avatar, role: user.role}, secret, { expiresIn: 604800});

                req.session.token = token

                const tokenValido = await User.findBlacklist(token)

                if (tokenValido == undefined) {
                    const decoded = jwt.verify(token,secret);
        
                    req.session.user = decoded
                    res.status(200);
                    res.json({token: token,decoded: decoded});
                    return
                } else {
                    res.status(403);
                    res.json({err: "Token invalido"});
                    return;
                }
            }else{
                res.status(404);
                res.json({err: "Usuário não encontrado"});
                return
            }
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res){
        let {email, senha } = req.body;

        if (email == undefined) {
            res.status(400)
            res.json({err: "email inválido"})
            return
        }

        if (senha.length < 8) {
            res.status(400)
            res.json({err: "A senha precisa ter no mínimo 8 caracteres"})
            return
        }

        let user = await User.findByEmail(email);

        if(user != undefined){

            let resultado = await bcrypt.compare(senha, user.senha);
            
            if(resultado == true){

                let token = jwt.sign({id: user.id, nome: user.nome, email: user.email, avatar: user.avatar, role: user.role}, secret, { expiresIn: 604800});

                req.session.token = token

                const tokenValido = await User.findBlacklist(token)

                if (tokenValido == undefined) {
                    const decoded = jwt.verify(token,secret);
        
                    req.session.user = decoded
                    res.status(200);
                    res.json({token: token,decoded: decoded});
                    return
                } else {
                    res.status(403);
                    res.json({err: "Token invalido"});
                    return;
                }
            }else{
                res.status(406);
                res.json({err: "Senha incorreta"});
                return
            }

        }else{
            res.status(404);
            res.json({err: "Usuário não encontrado"});
            return
        }
    }

    async logout(req, res){
        let token = req.session.token
        req.session.token = undefined
        try {
            await User.blacklistToken(token)
        } catch (error) {
            res.status(406);
            res.json({err: "Erro ao terminar sessão"});
        }
    }

    async removeEmail(req, res){
        let email = req.params.email;
        let result = await DeleteToken.create(email);

        if(result.status == true){
            Email.enviarDeleteLink(email, result.token)
            res.status(200);
            res.json({result: "Email de deleção enviado com sucesso"})
            return
        }else{
            res.status(406)
            res.json({err: "Erro, talvez o email usado não exista"})
            return
        }
    }
    
    async remove(req, res){
        let token = req.body.token;

        let tokenValido = await DeleteToken.validate(token);
        if(tokenValido.status){
            try {
                await User.MyDelete(tokenValido.token.user_id, tokenValido.token.token);
                res.status(200);
                res.json("Conta deletada");
                return
            } catch (error) {
                res.status(400);
                res.json({err: "Erro ao deletar a conta"});
                return
            }
        }else{
            res.status(406);
            res.json({err: "Token inválido ou inexistente!"});
            return
        }
    }

    async AdmRemove(req, res){
        let id = req.params.id;

        if (id == req.session.user.id) { // Deletando o token antigo
            req.session.token = undefined
            User.blacklistToken(req.session.token)
            return
        }

        try {
            let result = await User.delete(id);
            if(result.status){
                res.status(200);
                res.send("Usuário deletado!");
                return
            }else{
                res.status(406);
                res.json({err: result.err});
                return
            }   
        } catch (error) {
            res.status(400);
            res.json({err: "Erro ao deletar usuário"});
        }
    }

    async edit(req, res){

        let {id, nome, email, role} = req.body;
        let avatar = req.file.destination+req.file.filename

        try {
            let cdn = await FileManager.upload(avatar) // Upload da imagem para a Cloudinary e retornando a cdn
            
            await unlinkAsync(avatar) // Deletando imagem da pasta "temp"
            await User.update(id, cdn.secure_url, cdn.public_id, nome, email); // Editando o usuário
            
            // Deletando o token antigo
            req.session.token = undefined
            User.blacklistToken(req.session.token)

            // Fazendo login depois de ter editado a conta
            let user = await User.findById(id);
            if(user != undefined){
    
                let token = jwt.sign({id: user.id, nome: user.nome, email: user.email, avatar: user.avatar, role: user.role}, secret, { expiresIn: 604800});

                req.session.token = token
                res.status(200);
                res.json({token: token});
                return
            }else{
                res.status(404);
                res.json({err: "Usuário não encontrado"});
                return
            }
        } catch (error) {
            res.status(400);
            res.json({err: "Erro ao editar usuário"});
        }
    }

    async recoverPassword(req, res){
        let email = req.session.email;
        let result = await PasswordToken.create(email);

        if(result.status == true){
            Email.enviarNovaSenhaLink(email, result.token)
            res.status(200);
            res.json({result: "sucesso"})
            return
        }else{
            res.status(406)
            res.json({err: "Erro, talvez o email usado não exista"})
            return
        }
    }
    
    async changePassword(req, res){
        let token = req.body.token;
        let senha = req.body.novaSenha;
        
        if (senha.length < 8) {
            res.status(400)
            res.json({err: "A senha precisa ter no mínimo 8 caracteres"})
            return
        }

        let tokenValido = await PasswordToken.validate(token);
        if(tokenValido.status){
            try {
                await User.changePassword(senha, tokenValido.token.user_id, tokenValido.token.token);
                res.status(200);
                res.json("Senha alterada");
            } catch (error) {
                res.status(400);
                res.json("Erro ao alterar senha");
            }
            return
        }else{
            res.status(406);
            res.json({err: "Token inválido ou inexistente!"});
            return
        }
    }
    
}

module.exports = new UserController()