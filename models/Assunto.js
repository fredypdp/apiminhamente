import database from "../database/connection.js";
import slugify from "slugify";

export class Assunto {

    async novo(nome, icone){
        let assunto = await this.encontrarPorNome(nome)
        
        if (assunto != undefined) {
            let erro = {status: 400, erro: "O nome já está cadastrado"}
            console.log(erro);
            return erro
        }

        try {
            await database.insert({nome: nome, icone: icone, slug: slugify(nome)}).into("assuntos")
        } catch (erro) {
            console.log(erro);
            return {status: false, erro: erro}
        }
    }

    async editar(id, nome, icone){
        let assunto = await this.encontrarPorNome(nome)
        
        if (assunto != undefined) {
            let erro = {status: 400, erro: "O nome já está cadastrado"}
            console.log(erro);
            return erro
        }

        try {
            await database.where({id: id}).update({nome: nome, icone: icone, slug: slugify(nome)}).table("assuntos")
        } catch (erro) {
            console.log(erro);
            return {status: false, erro: erro}
        }
    }

    async deletar(id){
        let assunto = await this.encontrarPorId(id);
        
        if(assunto != undefined){
            try{
                await database.delete().table("assuntos").where({id: id})
                return {status: true}
            }catch(erro){
                return {status: false,erro: erro}
            }
        }else{
            return {status: false,erro: "O assunto não existe, portanto não pode ser deletado."}
        }
    }

    async assuntoAll(){
        try{
            let result = await database.select().table("assuntos").orderBy("nome","asc")
            return result;
        }catch(erro){
            console.log(erro);
            return [];
        }
    }

    async encontrarPorNome(nome){
        try {
            let result = await database.select().table("assuntos").where({nome: nome})
            return result[0]
        } catch (erro) {
            console.log(erro);
            return []
        }
    }

    async encontrarPorId(id){
        try{

            let result = await database.select().where({id: id}).table("assuntos");
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(erro){
            console.log(erro);
            return undefined;
        }
    }

}