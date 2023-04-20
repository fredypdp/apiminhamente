import Assunto from "../models/Assunto.js";

export default class AssuntoController {

    // CRUD

    async criar(req, res){
        let {nome, icone} = req.body
          
        // Validações
        if (nome == undefined) {
            res.status(400)
            res.json({erro: "nome inválido"})
            return
        }

        if (icone == undefined) {
            res.status(400)
            res.json({erro: "ícone inválido"})
            return
        }

        if (nome != undefined) {
            if (nome.trim().length === 0) {
                res.status(400)
                res.json({erro: "nome inválido"})
                return
            }
        }

        if (icone != undefined) {
            if (icone.trim().length === 0) {
                res.status(400)
                res.json({erro: "icone inválido"})
                return
            }
        }

        try {
            let erroExist = await new Assunto().novo(nome, icone)
            if (erroExist.status == 400) {
                res.status(406)
                res.json({erro: "Já existe um assunto com esse nome"})
            } else {
                res.status(200)
                res.json({data: erroExist, msg: "Assunto criado com sucesso"})
            }
        } catch (erro) {
            console.log(erro)
            res.status(406)
            res.json({erro: "Erro ao criar assunto"})
        }
    }

    async editar(req, res){
        let {id, nome, icone} = req.body
          
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

        if (nome == undefined && icone == undefined) {
            res.status(400)
            res.json({erro: "nome e icone inválidos"})
            return
        }
        
        if (nome != undefined) {
            if (nome.trim().length === 0) {
                res.status(400)
                res.json({erro: "nome inválido"})
                return
            }
        }
        
        if (icone != undefined) {
            if (icone.trim().length === 0) {
                res.status(400)
                res.json({erro: "icone inválidos"})
                return
            }
        }

        // Editando assunto
        try {
            let erroExist = await new Assunto().editar(id, nome, icone)
            if (erroExist.status == 400) {
                res.status(406)
                res.json({erro: "Já existe um assunto com esse nome"})
            } else {
                res.status(200)
                res.json({data: erroExist, msg: "Assunto editado com sucesso"})
            }
        } catch (erro) {
            console.log(erro)
            res.status(406)
            res.json({erro: "Erro ao editar assunto"})
        }
    }

    async deletar(req, res){
        let id = req.params.id;

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
            let erroExist = await new Assunto().deletar(id);
            
            if (erroExist.status == 406) {
                res.status(404)
                res.json({erro: "O assunto não existe, portanto não pode ser deletado"})
            } else {
                res.status(200)
                res.json({data: erroExist, msg: "Assunto Deletado com sucesso"})
            }
        } catch (erro) {
            console.log(erro)
            res.status(406)
            res.json({erro: "Erro ao deletar assunto"})
        }
    }

    // Requisições

    async Assuntos(req, res){
        try {
            let assuntos = await new Assunto().assuntoAll()

            res.status(200)
            res.json({assuntos: assuntos})
        } catch (erro) {
            console.log(erro);
            res.status(404)
            res.json({erro: "Erro ao encontrar assuntos"})
        }
    }

    async AssuntoSlug(req, res){
        let slug = req.params.slug

        // Validações
        if (slug == undefined) {
            res.status(400)
            res.json({erro: "Slug inválido"})
            return
        }
        
        if (slug != undefined) {
            if (slug.trim().length === 0) {
                res.status(400)
                res.json({erro: "Slug inválido"})
                return
            }
        }

        try {
            let assunto = await new Assunto().encontrarPorSlug(slug)

            res.status(200)
            res.json({assunto: assunto})
        } catch (erro) {
            console.log(erro)
            res.status(404)
            res.json({erro: "Erro ao encontrar assunto"})
        }
    }

    async AssuntoById(req, res){
        let id = req.params.id
        
        // Validações
        if (id == undefined || id.trim().length === 0) {
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
            let assunto = await new Assunto().encontrarPorId(id)
            
            res.status(200)
            res.json({assunto: assunto})
        } catch (erro) {
            console.log(erro)
            res.status(404)
            res.json({erro: "Erro ao encontrar assunto"})
        }
    }
}