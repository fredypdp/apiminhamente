import Apontamento from "../models/Apontamento.js";
import Assunto from "../models/Assunto.js";
import FileManager from "../models/fileManager.js";

import fs from "fs";
import { promisify } from "util";
const unlinkAsync = promisify(fs.unlink)

export default class ApontamentoController {

    // CRUD

    async criar(req, res) {
        let {titulo, conteudo, assuntos} = req.body
        let miniatura = req.file.destination+req.file.filename

        // Validações
        if (titulo == undefined) {
            res.status(400)
            res.json({err: "email inválido"})
            return
        }

        if (conteudo == undefined) {
            res.status(400)
            res.json({err: "email inválido"})
            return
        }
        
        if (assuntos == undefined) {
            res.status(400)
            res.json({err: "email inválido"})
            return
        }

        if (miniatura == undefined) {
            res.status(400)
            res.json({err: "email inválido"})
            return
        }

        // Criando
        try {
            let cdn = await FileManager.upload(miniatura) // Upload da miniatura para a Cloudinary e retornando a cdn
                
            await unlinkAsync(miniatura) // Deletando miniatura da pasta "temp"
            await Apontamento.novo(titulo, conteudo, assuntos, cdn.secure_url, cdn.public_id)

            res.status(200)
            res.send("Apontamento criado com sucesso")
        } catch (error) {
            res.status(400)
            res.json({err: "Erro ao criar"})
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
        let ResultApontamento = await Apontamento.encontrarId(id)
        FileManager.delete(ResultApontamento.miniatura_public_id) // Deletando a antiga miniatura salva na nuvem

        let cdn = await FileManager.upload(miniatura) // Upload da imagem para a Cloudinary e retornando a cdn
        
        try {
            await unlinkAsync(miniatura) // Deletando imagem da pasta "temp"
            await Apontamento.editar(id, titulo, conteudo, assuntos, cdn.secure_url, cdn.public_id)

            res.status(200)
            res.send("Apontamento editado com sucesso")
        } catch (error) {
            res.status(400)
            res.json({err: "Erro ao editar"})
        }
    }

    async deletar(req, res){
        let id = req.params.id;
        
        let result = await Apontamento.deletar(id);

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
    
    async pesquisarApontamento(req, res){
        let pesquisa = req.query["search"]
        try {
            let apontamentos = await Apontamento.pesquisa(pesquisa);

            res.status(200)
            res.json({apontamentos: apontamentos})
        } catch (error) {
            res.status(404)
            res.json({err: "Nenhum apontamento encontrado"})
        }
    }

    async Apontamentos(req, res){
        try {
            let apontamentos = await Apontamento.apontamentoAll()
            res.status(200)
            res.json({apontamentos: apontamentos})
        } catch (error) {
            res.status(404)
            res.json({err: "Nenhum apontamento encontrado"})
        }
    }

    async apontamentoById(req, res){
        let id = req.params.id

        if (id != undefined) {

            try {                
                let apontamento = await Apontamento.encontrarId(id)
                
                res.status(200)
                res.json({apontamento: apontamento})
            } catch (error) {
                res.status(404)
                res.json({err: "Nenhum apontamento encontrado"})
            }
        } else {
            res.status(404)
            res.send("ID inválido")
        }
    }

    async apontamentoPage(req, res){
        let id = req.params.id
        let assuntos = await Assunto.assuntoAll()
        let apontamento = await Apontamento.encontrarId(id)
        
        // Definindo as datas de criação e edição
        let fuso = -3

        // Data de criação
        let dCriacao = apontamento.criadoEm
        let utcCriacao = dCriacao.getTime()+(dCriacao.getTimezoneOffset() * 60000)
        let dataCriacao = new Date(utcCriacao + ( 3600000 * fuso))
        let anoCriacao = dataCriacao.getFullYear()
        let mesCriacao = dataCriacao.getMonth()
        let diaCriacao = dataCriacao.getDate()
        let horasCriacao = dataCriacao.getHours()
        let minutosCriacao = dataCriacao.getMinutes()
        let segundosCriacao = dataCriacao.getSeconds()

        switch (mesCriacao) {
            case 0:
                mesCriacao = "Janeiro"
                break;
            case 1:
                mesCriacao = "Fevereiro"
                break;
            case 2:
                mesCriacao = "Março"
                break;
            case 3:
                mesCriacao = "Abril"
                break;
            case 4:
                mesCriacao = "Maio"
                break;
            case 5:
                mesCriacao = "Junho"
                break;
            case 6:
                mesCriacao = "Julho"
                break;
            case 7:
                mesCriacao = "Agosto"
                break;
            case 8:
                mesCriacao = "Setembro"
                break;
            case 9:
                mesCriacao = "Outubro"
                break;
            case 10:
                mesCriacao = "Novembro"
                break;
            case 11:
                mesCriacao = "Dezembro"
                break;
            default:
                break;
        }

        // Data de edição
        let dEdicao = apontamento.editadoEm
        let utcEdicao = dEdicao.getTime()+(dEdicao.getTimezoneOffset() * 60000)
        let dataEdicao = new Date(utcEdicao + ( 3600000 * fuso))
        let anoEdicao = dataEdicao.getFullYear()
        let mesEdicao = dataEdicao.getMonth()
        let diaEdicao = dataEdicao.getDate()
        let horasEdicao = dataEdicao.getHours()
        let minutosEdicao = dataEdicao.getMinutes()
        let segundosEdicao = dataEdicao.getSeconds()

        switch (mesEdicao) {
            case 0:
                mesEdicao = "Janeiro"
                break;
            case 1:
                mesEdicao = "Fevereiro"
                break;
            case 2:
                mesEdicao = "Março"
                break;
            case 3:
                mesEdicao = "Abril"
                break;
            case 4:
                mesEdicao = "Maio"
                break;
            case 5:
                mesEdicao = "Junho"
                break;
            case 6:
                mesEdicao = "Julho"
                break;
            case 7:
                mesEdicao = "Agosto"
                break;
            case 8:
                mesEdicao = "Setembro"
                break;
            case 9:
                mesEdicao = "Outubro"
                break;
            case 10:
                mesEdicao = "Novembro"
                break;
            case 11:
                mesEdicao = "Dezembro"
                break;
            default:
                break;
        }

        const dataDeCriacao = `${diaCriacao} de ${mesCriacao} de ${anoCriacao} - ${horasCriacao}:${minutosCriacao}:${segundosCriacao}`

        const dataDeEdicao = `${diaEdicao} de ${mesCriacao} de ${anoEdicao} - ${horasEdicao}:${minutosEdicao}:${segundosEdicao}`

        if (apontamento != undefined) {
            let user = req.session.user
            
            res.status(200)
            res.json({user: user, assuntos: assuntos, apontamento: apontamento, dataCriacao: dataDeCriacao, dataEdicao: dataDeEdicao})
            return
        } else {
            res.status(404)
            res.send("Apontamento não foi encontrado")
            return
        }
    }
}