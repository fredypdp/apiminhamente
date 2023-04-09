import database from "../database/connection.js";
import slugify from "slugify";
import FileManager from "./fileManager.js";

export default class Apontamento {

    async novo(titulo, conteudo, assuntos, miniatura, miniatura_public_id){
        try {
            const data = new Date()
            const apontamento = await database.insert({titulo: titulo, slug: slugify(titulo), conteudo: conteudo, miniatura: miniatura, miniatura_public_id: miniatura_public_id, criadoEm: data}).into("apontamentos")
            
            if (Array.isArray(assuntos)) {
                assuntos.forEach(assunto => {
                    database.insert({assunto_id: assunto, apontamento_id: apontamento}).into("assuntos_apontamentos").then( data => {
    
                    }).catch( err => {
                        console.log(err);
                    })
                });
            } else {
               await database.insert({assunto_id: assuntos, apontamento_id: apontamento}).into("assuntos_apontamentos").then( data => {
    
                }).catch( err => {
                    console.log(err);
                })
            }
            
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    
    async novoRelacionamento(id, assuntos){
        try {

            if (assuntos.length > 1) {
                assuntos.forEach(assunto => {
                    
                    database.insert({assunto_id: assunto, apontamento_id: id}).into("assuntos_apontamentos").then( data =>{
                        console.log(data);
                    }).catch(erro =>{
                        console.log(erro);
                    })

                });
            } else {
               await database.insert({assunto_id: assuntos[0], apontamento_id: id}).into("assuntos_apontamentos");
            }
            
        } catch (erro) {
            console.log(erro);
            return erro;
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
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "O apontamento não existe, portanto não pode ser deletado."}
        }
    }

    async deletarRelacionamento(id){
        let apontamento = await this.encontrarId(id);

        if(apontamento != undefined){

            try{
                await database.delete().table("assuntos_apontamentos").where({apontamento_id: id})
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "O apontamento não foi encontrado"}
        }
    }

    async apontamentoAll(){
        try{
            let result = await database.select().table("apontamentos").orderBy("criadoEm","desc")
            return result;
        }catch(error){
            console.log(error);
            return [];
        }
    }

    async encontrarId(id){
        try {
            let apontamentos = await database.select().table("apontamentos").where({id: id})
            let apontamento = apontamentos[0]
            return apontamento
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async apontamentoDoAssunto(assunto){
        try {
            let apontamentos = await database.select()
            .table("assuntos_apontamentos")
            .innerJoin("assuntos","assuntos.id","assuntos_apontamentos.assunto_id")
            .innerJoin("apontamentos","apontamentos.id","assuntos_apontamentos.apontamento_id")
            .where("assuntos.slug", assunto)
            .orderBy("criadoEm","desc")

            return apontamentos
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async pesquisa(pesquisa){
        try {
            let result = await database.select().table("apontamentos").orderBy("criadoEm","desc").whereRaw(`titulo like '%${pesquisa}%'`)
            return result;
        } catch (error) {
            console.log(error);
            return []
        }
    }

}