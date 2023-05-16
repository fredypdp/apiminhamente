import crypto from "crypto";
import slugify from "slugify";
import FileManager from "./FileManager.js";
import TemaSchema from "../Schemas/TemaSchema.js";
import AssuntoSchema from "../Schemas/AssuntoSchema.js";
import ApontamentoSchema from "../Schemas/ApontamentoSchema.js";

export default class Apontamento {

    async novo(titulo, conteudo, assuntos, temas, visibilidade, miniatura, miniatura_public_id){
        const buffer = crypto.randomBytes(64)
        let idbase64 = buffer.toString('hex')
        let idUsar = idbase64.slice(0, 11)
        
        if(visibilidade == undefined) {
            visibilidade = true
        }
        
        try {
            
            let apontamento = await ApontamentoSchema.create({id: idUsar, titulo: titulo, slug: slugify(titulo), conteudo: conteudo, miniatura: miniatura, miniatura_public_id: miniatura_public_id, visibilidade: visibilidade, assuntos: assuntos, temas: temas, created_at: new Date})
            
            assuntos.forEach( async assunto => {
                let assuntoEncontrado = await AssuntoSchema.findById(assunto)
                assuntoEncontrado.apontamentos.push(apontamento._id)
                assuntoEncontrado.save()
            })
            
            if (temas != undefined || temas.length > 0) {
                temas.forEach( async tema => {
                    let temaEncontrado = await TemaSchema.findById(tema)
                    temaEncontrado.apontamentos.push(apontamento._id)
                    temaEncontrado.save()
                })
            }
            console.log(apontamento);
            return apontamento
        } catch (erro) {
            await new FileManager().deletar(miniatura_public_id)
            return erro
        }
    }
    
    async editar(id, titulo, conteudo, assuntos, temas, visibilidade, miniatura, miniatura_public_id){
        let apontamento = {}

        if (titulo != undefined) {
            apontamento.titulo = titulo
            apontamento.slug = slugify(titulo)
        }
        
        if (conteudo != undefined) {
            apontamento.conteudo = conteudo
        }
        
        if (assuntos != undefined) {
            apontamento.assuntos = assuntos
        }
        
        if (temas != undefined) {
            apontamento.temas = temas
        }
        
        if (visibilidade != undefined) {
            apontamento.visibilidade = visibilidade
        }
        
        if (miniatura != undefined) {
            apontamento.miniatura = miniatura
        }
        
        if (miniatura_public_id != undefined) {
            apontamento.miniatura_public_id = miniatura_public_id
        }

        apontamento.edited_at = new Date
        try {

            // Deletando a miniatura antiga do Cloudinary
            if (miniatura != undefined) {
                let apont = await ApontamentoSchema.findOne({id: id})
                
                await new FileManager().deletar(apont.miniatura_public_id)
            }

            // Removendo o apontamento de todos os assuntos que ele pertence
            if (assuntos != undefined) {
                let assuntos = await AssuntoSchema.find({})

                assuntos.forEach(async assunto => {
                    let apontamentoEncontrado = await ApontamentoSchema.findOne({id: id})
                    let remover = assunto.apontamentos.indexOf(apontamentoEncontrado._id)
                    
                    if (remover != -1) {
                        assunto.apontamentos.splice(remover, 1)
                        assunto.save()
                    }
                })
            }
            
            // Removendo o apontamento de todos os temas que ele pertence
            if (temas != undefined) {
                let temas = await TemaSchema.find({})

                temas.forEach(async tema => {
                    let apontamentoEncontrado = await ApontamentoSchema.findOne({id: id})
                    let remover = tema.apontamentos.indexOf(apontamentoEncontrado._id)
                            
                    if (remover != -1) {
                        tema.apontamentos.splice(remover, 1)
                        tema.save()
                    }
                })
            }

            let ApontamentoEditado = await ApontamentoSchema.findOneAndUpdate({id: id}, apontamento, {new: true})
            
            // Adicionando temas e assuntos
            if (ApontamentoEditado != null) {
                
                // Adicionar apontamento ao assunto
                if (assuntos != undefined && assuntos.length > 0) {
                    assuntos.forEach( async assunto => {
                        let assuntoEncontrado = await AssuntoSchema.findById(assunto)
                        if (assuntoEncontrado != null && assuntoEncontrado != undefined) {
                            let editar = assuntoEncontrado.apontamentos.indexOf(ApontamentoEditado._id)
                            
                            if (editar != -1) {
                                assuntoEncontrado.apontamentos.splice(editar, 1)
                                assuntoEncontrado.apontamentos.push(ApontamentoEditado._id)
                                assuntoEncontrado.save()
                                return
                            }
                            assuntoEncontrado.apontamentos.push(ApontamentoEditado._id)
                            assuntoEncontrado.save()
                        }
                    })
                }

                // Adicionar apontamento ao tema
                if (temas != undefined && temas.length > 0) {
                    temas.forEach( async tema => {
                        let temaEncontrado = await TemaSchema.findById(tema)
                        
                        if (temaEncontrado != null && assuntoEncontrado != undefined) {
                            let editar = temaEncontrado.apontamentos.indexOf(ApontamentoEditado._id)
                            
                            if (editar != -1) {
                                temaEncontrado.apontamentos.splice(editar, 1)
                                temaEncontrado.apontamentos.push(ApontamentoEditado._id)
                                temaEncontrado.save()
                                return
                            }
        
                            temaEncontrado.apontamentos.push(ApontamentoEditado._id)
                            temaEncontrado.save()
                        }
                    })
                }
            }
            
            return ApontamentoEditado
        } catch (erro) {
            await new FileManager().deletar(miniatura_public_id)
            return erro
        }
    }

    async deletar(id){
        let apontamentoEncontrado = await this.encontrarPorId(id);
        
        if (apontamentoEncontrado == undefined) {
            let erro = {status: 406, msg: "O apontamento não existe, portanto não pode ser deletado"}
            return erro
        }

        try{
            let apontamento = await ApontamentoSchema.findOneAndDelete({id: id});
            
            // Deletar a miniatura do apontamento no Cloudinary
            await new FileManager().delete(apontamento.miniatura_public_id)
            
            // Remover o apontamento de todos os assuntos que ele pertence
            apontamento.assuntos.forEach( async assunto => {
                let assuntoEncontrado = await AssuntoSchema.findById(assunto)

                if (assuntoEncontrado != null && assuntoEncontrado != undefined) {
                    let apontamentoRemover = assuntoEncontrado.apontamentos.indexOf(apontamento._id)

                    assuntoEncontrado.apontamentos.splice(apontamentoRemover, 1)
                    assuntoEncontrado.save()
                }
            })

            // Remover o apontamento de todos os temas que ele pertence
            apontamento.temas.forEach( async tema => {
                let temaEncontrado = await TemaSchema.findById(tema)

                if (temaEncontrado != null && temaEncontrado != undefined) {
                    let apontamentoRemover = temaEncontrado.apontamentos.indexOf(apontamento._id)

                    temaEncontrado.apontamentos.splice(apontamentoRemover, 1)
                    temaEncontrado.save()
                }
            })
            
            return apontamento
        }catch(erro){
            return erro
        }
    }

    async apontamentoAll(){
        try{
            let result = await ApontamentoSchema.find({}).populate("assuntos").populate("temas").sort({created_at: -1})
            return result;
        }catch(erro){
            return erro
        }
    }

    async encontrarPorId(id){
        try{
            let apontamento = await ApontamentoSchema.findOne({id: id}).populate("assuntos").populate("temas")

            return apontamento
        }catch(erro){
            return erro
        }
    }

    async pesquisa(pesquisa){
        try {
            let result = await ApontamentoSchema.find({ titulo: { $regex: `${pesquisa}`} }).populate("assuntos").populate("temas").sort({created_at: -1})

            return result
        } catch (erro) {
            return erro
        }
    }
}
