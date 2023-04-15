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
        
        if (req.file.mimetype != "image/png" && "image/jpg" && "image/jpeg") {
            res.status(400)
            res.json({erro: "A miniatura deve ser uma imagem"})
            return
        }

        let miniatura = req.file.destination+req.file.filename
        
        if (titulo == undefined) {
            res.status(400)
            res.json({erro: "Título inválido"})
            return
        }

        if (conteudo == undefined) {
            res.status(400)
            res.json({erro: "Conteúdo inválido"})
            return
        }
        
        if (assuntos == undefined) {
            res.status(400)
            res.json({erro: "Assuntos inválidos"})
            return
        }


        try {
            var cdn = await new FileManager().upload(miniatura) // Upload da miniatura para a Cloudinary e retornando a cdn
        } catch (erro) {
            res.status(400)
            res.json({erro: "Erro ao upload da imagem"})
        }
        
        await unlinkAsync(miniatura) // Deletando miniatura da pasta "temp"

        // Criando
        try {
            let apontamento = await new Apontamento().novo(titulo, conteudo, assuntos, temas, visibilidade)

            res.status(200)
            res.json({apontamento: apontamento,msg: "Apontamento criado com sucesso"})
        } catch (erro) {
            console.log(erro)
            res.status(400)
            res.json({erro: "Erro ao criar apontamento"})
        }
    }

    async editar(req, res) {
        let {id, titulo, conteudo, assuntos} = req.body
        let miniatura = req.file.destination+req.file.filename

        // Validações
        if (id == undefined) {
            res.status(400)
            res.json({err: "id inválido"})
            return
        }

        if (titulo == undefined) {
            res.status(400)
            res.json({err: "titulo inválido"})
            return
        }

        if (conteudo == undefined) {
            res.status(400)
            res.json({err: "conteudo inválido"})
            return
        }
        
        if (assuntos == undefined) {
            res.status(400)
            res.json({err: "assunto inválido"})
            return
        }

        if (miniatura == undefined) {
            res.status(400)
            res.json({err: "miniatura inválido"})
            return
        }
        
        // Editando 
        let ResultApontamento = await new Apontamento().encontrarId(id)
        new FileManager().delete(ResultApontamento.miniatura_public_id) // Deletando a antiga miniatura salva na nuvem

        let cdn = await new FileManager().upload(miniatura) // Upload da imagem para a Cloudinary e retornando a cdn
        
        try {
            await unlinkAsync(miniatura) // Deletando imagem da pasta "temp"
            await new Apontamento().editar(id, titulo, conteudo, assuntos, cdn.secure_url, cdn.public_id)

            res.status(200)
            res.send("Apontamento editado com sucesso")
        } catch (error) {
            res.status(400)
            res.json({err: "Erro ao editar"})
        }
    }

    async deletar(req, res){
        let id = req.params.id;
        
        let result = await new Apontamento().deletar(id);

        if(result.status){
            res.status(200)
            res.send("Apontamento deletado com sucesso")
            return
        }else{
            res.status(406);
            res.json({err: "Erro ao deletar o apontamento"})
            console.log(result.err);
            return
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
            res.json({erro: "Erro ao encontrar apontamento"})
        }
    }

    async apontamentoById(req, res){
        let id = req.params.id

        if (id != undefined) {

            try {                
                let apontamento = await new Apontamento().encontrarPorId(id)
                
                res.status(200)
                res.json({apontamento: apontamento})
            } catch (erro) {
                console.log(erro)
                res.status(404)
                res.json({err: "Nenhum apontamento encontrado"})
            }
        } else {
            res.status(404)
            res.send("ID inválido")
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
            res.json({err: "Nenhum apontamento encontrado"})
        }
    }
}