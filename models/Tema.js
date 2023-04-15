import TemaSchema from "../Schemas/TemaSchema.js";
import AssuntoSchema from "../Schemas/AssuntoSchema.js";
import ApontamentoSchema from "../Schemas/ApontamentoSchema.js";
import slugify from "slugify";

export default class Assunto {

    async novo(nome, icone){
        let assuntoEncontrado = await this.encontrarPorNome(nome)
        
        if (assuntoEncontrado != undefined) {
            let erro = {status: 400, msg: "O nome já está cadastrado"}
            return erro
        }

        try {
            let assunto = await AssuntoSchema.create({nome: nome, slug: slugify(nome), icone: icone})
            return assunto
        } catch (erro) {
            return erro
        }
    }

    async editar(id, novoNome, novoIcone){
        let assuntoEditar = {}

        if (novoNome != undefined) {
            assuntoEditar.nome = novoNome
            assuntoEditar.slug = slugify(novoNome)
        }
        
        if (novoIcone != undefined) {
            assuntoEditar.icone = novoIcone
        }

        try {
            let assunto = await AssuntoSchema.findByIdAndUpdate(id, assuntoEditar, {new: true})
            return assunto           
        } catch (erro) {
            return erro
        }
    }

    async deletar(id){
        let assuntoEncontrado = await this.encontrarPorId(id);
        
        if (assuntoEncontrado == undefined) {
            let erro = {status: 406, msg: "O assunto não existe, portanto não pode ser deletado"}
            return erro
        }

        try{
           let assunto = await AssuntoSchema.findByIdAndDelete(id)
           return assunto
        }catch(erro){
            return erro
        }
    }

    async assuntoAll(){
        try{
            let result = await AssuntoSchema.find({}).sort({nome: 1 })
            return result
        }catch(erro){
            console.log(erro)
            return erro
        }
    }

    async encontrarPorSlug(slug){
        try {
            let result = await AssuntoSchema.findOne({slug: slug})
            return result
        } catch (erro) {
            return erro
        }
    }
    
    async encontrarPorNome(nome){
        try {
            let result = await AssuntoSchema.findOne({nome: nome})
            return result
        } catch (erro) {
            return erro
        }
    }

    async encontrarPorId(id){
        try{
            let result = await AssuntoSchema.findById(id)
            return result
        }catch(erro){
            return erro
        }
    }

}