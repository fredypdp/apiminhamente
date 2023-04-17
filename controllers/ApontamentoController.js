import { log } from "console";
import Apontamento from "../models/Apontamento.js";
import FileManager from "../models/FileManager.js";

import fs from "fs";
import { promisify } from "util";
const unlinkAsync = promisify(fs.unlink)

export default class ApontamentoController {

    // CRUD

    async criar(req, res) {
        let {titulo, conteudo, assuntos, temas, visibilidade,} = req.body

        // Validações
        if (req.file == undefined) {
            res.status(400)
            res.json({erro: "Miniatura inválida"})
            return
        }
        
        let miniatura
        if (req.file != undefined) {
            if (req.file.mimetype != "image/png" && "image/jpg" && "image/jpeg") {
                await unlinkAsync(req.file.destination+req.file.filename)
                res.status(400)
                res.json({erro: "A miniatura deve ser uma imagem"})
                return
            }
            
            miniatura = req.file.destination+req.file.filename
        }
        
        if (titulo == undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            res.status(400)
            res.json({erro: "Título inválido"})
            return
        }

        if (conteudo == undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            res.status(400)
            res.json({erro: "Conteúdo inválido"})
            return
        }
        
        if (assuntos == undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            res.status(400)
            res.json({erro: "Assuntos inválidos"})
            return
        }

        if (assuntos != undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            assuntos.forEach( assunto => {
                if(assunto.length <= 0){
                    res.status(400)
                    res.json({erro: "Assunto inválido"})
                }
            })
            return
        }
        
        if (temas != undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            temas.forEach( tema => {
                if(tema.length <= 0){
                    res.status(400)
                    res.json({erro: "Tema inválido"})
                }
            })
            return
        }
        
        // Criando
        try {
            let cdn = await new FileManager().upload(miniatura) // Upload da miniatura para a Cloudinary e retornando a cdn
            await unlinkAsync(miniatura) // Deletando miniatura da pasta "temp"

            let apontamento = await new Apontamento().novo(titulo, conteudo, assuntos, temas, visibilidade, cdn.secure_url, cdn.public_id)

            res.status(200)
            res.json({apontamento: apontamento,msg: "Apontamento criado com sucesso"})
        } catch (erro) {
            console.log(erro)
            res.status(406)
            res.json({erro: "Erro ao criar apontamento"})
        }
    }
    
    async editar(req, res) {
        let {_id, titulo, conteudo, assuntos, temas, visibilidade} = req.body
        
        // Validações
        if (_id == undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            res.status(400)
            res.json({erro: "_id inválido"})
            return
        }

        if (assuntos != undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            assuntos.forEach( assunto => {
                if(assunto.length <= 0){
                    res.status(400)
                    res.json({erro: "Assunto inválido"})
                    return
                }
            })
        }
        
        if (temas != undefined) {
            if (req.file != undefined) {
                await unlinkAsync(req.file.destination+req.file.filename)
            }

            temas.forEach( tema => {
                if(tema.length <= 0){
                    res.status(400)
                    res.json({erro: "Tema inválido"})
                    return
                }
            })
        }
        
        if (req.file == undefined && titulo == undefined && conteudo == undefined && assuntos == undefined && temas == undefined && visibilidade == undefined) {
            res.status(400)
            res.json({erro: "Preencha os campos"})
            return
        }
        
        // if (rtitulo == undefined && conteudo == undefined && assuntos == undefined && temas == undefined && visibilidade == undefined) {
        //     if (req.file != undefined) {
        //         await unlinkAsync(req.file.destination+req.file.filename)
        //     }

        //     res.status(400)
        //     res.json({erro: "Preencha os campos"})
        //     return
        // }
        
        let miniatura

        if (req.file != undefined) {
            if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/jpeg") {
                await unlinkAsync(req.file.destination+req.file.filename)
                res.status(400)
                res.json({erro: "A miniatura deve ser uma imagem"})
                return
            }
            
            miniatura = req.file.destination+req.file.filename
        }
        

        // Editando
        try {
            let cdn
            if (miniatura != undefined) {
                cdn = await new FileManager().upload(miniatura) // Upload da miniatura para a Cloudinary e retornando a cdn
                await unlinkAsync(miniatura) // Deletando miniatura da pasta "temp"
                let apontamento = await new Apontamento().editar(_id, titulo, conteudo, assuntos, temas, visibilidade, cdn.secure_url, cdn.public_id)
                
                res.status(200)
                res.json({apontamento: apontamento,msg: "Apontamento editado com sucesso"})
                return
            }
            
            let apontamento = await new Apontamento().editar(_id, titulo, conteudo, assuntos, temas, visibilidade)
            
            res.status(200)
            res.json({apontamento: apontamento,msg: "Apontamento editado com sucesso"})
        } catch (erro) {
            console.log(erro)
            res.status(406)
            res.json({erro: "Erro ao editar apontamento"})
        }
    }

    async deletar(req, res){
        let id = req.params.id;

        try {
            let erroExist = await new Apontamento().deletar(id)
            
            if (erroExist.status == 406) {
                res.status(404)
                res.json({erro: "O apontamento não existe, portanto não pode ser deletado"})
            } else {
                res.status(200)
                res.json({data: erroExist, msg: "Apontamento deletado com sucesso"})
            }
        } catch (erro) {
            console.log(erro)
            res.status(406)
            res.json({erro: "Erro ao deletar o apontamento"})
        }
    }

    // Requisições

    async Apontamentos(req, res){
        try {
            let apontamentos = await new Apontamento().apontamentoAll()

            res.status(200)
            res.json({apontamentos: apontamentos})
        } catch (erro) {
            console.log(erro)
            res.status(404)
            res.json({erro: "Erro ao encontrar apontamentos"})
        }
    }

    async apontamentoById(req, res){
        let id = req.params.id

        if (id == undefined) {
            res.status(400)
            res.json({erro: "id inválido"})
            return
        }
        
        try {                
            let apontamento = await new Apontamento().encontrarPorId(id)
            
            res.status(200)
            res.json({apontamento: apontamento})
        } catch (erro) {
            console.log(erro)
            res.status(404)
            res.json({erro: "Erro ao encontrar apontamento"})
        }
    }

    async pesquisarApontamento(req, res){
        let pesquisa = req.query["pesquisa"]

        try {
            let apontamentos = await new Apontamento().pesquisa(pesquisa);

            res.status(200)
            res.json({apontamentos: apontamentos})
        } catch (erro) {
            console.log(erro)
            res.status(404)
            res.json({erro: "Erro ao encontrar apontamento"})
        }
    }
}