import Assunto from "../models/Assunto.js";

export default class AssuntoController {

    // CRUD

    async criar(req, res){
        let {nome, icone} = req.body
          
        // Validações
        if (nome == undefined) {
            res.status(400)
            res.json({erro: "nome inválido, o campo está vazio"})
            return
        }

        if (icone == undefined) {
            res.status(400)
            res.json({erro: "ícone inválido, o campo está vazio"})
            return
        }

        if (nome != undefined) {
            if (nome.trim().length === 0) {
                res.status(400)
                res.json({erro: "nome inválido, o campo está vazio"})
                return
            }
        }

        if (icone != undefined) {
            if (icone.trim().length === 0) {
                res.status(400)
                res.json({erro: "icone inválido, o campo está vazio"})
                return
            }
        }

        try {
            let erroExist = await new Assunto().novo(nome, icone)
            if (erroExist.status == 400) {
                res.status(406)
                res.json({erro: "Já existe um assunto com esse nome"})
            } else {

                let HATEOAS = [
                    {
                        href: process.env.URL_API+"/assunto/"+erroExist._id,
                        method: "get",
                        rel: "assunto_pelo_id",
                    },
                    {
                        href: process.env.URL_API+"/assunto/slug/"+erroExist.slug,
                        method: "get",
                        rel: "assunto_pelo_slug",
                    },
                    {
                        href: process.env.URL_API+"/assunto",
                        method: "put",
                        rel: "editar_assunto",
                    },
                    {
                        href: process.env.URL_API+"/assunto/"+erroExist._id,
                        method: "delete",
                        rel: "deletar_assunto",
                    },
                ]

                res.status(200)
                res.json({data: erroExist, _links: HATEOAS, msg: "Assunto criado com sucesso"})
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
            res.json({erro: "id inválido, o campo está vazio"})
            return
        }

        if (id != undefined) {
            if (id.trim().length === 0) {
                res.status(400)
                res.json({erro: "id inválido, o campo está vazio"})
                return
            }
        }

        if (nome == undefined && icone == undefined) {
            res.status(400)
            res.json({erro: "nome e icone inválidos, os campos estão vazios"})
            return
        }
        
        if (nome != undefined) {
            if (nome.trim().length === 0) {
                res.status(400)
                res.json({erro: "nome inválido, o campo está vazio"})
                return
            }
        }
        
        if (icone != undefined) {
            if (icone.trim().length === 0) {
                res.status(400)
                res.json({erro: "icone inválido, o campo está vazio"})
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

                let HATEOAS = [
                    {
                        href: process.env.URL_API+"/assunto/"+erroExist._id,
                        method: "get",
                        rel: "assunto_pelo_id",
                    },
                    {
                        href: process.env.URL_API+"/assunto/slug/"+erroExist.slug,
                        method: "get",
                        rel: "assunto_pelo_slug",
                    },
                    {
                        href: process.env.URL_API+"/assunto",
                        method: "put",
                        rel: "editar_assunto",
                    },
                    {
                        href: process.env.URL_API+"/assunto/"+erroExist._id,
                        method: "delete",
                        rel: "deletar_assunto",
                    },
                ]

                res.status(200)
                res.json({data: erroExist, _links: HATEOAS, msg: "Assunto editado com sucesso"})
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
            res.json({erro: "id inválido, o campo está vazio"})
            return
        }
        
        if (id != undefined) {
            if (id.trim().length === 0) {
                res.status(400)
                res.json({erro: "id inválido, o campo está vazio"})
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
            res.json({erro: "Slug inválido, o campo está vazio"})
            return
        }
        
        if (slug != undefined) {
            if (slug.trim().length === 0) {
                res.status(400)
                res.json({erro: "Slug inválido, o campo está vazio"})
                return
            }
        }

        try {
            let assunto = await new Assunto().encontrarPorSlug(slug)

            let HATEOAS = [
                {
                    href: process.env.URL_API+"/assunto/"+assunto._id,
                    method: "get",
                    rel: "assunto_pelo_id",
                },
                {
                    href: process.env.URL_API+"/assunto/slug/"+assunto.slug,
                    method: "get",
                    rel: "assunto_pelo_slug",
                },
                {
                    href: process.env.URL_API+"/assunto",
                    method: "put",
                    rel: "editar_assunto",
                },
                {
                    href: process.env.URL_API+"/assunto/"+assunto._id,
                    method: "delete",
                    rel: "deletar_assunto",
                },
            ]

            res.status(200)
            res.json({assunto: assunto, _links: HATEOAS})
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
            res.json({erro: "id inválido, o campo está vazio"})
            return
        }

        if (id != undefined) {
            if (id.trim().length === 0) {
                res.status(400)
                res.json({erro: "id inválido, o campo está vazio"})
                return
            }
        }

        try {
            let assunto = await new Assunto().encontrarPorId(id)
            
            let HATEOAS = [
                {
                    href: process.env.URL_API+"/assunto/"+assunto._id,
                    method: "get",
                    rel: "assunto_pelo_id",
                },
                {
                    href: process.env.URL_API+"/assunto/slug/"+assunto.slug,
                    method: "get",
                    rel: "assunto_pelo_slug",
                },
                {
                    href: process.env.URL_API+"/assunto",
                    method: "put",
                    rel: "editar_assunto",
                },
                {
                    href: process.env.URL_API+"/assunto/"+assunto._id,
                    method: "delete",
                    rel: "deletar_assunto",
                },
            ]
            
            res.status(200)
            res.json({assunto: assunto, _links: HATEOAS})
        } catch (erro) {
            console.log(erro)
            res.status(404)
            res.json({erro: "Erro ao encontrar assunto"})
        }
    }
}