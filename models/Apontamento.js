import slugify from "slugify";
import FileManager from "./FileManager.js";
import TemaSchema from "../Schemas/TemaSchema.js";
import AssuntoSchema from "../Schemas/AssuntoSchema.js";
import ApontamentoSchema from "../Schemas/ApontamentoSchema.js";

export default class Apontamento {

    async novo(titulo, conteudo, assuntos, temas, visibilidade, miniatura, miniatura_public_id){
        let buff = Buffer.from(titulo)
        let idbase64 = buff.toString("base64")
        let idUsar = idbase64.slice(0, 11)
        
        try {
            let ApontamentoCriado = await ApontamentoSchema.create({id: idUsar, titulo: titulo, slug: slugify(titulo), conteudo: conteudo, miniatura: miniatura, miniatura_public_id: miniatura_public_id, visibilidade: visibilidade, assuntos: assuntos, temas: temas, created_at: new Date})
            assuntos.forEach( async assunto => {
                let assuntoEncontrado = await AssuntoSchema.findById(assunto)
                assuntoEncontrado.apontamentos.push(ApontamentoCriado._id)
                assuntoEncontrado.save()
            })
            
            console.log(assuntoCriado)
            return assuntoCriado
        } catch (erro) {
            return erro
            await FileManager.delete(apontamento.miniatura_public_id)
        }
    }

    async editar(id, titulo, conteudo, assuntos, miniatura, miniatura_public_id){
        try {
            const data = new Date()
            await database.update({titulo: titulo, slug: slugify(titulo), conteudo: conteudo, miniatura: miniatura, miniatura_public_id: miniatura_public_id, editadoEm: data}).where({id: id}).table("apontamentos")
            
            await this.deletarRelacionamento(id)
            await this.novoRelacionamento(id, assuntos)
        } catch (erro) {
            console.log(erro);
            return erro;
        }
    }

    async deletar(id){
        let apontamento = await this.encontrarId(id);

        if(apontamento != undefined){

            try{
                await database.delete().table("apontamentos").where({id: id})
                await FileManager.delete(apontamento.miniatura_public_id)
            }catch(erro){
                return erro
            }
        
        }else{
            return {status: false,err: "O apontamento não existe, portanto não pode ser deletado."}
        }
    }

    async apontamentoAll(){
        try{
            let result = await ApontamentoSchema.find({}).sort({titulo: 1 })
            return result;
        }catch(erro){
            return erro
        }
    }

    async encontrarPorId(id){
        try{
            let apontamento = await ApontamentoSchema.findById(id)
            return apontamento
        }catch(erro){
            return erro
        }
    }

    async pesquisa(pesquisa){
        try {
            let result = await ApontamentoSchema.find({ titulo: { $regex: `/${pesquisa}/`} })
            return result
        } catch (erro) {
            return erro
        }
    }
}