const Apontamento = require("../models/Apontamento")
const Assunto = require("../models/Assunto")

class AssuntoController {

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
           let erroExist = await Assunto.novo(nome, icone)
            if (erroExist.status == 400) {
                res.status(400)
                res.json({err: "Erro ao criar assunto"})
                return
            } else {
                res.status(200)
                res.send("Assunto criado com sucesso")
                return
            }
        } catch (erro) {
            console.log(erro);
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

        if (nome == undefined) {
            res.status(400)
            res.json({err: "nome inválido"})
            return
        }

        if (icone == undefined) {
            res.status(400)
            res.json({err: "icone inválido"})
            return
        }

        try {
           let erroExist = await Assunto.editar(id, nome, icone)
            if (erroExist.status == 400) {
                res.status(400)
                res.json({err: "Erro ao editar assunto"})
                return
            } else {
                res.status(200)
                res.send("Assunto editado com sucesso")
                return
            }
        } catch (erro) {
            console.log(erro);
        }
    }

    async deletar(req, res){
        let id = req.params.id;
        
        let result = await Assunto.deletar(id);

        if(result.status == true){
            res.status(200)
            res.send("Deletado com sucesso")
            return
        }else{
            res.status(406);
            res.json({err: "Erro ao deletar (talvez o assunto não exista no banco de dados)"})
            return
        }
    }

    // Requisições

    async assuntoPage(req, res){
        let assunto = req.params.slug
        try {
            let apontamentos = await Apontamento.apontamentoDoAssunto(assunto)

            res.status(200)
            res.json({assunto: assunto, assuntos: assuntos, apontamentos: apontamentos})
        } catch (error) {
            res.status(404)
            res.json({err: "Nenhum apontamento encontrado"})
        }
    }

    async AssuntoById(req, res){
        let id = req.params.id
        let assunto = await Assunto.encontrarPorId(id)

        res.status(200)
        res.json({assunto: assunto})
    }

    async Assuntos(req, res){
        try {
            let assuntos = await Assunto.assuntoAll()

            res.status(200)
            res.json({assuntos: assuntos})
        } catch (error) {
            res.status(404)
            res.json({err: "Nenhum assunto encontrado"})
        }
    }
    
}

module.exports = new AssuntoController()