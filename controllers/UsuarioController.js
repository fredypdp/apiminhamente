import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import SenhaToken from "../models/SenhaToken.js";
import DelecaoToken from "../models/DelecaoToken.js";
import EnviarEmail from "../models/EnviarEmail.js";
import FileManager from "../models/FileManager.js";

import fs from "fs";
import { promisify } from "util";
import { log } from "console";
const unlinkAsync = promisify(fs.unlink)

const secret = process.env.SECRET;

export default class UserController {

    async Usuarios(req, res){
        try {
            let usuarios = await new Usuario().usuarioAll();

            res.status(200);
            res.json({usuarios: usuarios});
        } catch (erro) {
            console.log(erro);
            res.status(404)
            res.json({erro: "Nenhum usuário encontrado"})
        }
    }

    async UsuarioById(req, res){
        let id = req.params.id

        // Validações
        if (id == undefined) {
            res.status(400)
            res.json({erro: "id inválido"})
            return
        }

        if (id != undefined) {
            if (id.trim().length === 0) {
                res.status(400)
                res.json({erro: "id inválido"})
                return
            }
        }

        try {                
            let usuario = await new Usuario().encontrarPorId(id);

            let HATEOAS = [
                {
                    href: process.env.URL_API+"/usuario/"+usuario.id,
                    method: "get",
                    rel: "usuário_pelo_id",
                },
                {
                    href: process.env.URL_API+"/usuario/email/"+usuario.email,
                    method: "get",
                    rel: "usuário_pelo_email"
                },
                {
                    href: process.env.URL_API+"/usuario",
                    method: "put",
                    rel: "editar_usuario"
                },
                {
                    href: process.env.URL_API+"/recuperarsenha"+"/"+usuario.email,
                    method: "post",
                    rel: "enviar_email_de_recuperação_de_senha"
                },
                {
                    href: process.env.URL_API+"/usuario/"+usuario.id+"/"+usuario.email,
                    method: "post",
                    rel: "enviar_email_de_deleção_de_conta"
                },
                {
                    href: process.env.URL_API+"/usuario/"+usuario.id,
                    method: "delete",
                    rel: "adm_deletar_usuário"
                }
            ]

            res.status(200)
            res.json({usuario: usuario, _links: HATEOAS});
        } catch (erro) {
            console.log(erro);
            res.status(404)
            res.json({erro: "Erro ao encontrar usuário"});
        }
    }
    
    async UsuarioByEmail(req, res){
        let email = req.params.email

        // Validações
        if (email == undefined) {
            res.status(400)
            res.json({erro: "email inválido"})
            return
        }
        
        if (email != undefined) {
            if (email.trim().length === 0) {
                res.status(400)
                res.json({erro: "email inválido"})
                return
            }
        }

        try {                
            let usuario = await new Usuario().encontrarPorEmail(email);

            let HATEOAS = [
                {
                    href: process.env.URL_API+"/usuario/"+usuario.id,
                    method: "get",
                    rel: "usuário_pelo_id",
                },
                {
                    href: process.env.URL_API+"/usuario/email/"+usuario.email,
                    method: "get",
                    rel: "usuário_pelo_email"
                },
                {
                    href: process.env.URL_API+"/usuario",
                    method: "put",
                    rel: "editar_usuario"
                },
                {
                    href: process.env.URL_API+"/recuperarsenha"+"/"+usuario.email,
                    method: "post",
                    rel: "enviar_email_de_recuperação_de_senha"
                },
                {
                    href: process.env.URL_API+"/usuario/"+usuario.id+"/"+usuario.email,
                    method: "post",
                    rel: "enviar_email_de_deleção_de_conta"
                },
                {
                    href: process.env.URL_API+"/usuario/"+usuario.id,
                    method: "delete",
                    rel: "adm_deletar_usuário"
                }
            ]

            res.status(200)
            res.json({usuario: usuario, _links: HATEOAS});
        } catch (erro) {
            console.log(erro);
            res.status(404)
            res.json({erro: "Erro ao encontrar usuário"});
        }
    }

    // CRUD
    
    async criar(req, res) {
        let {nome, sobrenome, email, senha} = req.body
        
        // Validações
        if (req.file == undefined) {
            res.status(400)
            res.json({erro: "Avatar inválido"})
            return
        }

        let avatar
        if (req.file != undefined) {
            if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/jpeg") {
                await unlinkAsync(req.file.destination+req.file.filename)
                res.status(400)
                res.json({erro: "O avatar deve ser uma imagem"})
                return
            }
            
            avatar = req.file.destination+req.file.filename
        }

        if (nome == undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            res.status(400)
            res.json({erro: "Nome inválido"})
        }
        
        if (sobrenome == undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            res.status(400)
            res.json({erro: "Sobrenome inválido"})
        }

        if (email == undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            res.status(400)
            res.json({erro: "Email inválido"})
        }

        if (senha == undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            res.status(400)
            res.json({erro: "Senha inválida"})
        }

        if (senha.length < 8) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            res.status(400)
            res.json({erro: "A senha precisa ter no mínimo 8 caracteres"})
        }

        if (nome != undefined) {
            if (nome.trim().length === 0) {
                if (req.file != undefined) {
                    await unlinkAsync(req.file.destination+req.file.filename)
                }
    
                res.status(400)
                res.json({erro: "Nome inválido"})
            }
        }

        if (sobrenome != undefined) {
            if (sobrenome.trim().length === 0) {
                if (req.file != undefined) {
                    await unlinkAsync(req.file.destination+req.file.filename)
                }
    
                res.status(400)
                res.json({erro: "Sobrenome inválido"})
            }
        }
        
        if (email != undefined) {
            if (email.trim().length === 0) {
                if (req.file != undefined) {
                    await unlinkAsync(req.file.destination+req.file.filename)
                }

                res.status(400)
                res.json({erro: "Email inválido"})
            }
        }

        if (senha != undefined) {
            if (senha.trim().length === 0) {
                if (req.file != undefined) {
                    await unlinkAsync(req.file.destination+req.file.filename)
                }
    
                res.status(400)
                res.json({erro: "Senha inválida"})
            }
        }

        try {
            let cdn = await new FileManager().upload(avatar) // Upload da imagem para a Cloudinary e retornando a cdn
            await unlinkAsync(avatar) // Deletando imagem da pasta "temp"

            let erroExist = await new Usuario().novo(nome, sobrenome, email, senha, cdn.secure_url, cdn.public_id)
            if (erroExist.status == 400) {
                res.status(406)
                res.json({erro: "Já existe uma conta com esse email"})
            } else {

                let HATEOAS = [
                    {
                        href: process.env.URL_API+"/usuario/"+usuario.id,
                        method: "get",
                        rel: "usuário_pelo_id",
                    },
                    {
                        href: process.env.URL_API+"/usuario/email/"+usuario.email,
                        method: "get",
                        rel: "usuário_pelo_email"
                    },
                    {
                        href: process.env.URL_API+"/usuario",
                        method: "put",
                        rel: "editar_usuario"
                    },
                    {
                        href: process.env.URL_API+"/recuperarsenha"+"/"+usuario.email,
                        method: "post",
                        rel: "enviar_email_de_recuperação_de_senha"
                    },
                    {
                        href: process.env.URL_API+"/usuario/"+usuario.id+"/"+usuario.email,
                        method: "post",
                        rel: "enviar_email_de_deleção_de_conta"
                    },
                    {
                        href: process.env.URL_API+"/usuario/"+usuario.id,
                        method: "delete",
                        rel: "adm_deletar_usuário"
                    }
                ]

                res.status(200)
                res.json({data: erroExist, _links: HATEOAS, msg: "Conta criada com sucesso"})
            }
        } catch (erro) {
            console.log(erro);
            res.status(400)
            res.json({erro:"Erro ao criar conta"})
        }
    }

    async editar(req, res){
        let {id, nome, sobrenome, email, senha} = req.body;
        let tokenBearer = req.headers["authorization"]
        const bearer = tokenBearer.split(" ")
        let token = bearer[1]

        // Validações
        if (id == undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            res.status(400)
            res.json({erro: "id inválido"})
            return
        }
        
        if (senha == undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            res.status(400)
            res.json({erro: "senha inválido"})
            return
        }

        if (req.file == undefined && nome == undefined && sobrenome == undefined && email == undefined && senha == undefined) {
            res.status(400)
            res.json({erro: "Preencha os campos"})
            return
        }

        if (id != undefined) {
            if (id.trim().length === 0) {
                if (req.file != undefined) {
                    await unlinkAsync(req.file.destination+req.file.filename)
                }

                res.status(400)
                res.json({erro: "id inválido"})
                return
            }
        }

        if (nome != undefined) {
            if (nome.trim().length === 0) {
                if (req.file != undefined) {
                    await unlinkAsync(req.file.destination+req.file.filename)
                }

                res.status(400)
                res.json({erro: "Nome inválido"})
                return
            }
        }

        if (sobrenome != undefined) {
            if (sobrenome.trim().length === 0) {
                if (req.file != undefined) {
                    await unlinkAsync(req.file.destination+req.file.filename)
                }

                res.status(400)
                res.json({erro: "Sobrenome inválido"})
                return
            }
        }

        if (email != undefined) {
            if (email.trim().length === 0) {
                if (req.file != undefined) {
                    await unlinkAsync(req.file.destination+req.file.filename)
                }

                res.status(400)
                res.json({erro: "Email inválido"})
                return
            }
        }
        
        if (senha != undefined) {
            if (senha.trim().length === 0) {
                if (req.file != undefined) {
                    await unlinkAsync(req.file.destination+req.file.filename)
                }

                res.status(400)
                res.json({erro: "senha inválido"})
                return
            }
        }
        
        let avatar
        if (req.file != undefined) {
            if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/jpeg") {
                await unlinkAsync(req.file.destination+req.file.filename)
                res.status(400)
                res.json({erro: "O avatar deve ser uma imagem"})
                return
            }
            
            avatar = req.file.destination+req.file.filename
        }

        // Validar se a conta a ser editada pertence a esse usuário
        const tokenValido = await new Usuario().findBlacklist(token)
        
        if(tokenValido != null || tokenValido != undefined) {
            res.status(403);
            res.json({erro: "Token invalido"});
            return
        }

        try {
            let usuario = await new Usuario().encontrarPorId(id);
            let decoded = await jwt.verify(token, secret)  
            
            if(decoded.usuario.senha != usuario.senha){
                res.status(403);
                res.json({erro: "Erro ao editar o usuário!"});
                return
            }
        } catch (erro) {
            res.status(401);
            res.json({erro: "Token inválido"});
            return
        }
            

        try {
            let cdn
            if (avatar != undefined) {
                cdn = await new FileManager().upload(avatar) // Upload da imagem para a Cloudinary e retornando a cdn
                await unlinkAsync(avatar) // Deletando imagem da pasta "temp"
                
                
                let erroExist = await new Usuario().editar(id, nome, sobrenome, email, cdn.secure_url, cdn.public_id, token)
                if (erroExist.status == 400) {
                    res.status(406)
                    res.json({erro: "Já existe uma conta com esse email"})
                } else {

                    // Terminando sessão / Adicionando o token de login antigo à lista negra
                    await new Usuario().blacklistToken(token)

                    let HATEOAS = [
                        {
                            href: process.env.URL_API+"/usuario/"+usuario.id,
                            method: "get",
                            rel: "usuário_pelo_id",
                        },
                        {
                            href: process.env.URL_API+"/usuario/email/"+usuario.email,
                            method: "get",
                            rel: "usuário_pelo_email"
                        },
                        {
                            href: process.env.URL_API+"/usuario",
                            method: "put",
                            rel: "editar_usuario"
                        },
                        {
                            href: process.env.URL_API+"/recuperarsenha"+"/"+usuario.email,
                            method: "post",
                            rel: "enviar_email_de_recuperação_de_senha"
                        },
                        {
                            href: process.env.URL_API+"/usuario/"+usuario.id+"/"+usuario.email,
                            method: "post",
                            rel: "enviar_email_de_deleção_de_conta"
                        },
                        {
                            href: process.env.URL_API+"/usuario/"+usuario.id,
                            method: "delete",
                            rel: "adm_deletar_usuário"
                        }
                    ]

                    res.status(200)
                    res.json({data: erroExist, _links: HATEOAS, msg: "Conta editada com sucesso"})
                }
                return
            }

            let erroExist = await new Usuario().editar(id, nome, sobrenome, email, cdn.secure_url, cdn.public_id, token)
            if (erroExist.status == 400) {
                res.status(406)
                res.json({erro: "Já existe uma conta com esse email"})
            } else {

                // Terminando sessão / Adicionando o token de login antigo à lista negra
                await new Usuario().blacklistToken(token)

                let HATEOAS = [
                    {
                        href: process.env.URL_API+"/usuario/"+usuario.id,
                        method: "get",
                        rel: "usuário_pelo_id",
                    },
                    {
                        href: process.env.URL_API+"/usuario/email/"+usuario.email,
                        method: "get",
                        rel: "usuário_pelo_email"
                    },
                    {
                        href: process.env.URL_API+"/usuario",
                        method: "put",
                        rel: "editar_usuario"
                    },
                    {
                        href: process.env.URL_API+"/recuperarsenha"+"/"+usuario.email,
                        method: "post",
                        rel: "enviar_email_de_recuperação_de_senha"
                    },
                    {
                        href: process.env.URL_API+"/usuario/"+usuario.id+"/"+usuario.email,
                        method: "post",
                        rel: "enviar_email_de_deleção_de_conta"
                    },
                    {
                        href: process.env.URL_API+"/usuario/"+usuario.id,
                        method: "delete",
                        rel: "adm_deletar_usuário"
                    }
                ]

                res.status(200)
                res.json({data: erroExist, _links: HATEOAS, msg: "Conta editada com sucesso"})
            }
        } catch (erro) {
            console.log(erro);
            res.status(400);
            res.json({erro: "Erro ao editar usuário"});
        }
    }

    async DeletarMinhaConta(req, res){
        let token = req.params.token;
        let tokenBearer = req.headers["authorization"]
        const bearer = tokenBearer.split(" ")
        let tokenLogin = bearer[1]

        // Validações
        if (token == undefined) {
            res.status(400)
            res.json({erro: "Token inválido"})
            return
        }
        
        if (token != undefined) {
            if (token.trim().length === 0) {
                res.status(400)
                res.json({erro: "Token inválido"})
                return
            }
        }

        let tokenValido = await new DelecaoToken().validar(token);
        
        if(tokenValido.status == false) {
            res.status(406);
            res.json({erro: "Token inválido ou inexistente!"});
            return
        }

        // Validar se a conta a ser deletada pertence a esse usuário
        const tokenDeletarValido = await new Usuario().findBlacklist(tokenLogin)
        
        if(tokenDeletarValido != null || tokenDeletarValido != undefined) {
            res.status(403);
            res.json({erro: "Token invalido"});
            return
        }

        try {
            let usuario = await new Usuario().encontrarPorId(tokenValido.token.usuario);
            let decoded = await jwt.verify(tokenLogin, secret)  
            if(decoded.usuario.senha != usuario.senha){
                res.status(403);
                res.json({erro: "Erro ao deletar conta!"});
                return
            }
        } catch (erro) {
            res.status(401);
            res.json({erro: "Token inválido"});
            return
        }


        try {
            let erroExist = await new Usuario().DeletarMinhaConta(tokenValido.token.usuario, tokenValido.token.token);
            if (erroExist.status == 406) {
                res.status(406)
                res.json({erro: "O usuario não existe, portanto não pode ser deletado"})
            } else {

                // Terminando sessão / Adicionando o token de login antigo à lista negra
                await new Usuario().blacklistToken(token)

                res.status(200);
                res.json({data: erroExist, msg: "Conta deletada com sucesso"});
            }
        } catch (erro) {
            console.log(erro);

            res.status(400);
            res.json({erro: "Erro ao deletar a conta"});
        }
    }

    async AdmDeletarUsuario(req, res){
        let id = req.params.id;

        // Validações
        if (id == undefined) {
            res.status(400)
            res.json({erro: "id inválido"})
        }
        
        if(id != undefined){
            if (id.trim().length === 0) {
                res.status(400)
                res.json({erro: "id inválido"})
            }
        }

        try {
            let erroExist = await new Usuario().AdmDeletarUsuario(id);
            if (erroExist.status == 406) {
                res.status(406)
                res.json({erro: "O usuario não existe, portanto não pode ser deletado"})
            } else {
                res.status(200);
                res.json({data: erroExist, msg: "Conta deletada com sucesso"});
            }
        } catch (erro) {
            console.log(erro);
            res.status(400);
            res.json({erro: "Erro ao deletar usuário"});
        }
    }

    async login(req, res){
        let {email, senha } = req.body;

        // Validações
        if (email == undefined) {
            res.status(400)
            res.json({erro: "email inválido"})
        }
        
        if (senha == undefined) {
            res.status(400)
            res.json({erro: "senha inválido"})
        }
        
        if (senha.trim().length === 0) {
            res.status(400)
            res.json({erro: "senha inválido"})
        }

        if (senha.length < 8) {
            res.status(400)
            res.json({erro: "A senha precisa ter no mínimo 8 caracteres"})
        }

        if (email != undefined) {
            if (email.trim().length === 0) {
                res.status(400)
                res.json({erro: "email inválido"})
            }
        }
        
        if (senha != undefined) {
            if (senha.trim().length === 0) {
                res.status(400)
                res.json({erro: "senha inválido"})
            }
        }

        let usuario = await new Usuario().encontrarPorEmail(email);
        if(usuario != undefined || usuario != null){

            let resultado = await bcrypt.compare(senha, usuario.senha);
            
            if(resultado == true){
                let token = jwt.sign({ usuario }, secret, { expiresIn: 604800})

                let tokenValido = await new Usuario().findBlacklist(token)

                if (tokenValido == null || tokenValido == undefined) {
                    try {
                        jwt.verify(token, secret, (erro, decoded) => {
                            if (erro) {
                                res.status(401);
                                res.json({erro: "Token inválido"});
                            } else {

                                let HATEOAS = [
                                    {
                                        href: process.env.URL_API+"/usuario/"+usuario.id,
                                        method: "get",
                                        rel: "usuário_pelo_id",
                                    },
                                    {
                                        href: process.env.URL_API+"/usuario/email/"+usuario.email,
                                        method: "get",
                                        rel: "usuário_pelo_email"
                                    },
                                    {
                                        href: process.env.URL_API+"/usuario",
                                        method: "put",
                                        rel: "editar_usuario"
                                    },
                                    {
                                        href: process.env.URL_API+"/recuperarsenha"+"/"+usuario.email,
                                        method: "post",
                                        rel: "enviar_email_de_recuperação_de_senha"
                                    },
                                    {
                                        href: process.env.URL_API+"/usuario/"+usuario.id+"/"+usuario.email,
                                        method: "post",
                                        rel: "enviar_email_de_deleção_de_conta"
                                    },
                                    {
                                        href: process.env.URL_API+"/usuario/"+usuario.id,
                                        method: "delete",
                                        rel: "adm_deletar_usuário"
                                    }
                                ]

                                res.status(200);
                                res.json({token: token, usuario: decoded.usuario, _links: HATEOAS, msg: "Login feito com sucesso"})
                            }
                        })
                    } catch (erro) {
                        console.log(erro);
                        res.status(401);
                        res.json({erro: "Token invalido"});
                    }
                } else {
                    res.status(403);
                    res.json({erro: "Token invalido"});
                }
            }else{
                res.status(406);
                res.json({erro: "Senha incorreta"});
            }

        }else{
            res.status(404);
            res.json({erro: "Usuário não encontrado"});
            return
        }
    }

    async logout(req, res){
        let tokenBearer = req.headers["authorization"]
        const bearer = tokenBearer.split(" ")
        let token = bearer[1]
        
        // Validações
        if (token == undefined) {
            res.status(400)
            res.json({erro: "token inválido"})
        }
        
        if (token != undefined) {
            if (token == undefined || token.trim().length === 0) {
                res.status(400)
                res.json({erro: "token inválido"})
            }
        }
        
        try {
            let tokenCriado = await new Usuario().blacklistToken(token)

            res.status(200);
            res.send("Sessão terminada com sucesso")
        } catch (erro) {
            console.log(erro);
            res.status(406);
            res.json({erro: "Erro ao terminar sessão"});
        }
    }

    async DeletarMinhaContaEmail(req, res){
        let email = req.params.email;
        
        // Validações
        if (email == undefined) {
            res.status(400)
            res.json({erro: "email inválido"})
        }
        
        if (email != undefined) {
            if (email == undefined || email.trim().length === 0) {
                res.status(400)
                res.json({erro: "email inválido"})
            }
        }

        let result = await new DelecaoToken().criar(email);

        if(result.status == true){
            try {
                new EnviarEmail().enviarDelecaoLink(email, result.token)
                
                res.status(200);
                res.json({msg: "Email de deleção enviado com sucesso"})
            } catch (erro) {
                console.log(erro);

                res.status(400)
                res.json({erro: "Erro ao enviar email"})
            }
        }else{
            res.status(406)
            res.json({erro: "Erro, talvez o email usado não exista"})
        }
    }

    async recuperarSenha(req, res){
        let email = req.params.email;

        // Validações
        if (email == undefined) {
            res.status(400)
            res.json({erro: "email inválido"})
        }
        
        if (email != undefined) {
            if (email == undefined || email.trim().length === 0) {
                res.status(400)
                res.json({erro: "email inválido"})
            }
        }

        let result = await new SenhaToken().criar(email);

        if(result.status == true){
            try {
                new EnviarEmail().enviarNovaSenhaLink(email, result.token)
    
                res.status(200);
                res.json({msg: "Link enviado ao seu email com sucesso"})
                return
            } catch (erro) {
                console.log(erro);

                res.status(400)
                res.json({erro: "Erro ao enviar email"})
            }
        }else{
            res.status(406)
            res.json({erro: "Erro, talvez o email usado não exista"})
        }
    }
    
    async mudarSenha(req, res){
        let token = req.params.token;
        let senha = req.body.senha;
        let tokenBearer = req.headers["authorization"]
        const bearer = tokenBearer.split(" ")
        let tokenLogin = bearer[1]
        
        // Validações
        if (token == undefined) {
            res.status(400)
            res.json({erro: "token inválido1"})
        }
        
        if (senha == undefined) {
            res.status(400)
            res.json({erro: "senha inválida"})
        }

        if (token != undefined) {
            if (token == undefined || token.trim().length === 0) {
                res.status(400)
                res.json({erro: "token inválido"})
            }
        }
        
        if (senha != undefined) {
            if (senha == undefined || senha.trim().length === 0) {
                res.status(400)
                res.json({erro: "senha inválida"})
            }
        }

        let tokenValido = await new SenhaToken().validar(token);
        if(tokenValido.status == false) {
            res.status(406);
            res.json({erro: "Token inválido ou inexistente!"});
            return
        }

        if (senha.length < 8) {
            res.status(400)
            res.json({erro: "A senha precisa ter no mínimo 8 caracteres"})
        }

        // Validar se a conta a ter a senha mudada pertence a esse usuário
        const tokenMudarSenhaValido = await new Usuario().findBlacklist(tokenLogin)
        
        if(tokenMudarSenhaValido != null || tokenMudarSenhaValido != undefined) {
            res.status(403);
            res.json({erro: "Token invalido"});
            return
        }

        try {
            let usuario = await new Usuario().encontrarPorId(tokenValido.token.usuario);
            let decoded = await jwt.verify(tokenLogin, secret)

            if(decoded.usuario.senha != usuario.senha){
                res.status(403);
                res.json({erro: "Erro ao mudar senha!"});
                return
            }
        } catch (erro) {
            res.status(401);
            res.json({erro: "Token inválido"});
            return
        }



        try {
            let usuario = await new Usuario().mudarSenha(senha, tokenValido.token.usuario, tokenValido.token.token);
            await new Usuario().blacklistToken(tokenLogin)
            
            // Terminando sessão / Adicionando o token de login antigo à lista negra
            await new Usuario().blacklistToken(token)
            
            let HATEOAS = [
                {
                    href: process.env.URL_API+"/usuario/"+usuario.id,
                    method: "get",
                    rel: "usuário_pelo_id",
                },
                {
                    href: process.env.URL_API+"/usuario/email/"+usuario.email,
                    method: "get",
                    rel: "usuário_pelo_email"
                },
                {
                    href: process.env.URL_API+"/usuario",
                    method: "put",
                    rel: "editar_usuario"
                },
                {
                    href: process.env.URL_API+"/recuperarsenha"+"/"+usuario.email,
                    method: "post",
                    rel: "enviar_email_de_recuperação_de_senha"
                },
                {
                    href: process.env.URL_API+"/usuario/"+usuario.id+"/"+usuario.email,
                    method: "post",
                    rel: "enviar_email_de_deleção_de_conta"
                },
                {
                    href: process.env.URL_API+"/usuario/"+usuario.id,
                    method: "delete",
                    rel: "adm_deletar_usuário"
                }
            ]

            res.status(200);
            res.json({usuario: usuario, _links: HATEOAS,msg: "Senha alterada com sucesso"});
        } catch (erro) {
            console.log(erro);
            res.status(400);
            res.json({erro: "Erro ao mudar senha"});
        }
    }
}