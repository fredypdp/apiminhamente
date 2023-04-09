import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import PasswordToken from "../models/PasswordToken.js";
import DeleteToken from "../models/DeleteToken.js";
import Email from "../models/EnviarEmail.js";
import FileManager from "../models/fileManager.js";

import fs from "fs";
import { promisify } from "util";
const unlinkAsync = promisify(fs.unlink)

const secret = process.env.SECRET;

export default class UserController {

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
        }

        if (nome == undefined) {
            res.status(400)
            res.json({err: "nome inválido"})
        }

        if (email == undefined) {
            res.status(400)
            res.json({err: "email inválido"})
        }

        if (senha == undefined) {
            res.status(400)
            res.json({err: "senha inválida"})
        }

        if (senha.length < 8) {
            res.status(400)
            res.json({err: "A senha precisa ter no mínimo 8 caracteres"})
        }

        // Verificando se o email já foi cadastrado
        let emailExists = await User.findEmail(email)
        if (emailExists) {
            res.status(406)
            res.json({err: "Email já está cadastrado"})
        }

        try {
            let cdn = await FileManager.upload(avatar) // Upload da imagem para a Cloudinary e retornando a cdn
            
            await unlinkAsync(avatar) // Deletando imagem da pasta "temp"
            await User.novo(cdn.secure_url, cdn.public_id, nome, email.toLowerCase(), senha) // Criando o usuário

            // Fazendo login depois de ter criado a conta
            let user = await User.findByEmail(email);
            if(user != undefined){
                try {
                    let token = await jwt.sign({id: user.id, nome: user.nome, email: user.email, avatar: user.avatar, role: user.role}, secret, { expiresIn: 604800});
    
                    let tokenValido = await User.findBlacklist(token)
    
                    if (tokenValido == undefined) {
                        try {
                            let decoded = await jwt.verify(token,secret);

                            res.status(200);
                            res.json({token: token,UserDecoded: decoded});
                        } catch (error) {
                            res.status(401);
                            res.json({err: "Token invalido"});
                        }
                    } else {
                        res.status(403);
                        res.json({err: "Token invalido"});
                    }
                } catch (error) {
                    res.status(400)
                    res.json({err:"Falha interna"})
                }
            }else{
                res.status(404);
                res.json({err: "Erro ao fazer login depois de criar a conta, usuário não encontrado"});
            }
        } catch (error) {
            res.status(400)
            res.json({err:"Erro ao criar conta"})
        }
    }

    async login(req, res){
        let {email, senha } = req.body;

        if (email == undefined) {
            res.status(400)
            res.json({err: "email inválido"})
        }

        if (senha.length < 8) {
            res.status(400)
            res.json({err: "A senha precisa ter no mínimo 8 caracteres"})
        }

        let user = await User.findByEmail(email);

        if(user != undefined){

            let resultado = await bcrypt.compare(senha, user.senha);
            
            if(resultado == true){

                let token = jwt.sign({id: user.id, nome: user.nome, email: user.email, avatar: user.avatar, role: user.role}, secret, { expiresIn: 604800})

                let tokenValido = await User.findBlacklist(token)

                if (tokenValido == undefined) {
                    try {                        
                        let decoded = jwt.verify(token,secret);

                        res.status(200);
                        res.json({token: token,UserDecoded: decoded});
                    } catch (error) {
                        res.status(401);
                        res.json({err: "Token invalido"});
                    }
                } else {
                    res.status(403);
                    res.json({err: "Token invalido"});
                }
            }else{
                res.status(406);
                res.json({err: "Senha incorreta"});
            }

        }else{
            res.status(404);
            res.json({err: "Usuário não encontrado"});
            return
        }
    }

    async logout(req, res){
        let token = req.headers["authorization"]

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
        }else{
            res.status(406)
            res.json({err: "Erro, talvez o email usado não exista"})
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
            } catch (error) {
                res.status(400);
                res.json({err: "Erro ao deletar a conta"});
            }
        }else{
            res.status(406);
            res.json({err: "Token inválido ou inexistente!"});
        }
    }

    async AdmRemove(req, res){
        let id = req.params.id;

        try {
            let result = await User.delete(id);
            if(result.status){
                res.status(200);
                res.send("Usuário deletado!");
            }else{
                res.status(406);
                res.json({err: result.err});
            }   
        } catch (error) {
            res.status(400);
            res.json({err: "Erro ao deletar usuário"});
        }
    }

    async edit(req, res){
        let {id, nome, email, role} = req.body;
        let avatar = req.file.destination+req.file.filename
        let token = req.headers["authorization"]

        try {
            let cdn = await FileManager.upload(avatar) // Upload da imagem para a Cloudinary e retornando a cdn
            
            await unlinkAsync(avatar) // Deletando imagem da pasta "temp"
            await User.update(id, cdn.secure_url, cdn.public_id, nome, email); // Editando o usuário
            
            // Adicionando o token de login antigo à lista negra
            User.blacklistToken(token)

            // Fazendo login depois de ter editado a conta
            let user = await User.findById(id);
            if(user != undefined){
    
                let token = jwt.sign({id: user.id, nome: user.nome, email: user.email, avatar: user.avatar, role: user.role}, secret, { expiresIn: 604800});

                res.status(200);
                res.json({token: token,UserDecoded: decoded});
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
        }else{
            res.status(406);
            res.json({err: "Token inválido ou inexistente!"});
        }
    }
}