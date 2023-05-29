import slugify from "slugify";
import FileManager from "./FileManager.js";
import TemaSchema from "../Schemas/TemaSchema.js";
import AssuntoSchema from "../Schemas/AssuntoSchema.js";
import ApontamentoSchema from "../Schemas/ApontamentoSchema.js";

export default class Assunto {
    
    async novo(nome, icone, icone_public_id){
        let assuntoEncontrado = await this.encontrarPorNome(nome)
        
        if (assuntoEncontrado != undefined) {
            let erro = {status: 400, msg: "O nome já está cadastrado"}
            return erro
        }

        try {
            let assunto = await AssuntoSchema.create({nome: nome.trim(), slug: slugify(nome.trim()), icone: icone, icone_public_id: icone_public_id, created_at: new Date})
            return assunto
        } catch (erro) {
            await new FileManager().deletar(icone_public_id)
            return erro
        }
    }

    async editar(id, nome, icone, icone_public_id){
        let assuntoEditar = {}

        let assuntoEncontrado = await this.encontrarPorNome(nome)
        
        if (assuntoEncontrado != undefined) {
            let erro = {status: 400, msg: "O nome já está cadastrado"}
            return erro
        }

        if (nome != undefined) {
            assuntoEditar.nome = nome.trim()
            assuntoEditar.slug = slugify(nome.trim())
        }
        
        if (icone != undefined) {
            assuntoEditar.icone = icone
        }
        
        if (icone_public_id != undefined) {
            assuntoEditar.icone_public_id = icone_public_id
        }

        assuntoEditar.edited_at = new Date()

        try {
            // Deletando o icone antigo do Cloudinary
            if (icone != undefined) {
                let assunto = await AssuntoSchema.findById(id)
                
                await new FileManager().deletar(assunto.icone_public_id)
            }

            let assunto = await AssuntoSchema.findByIdAndUpdate(id, assuntoEditar, {new: true})
            return assunto           
        } catch (erro) {
            await new FileManager().deletar(icone_public_id)
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

           // Deletar a miniatura do apontamento no Cloudinary
           await new FileManager().deletar(assunto.icone_public_id)
           
            // Remover o assunto de todos os apontamentos que ele pertence
            assunto.apontamentos.forEach( async apontamento => {
                let apontamentoEncontrado = await ApontamentoSchema.findById(apontamento)
                
                if (apontamentoEncontrado != null && apontamentoEncontrado != undefined) {
                    let assuntoRemover = apontamentoEncontrado.assuntos.indexOf(assunto._id)
                
                    apontamentoEncontrado.assuntos.splice(assuntoRemover, 1)
                    apontamentoEncontrado.save()
                }
            })
            
            // Deletando todos os temas que fazem parte do assunto e removendo-o dos apontamentos
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
            let result = await AssuntoSchema.find({}).populate("apontamentos").populate("temas").sort({nome: 1})
            return result
        }catch(erro){
            return erro
        }
    }

    async encontrarPorNome(nome){
        try {
            let result = await AssuntoSchema.findOne({nome: { $regex: `${nome}`, $options: 'i'}}).populate("apontamentos").populate("temas")
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

    async encontrarPorId(id){
        try{
            let result = await AssuntoSchema.findById(id).populate("apontamentos").populate("temas")
            
            return result
        }catch(erro){
            return erro
        }
    }
}