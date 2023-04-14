import Apontamento from "../models/Apontamento.js";
import Assunto from "../models/Assunto.js";

export default class AssuntoController {

    // CRUD

    async criar(req, res){
        let {nome, icone} = req.body
          
        // Validações
        if (nome == undefined) {
            res.status(400)
            res.json({err: "nome inválido"})
            return
        }

        if (icone == undefined) {
            res.status(400)
            res.json({err: "ícone inválido"})
            return
        }

        try {
            let erroExist = await new Assunto().novo(nome, icone)
            if (erroExist.status == 400) {
                res.status(400)
                res.json({erro: "O nome já está cadastrado"})
            } else {
                res.status(200)
                res.json({data: erroExist, msg: "Assunto criado com sucesso"})
            }
        } catch (erro) {
            console.log(erro)
            res.status(400)
            res.json({erro: "Erro ao criar assunto"})
        }
    }

    async editar(req, res){
        let {id, nome, icone} = req.body
          
        // Validações
        if (id == undefined) {
            res.status(400)
            res.json({err: "id inválido"})
            return
        }

        if (nome == undefined && icone == undefined) {
            res.status(400)
            res.json({erro: "nome e icone inválidos"})
            return
        }

        // Editando assunto
        try {
           let assunto = await new Assunto().editar(id, nome, icone)

            res.status(200)
            res.json({data: assunto, msg: "Assunto editado com sucesso"})
        } catch (erro) {
            console.log(erro)
            res.status(400)
            res.json({erro: "Erro ao editar assunto"})
        }
    }

    async deletar(req, res){
        let id = req.params.id;

        try {
            let erroExist = await new Assunto().deletar(id);
            if (erroExist.status == 406) {
                res.status(406)
                res.json({err: "O assunto não existe, portanto não pode ser deletado"})
            } else {
                res.status(200)
                res.send("Assunto Deletado com sucesso")
            }
        } catch (erro) {
            console.log(erro)
            res.status(400)
            res.json({err: "Erro ao deletar assunto"})
        }
    }

    // Requisições

    async AssuntoSlug(req, res){
        let slug = req.params.slug

        try {
            let assunto = await new Assunto().encontrarPorSlug(slug)

            res.status(200)
            res.json({assunto: assunto})
        } catch (erro) {
            console.log(erro)
            res.status(404)
            res.json({erro: "Nenhum apontamento encontrado"})
        }
    }

    async AssuntoById(req, res){
        let id = req.params.id
        
        try {
            let assunto = await new Assunto().encontrarPorId(id)

            res.status(200)
            res.json({assunto: assunto})
        } catch (erro) {
            console.log(erro)
            res.status(404)
            res.json({erro: "Nenhum assunto encontrado"})
        }

    }

    async Assuntos(req, res){
        try {
            let assuntos = await new Assunto().assuntoAll()

            res.status(200)
            res.json({assuntos: assuntos})
        } catch (erro) {
            console.log(erro);
            res.status(404)
            res.json({erro: "Nenhum assunto encontrado"})
        }
    }
}