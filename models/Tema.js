import TemaSchema from "../Schemas/TemaSchema.js";
import AssuntoSchema from "../Schemas/AssuntoSchema.js";
import ApontamentoSchema from "../Schemas/ApontamentoSchema.js";
import slugify from "slugify";

export default class Tema {

    async novo(titulo, assunto){
        let assuntoEncontrado = await AssuntoSchema.findById(assunto).populate("temas")
        let temaEncontrado = assuntoEncontrado.temas.some(tema => tema.titulo.toLowerCase() == titulo.toLowerCase())
        
        if (temaEncontrado == true) {
            let erro = {status: 400, msg: "O titulo já está cadastrado"}
            return erro
        }

        try {
            let tema = await TemaSchema.create({titulo: titulo.trim(), slug: slugify(titulo.trim()), assunto: assunto, created_at: new Date})
            
            let assuntoEncontrado = await AssuntoSchema.findById(tema.assunto)

            if (assuntoEncontrado != null && assuntoEncontrado != undefined) {
                let editar = assuntoEncontrado.temas.indexOf(tema._id)
                
                if (editar != -1) {
                    assuntoEncontrado.temas.splice(editar, 1)
                    assuntoEncontrado.temas.push(ApontamentoEditado._id)
                    assuntoEncontrado.save()
                    return
                }
                assuntoEncontrado.temas.push(tema._id)
                assuntoEncontrado.save()
            }

            return tema
        } catch (erro) {
            return erro
        }
    }

    async editar(id, novoTitulo){
        let temaEditar = {}

        let temaEncontrado = await TemaSchema.findById(id)
        let assuntoEncontrado = await AssuntoSchema.findById(temaEncontrado.assunto).populate("temas")
        let tituloExiste = assuntoEncontrado.temas.some(n => n.titulo.toLowerCase() == novoTitulo.toLowerCase())
        
        if (tituloExiste == true) {
            let erro = {status: 400, msg: "O titulo já está cadastrado"}
            return erro
        }

        temaEditar.titulo = novoTitulo.trim()
        temaEditar.slug = slugify(novoTitulo.trim())

        temaEditar.edited_at = new Date

        try {
            let tema = await TemaSchema.findByIdAndUpdate(id, temaEditar, {new: true})
            return tema           
        } catch (erro) {
            return erro
        }
    }

    async deletar(id){
        let temaEncontrado = await this.encontrarPorId(id);
        
        if (temaEncontrado == undefined) {
            let erro = {status: 406, msg: "O tema não existe, portanto não pode ser deletado"}
            return erro
        }

        try{
           let tema = await TemaSchema.findByIdAndDelete(id)

            // Remover o tema de todos os assuntos que ele pertence
            tema.assuntos.forEach( async assunto => {
                let assuntoEncontrado = await AssuntoSchema.findById(assunto)

                if (assuntoEncontrado != null && assuntoEncontrado != undefined) {
                    let temaRemover = assuntoEncontrado.temas.indexOf(tema._id)

                    assuntoEncontrado.temas.splice(temaRemover, 1)
                    assuntoEncontrado.save()
                }
            })

            // Remover o tema de todos os apontamentos que ele pertence
            tema.apontamentos.forEach( async apontamento => {
                let apontamentoEncontrado = await ApontamentoSchema.findById(apontamento)

                if (apontamentoEncontrado != null && apontamentoEncontrado != undefined) {
                    let temaRemover = apontamentoEncontrado.temas.indexOf(tema._id)

                    apontamentoEncontrado.temas.splice(temaRemover, 1)
                    apontamentoEncontrado.save()
                }
            })
            
           return tema
        }catch(erro){
            return erro
        }
    }

    async temaAll(){
        try{
            let result = await TemaSchema.find({}).populate("apontamentos").sort({titulo: 1})
            return result
        }catch(erro){
            return erro
        }
    }

    async encontrarPorSlug(slug){
        try {
            let result = await TemaSchema.findOne({slug: slug}).populate("apontamentos")
            return result
        } catch (erro) {
            return erro
        }
    }
    
    async encontrarPorTitulo(titulo){
        try {
            let result = await TemaSchema.findOne({titulo: { $regex: `${titulo}`, $options: 'i'}}).populate("apontamentos")
            return result
        } catch (erro) {
            return erro
        }
    }

    async encontrarPorId(id){
        try{
            let result = await TemaSchema.findById(id).populate("apontamentos")
            return result
        }catch(erro){
            return erro
        }
    }
}