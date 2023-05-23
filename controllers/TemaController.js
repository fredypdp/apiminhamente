import Tema from "../models/Tema.js";

export default class AssuntoController {

    // CRUD

    async criar(req, res){
        let { titulo, assunto } = req.body
        
        // Validações
        if (titulo == undefined) {
            res.status(400)
            res.json({erro: "Título inválido, o campo está vazio"})
            return
        }
        
        if (assunto == undefined) {
            res.status(400)
            res.json({erro: "Assunto inválido, o campo está vazio"})
            return
        }

        if (titulo != undefined) {
            if (titulo.trim().length === 0) {
                res.status(400)
                res.json({erro: "Titulo inválido, o campo está vazio"})
                return
            }
        }
        
        if (assunto != undefined) {
            if (assunto.trim().length === 0) {
                res.status(400)
                res.json({erro: "Assunto inválido, o campo está vazio"})
                return
            }
        }

        if (titulo.length > 200) {
            res.status(400)
            res.json({erro: "O titulo deve ter menos de 200 cacteres"})
            return
        }

        try {
            let erroExist = await new Tema().novo(titulo.trim(), assunto.trim())
            if (erroExist.status == 400) {
                res.status(406)
                res.json({erro: "Já existe um tema com esse nome"})
            } else {

                let HATEOAS = [
                    {
                        href: process.env.URL_API+"/tema/"+erroExist._id,
                        method: "get",
                        rel: "tema_pelo_id",
                    },
                    {
                        href: process.env.URL_API+"/tema/slug/"+erroExist.slug,
                        method: "get",
                        rel: "tema_pelo_slug",
                    },
                    {
                        href: process.env.URL_API+"/tema",
                        method: "put",
                        rel: "editar_tema",
                    },
                    {
                        href: process.env.URL_API+"/tema/"+erroExist._id,
                        method: "delete",
                        rel: "deletar_tema",
                    },
                ]

                res.status(200)
                res.json({tema: erroExist, _links: HATEOAS, msg: "Tema criado com sucesso"})
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
            res.json({erro: "id inválido, o campo está vazio"})
            return
        }

        if (titulo == undefined) {
            res.status(400)
            res.json({erro: "Titulo inválido, o campo está vazio"})
            return
        }

        if (id != undefined) {
            if (id.trim().length === 0) {
                res.status(400)
                res.json({erro: "id inválido, o campo está vazio"})
                return
            }
        }
        
        if (titulo != undefined) {
            if (titulo.trim().length === 0) {
                res.status(400)
                res.json({erro: "Titulo inválido, o campo está vazio"})
                return
            }
        }

        if (titulo != undefined && titulo.length > 200) {
            res.status(400)
            res.json({erro: "O titulo deve ter menos de 200 cacteres"})
            return
        }

        try {
           let tema = await new Tema().editar(id, titulo.trim())

           let HATEOAS = [
                {
                    href: process.env.URL_API+"/tema/"+tema._id,
                    method: "get",
                    rel: "tema_pelo_id",
                },
                {
                    href: process.env.URL_API+"/tema/slug/"+tema.slug,
                    method: "get",
                    rel: "tema_pelo_slug",
                },
                {
                    href: process.env.URL_API+"/tema",
                    method: "put",
                    rel: "editar_tema",
                },
                {
                    href: process.env.URL_API+"/tema/"+tema._id,
                    method: "delete",
                    rel: "deletar_tema",
                },
            ]

            res.status(200)
            res.json({tema: tema, _links: HATEOAS, msg: "Tema editado com sucesso"})
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
            let erroExist = await new Tema().deletar(id);
            
            if (erroExist.status == 406) {
                res.status(404)
                res.json({erro: "O tema não existe, portanto não pode ser deletado"})
            } else {
                res.status(200)
                res.json({tema: erroExist, msg: "Tema Deletado com sucesso"})
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

    async TemaTitulo(req, res){
        let titulo = req.params.titulo

        // Validações
        if (titulo == undefined) {
            res.status(400)
            res.json({erro: "Slug inválido, o campo está vazio"})
            return
        }

        if (titulo != undefined) {
            if (titulo.trim().length === 0) {
                res.status(400)
                res.json({erro: "Titulo inválido, o campo está vazio"})
                return
            }
        }

        try {
            let tema = await new Tema().encontrarPorTitulo(titulo.trim())

            if(tema == undefined) {
                res.status(200)
                res.json({tema: tema})
                return
            }
            
            let HATEOAS = [
                {
                    href: process.env.URL_API+"/tema/"+tema._id,
                    method: "get",
                    rel: "tema_pelo_id",
                },
                {
                    href: process.env.URL_API+"/tema/slug/"+tema.slug,
                    method: "get",
                    rel: "tema_pelo_slug",
                },
                {
                    href: process.env.URL_API+"/tema",
                    method: "put",
                    rel: "editar_tema",
                },
                {
                    href: process.env.URL_API+"/tema/"+tema._id,
                    method: "delete",
                    rel: "deletar_tema",
                },
            ]

            res.status(200)
            res.json({tema: tema, _links: HATEOAS})
        } catch (erro) {
            console.log(erro)
            res.status(404)
            res.json({erro: "Erro ao encontrar tema"})
        }
    }

    async TemaSlug(req, res){
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
            let tema = await new Tema().encontrarPorSlug(slug.trim())

            if(tema == undefined) {
                res.status(200)
                res.json({tema: tema})
                return
            }

            let HATEOAS = [
                {
                    href: process.env.URL_API+"/tema/"+tema._id,
                    method: "get",
                    rel: "tema_pelo_id",
                },
                {
                    href: process.env.URL_API+"/tema/slug/"+tema.slug,
                    method: "get",
                    rel: "tema_pelo_slug",
                },
                {
                    href: process.env.URL_API+"/tema",
                    method: "put",
                    rel: "editar_tema",
                },
                {
                    href: process.env.URL_API+"/tema/"+tema._id,
                    method: "delete",
                    rel: "deletar_tema",
                },
            ]

            res.status(200)
            res.json({tema: tema, _links: HATEOAS})
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
            let tema = await new Tema().encontrarPorId(id)

            if(tema == undefined) {
                res.status(200)
                res.json({tema: tema})
                return
            }

            let HATEOAS = [
                {
                    href: process.env.URL_API+"/tema/"+tema._id,
                    method: "get",
                    rel: "tema_pelo_id",
                },
                {
                    href: process.env.URL_API+"/tema/slug/"+tema.slug,
                    method: "get",
                    rel: "tema_pelo_slug",
                },
                {
                    href: process.env.URL_API+"/tema",
                    method: "put",
                    rel: "editar_tema",
                },
                {
                    href: process.env.URL_API+"/tema/"+tema._id,
                    method: "delete",
                    rel: "deletar_tema",
                },
            ]

            res.status(200)
            res.json({tema: tema, _links: HATEOAS})
        } catch (erro) {
            console.log(erro)
            res.status(404)
            res.json({erro: "Erro ao encontrar tema"})
        }
    }
}