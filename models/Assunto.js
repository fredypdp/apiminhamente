import ApontamentoSchema from "../Schemas/ApontamentoSchema.js";
import AssuntoSchema from "../Schemas/AssuntoSchema.js";
import TemaSchema from "../Schemas/TemaSchema.js";
import slugify from "slugify";

export default class Assunto {
    
    async novo(nome, icone){
        let assuntoEncontrado = await this.encontrarPorNome(nome)
        
        if (assuntoEncontrado != undefined) {
            let erro = {status: 400, msg: "O nome já está cadastrado"}
            return erro
        }

        try {
            let assunto = await AssuntoSchema.create({nome: nome, slug: slugify(nome), icone: icone, created_at: new Date})
            return assunto
        } catch (erro) {
            return erro
        }
    }

    async editar(id, novoNome, novoIcone){
        let assuntoEditar = {}

        let assuntoEncontrado = await this.encontrarPorNome(nome)
        
        if (assuntoEncontrado != undefined) {
            let erro = {status: 400, msg: "O nome já está cadastrado"}
            return erro
        }

        if (novoNome != undefined) {
            assuntoEditar.nome = novoNome
            assuntoEditar.slug = slugify(novoNome)
        }
        
        if (novoIcone != undefined) {
            assuntoEditar.icone = novoIcone
        }

        assuntoEditar.edited_at = new Date

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
           
            // Remover o assunto de todos os apontamentos que ele pertence
            assunto.apontamentos.forEach( async apontamento => {
                let apontamentoEncontrado = await ApontamentoSchema.findOne({id: apontamento})
                
                if (apontamentoEncontrado != null && apontamentoEncontrado != undefined) {
                    let assuntoRemover = apontamentoEncontrado.assuntos.indexOf(assunto._id)
                
                    apontamentoEncontrado.assuntos.splice(assuntoRemover, 1)
                    apontamentoEncontrado.save()
                }
            })
            
            // Deletando todos os temas que fazem parte do assunto e apontamentos
            assunto.temas.forEach( async tema => {
                await TemaSchema.findByIdAndDelete(tema)

                let apontamentos = await ApontamentoSchema.find({})

                apontamentos.forEach( apontamento => {
                    let remover = apontamento.temas.indexOf(tema)
                            
                    if (remover != -1) {
                        tema.apontamentos.splice(remover, 1)
                        tema.save()
                    }
                })
            })
            
           return assunto
        }catch(erro){
            return erro
        }
    }

    async assuntoAll(){
        try{
            let result = await AssuntoSchema.find({}).populate("apontamentos").populate("temas").sort({created_at: 1})
            return result
        }catch(erro){
            return erro
        }
    }

    async encontrarPorNome(nome){
        try {
            let result = await AssuntoSchema.findOne({nome: nome}).populate("apontamentos").populate("temas")
            return result
        } catch (erro) {
            return erro
        }
    }

    async encontrarPorSlug(slug){
        try {
            let result = await AssuntoSchema.findOne({slug: slug}).populate("apontamentos").populate("temas")
            return result
        } catch (erro) {
            return erro
        }
    }
    
    async encontrarPorNome(nome){
        try {
            let result = await AssuntoSchema.findOne({nome: nome}).populate("apontamentos").populate("temas")
            return result
        } catch (erro) {
            return erro
        }
    }

    async encontrarPorId(id){
        try{
            let result = await AssuntoSchema.findById(id).populate("apontamentos").populate("temas")
            
            return result
        }catch(erro){
            return erro
        }
    }
}