import Tema from "../models/Tema.js";

export default class AssuntoController {

    // CRUD

    async criar(req, res){
        let { titulo, assunto } = req.body
        
        // Validações
        if (titulo == undefined) {
            res.status(400)
            res.json({erro: "Título inválido"})
            return
        }
        
        if (assunto == undefined) {
            res.status(400)
            res.json({erro: "Assunto inválido"})
            return
        }

        if (titulo != undefined) {
            if (titulo.trim().length === 0) {
                res.status(400)
                res.json({erro: "titulo inválido"})
                return
            }
        }
        
        if (assunto != undefined) {
            if (assunto.trim().length === 0) {
                res.status(400)
                res.json({erro: "assunto inválido"})
                return
            }
        }

        try {
            let erroExist = await new Tema().novo(titulo, assunto)
            if (erroExist.status == 400) {
                res.status(406)
                res.json({erro: "Já existe um tema com esse nome"})
            } else {
                res.status(200)
                res.json({data: erroExist, msg: "Tema criado com sucesso"})
            }
        } catch (erro) {
            console.log(erro)
            res.status(406)
            res.json({erro: "Erro ao criar tema"})
        }
    }

    async editar(req, res){
        let {id, titulo} = req.body
          
        // Validações
        if (id == undefined) {
            res.status(400)
            res.json({erro: "id inválido"})
            return
        }

        if (titulo == undefined) {
            res.status(400)
            res.json({erro: "titulo inválido"})
            return
        }

        if (id != undefined) {
            if (id.trim().length === 0) {
                res.status(400)
                res.json({erro: "id inválido"})
                return
            }
        }
        
        if (titulo != undefined) {
            if (titulo.trim().length === 0) {
                res.status(400)
                res.json({erro: "titulo inválido"})
                return
            }
        }

        try {
           let tema = await new Tema().editar(id, titulo)

            res.status(200)
            res.json({data: tema, msg: "Tema editado com sucesso"})
        } catch (erro) {
            console.log(erro)
            res.status(406)
            res.json({erro: "Erro ao editar tema"})
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
            let erroExist = await new Tema().deletar(id);
            
            if (erroExist.status == 406) {
                res.status(404)
                res.json({erro: "O tema não existe, portanto não pode ser deletado"})
            } else {
                res.status(200)
                res.json({data: erroExist, msg: "Tema Deletado com sucesso"})
            }
        } catch (erro) {
            console.log(erro)
            res.status(406)
            res.json({erro: "Erro ao deletar tema"})
        }
    }

    // Requisições

    async Temas(req, res){
        try {
            let temas = await new Tema().temaAll()

            res.status(200)
            res.json({temas: temas})
        } catch (erro) {
            console.log(erro);
            res.status(404)
            res.json({erro: "Erro ao encontrar temas"})
        }
    }

    async TemaSlug(req, res){
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
                res.json({erro: "slug inválido"})
                return
            }
        }

        try {
            let tema = await new Tema().encontrarPorSlug(slug)

            res.status(200)
            res.json({tema: tema})
        } catch (erro) {
            console.log(erro)
            res.status(404)
            res.json({erro: "Erro ao encontrar tema"})
        }
    }

    async TemaById(req, res){
        let id = req.params.id
        
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
            let tema = await new Tema().encontrarPorId(id)

            res.status(200)
            res.json({tema: tema})
        } catch (erro) {
            console.log(erro)
            res.status(404)
            res.json({erro: "Erro ao encontrar tema"})
        }
    }
}