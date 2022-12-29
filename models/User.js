const bcrypt = require("bcrypt")
const knex = require("../database/connection")
const PasswordToken = require("./PassWordToken");
const FileManager = require("./fileManager");

class User {

    async findEmail(email){
        try {
            
            let result = await knex.select("*").from("users").where({email: email})

            if (result.length > 0) {
                return true
            } else {
                return false
            }

        } catch (erro) {
            console.log(erro);
        }
    }

    async findAll(){
        try{
            let result = await knex.select(["id", "nome","email","role"]).orderBy("nome","asc").table("users");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{

            let result = await knex.select().where({id: id}).table("users");
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async findByEmail(email){
        try{

            let result = await knex.select(["id", "avatar", "nome","email","senha","role"]).where({email: email}).table("users");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async novo(avatar, avatar_public_id, nome, email, senha){
        try {
            let hash = await bcrypt.hash(senha, 10)
            await knex.insert({avatar: avatar, avatar_public_id: avatar_public_id, nome: nome, email: email, senha: hash, role: 0}).into("users")
        } catch (erro) {
            console.log(erro);
        }
    }

    async update(id, avatar, avatar_public_id, nome, email){

        var user = await this.findById(id);

        if(user != undefined){

            let editUser = {};

            // Saber se o email já tá cadastrado
            if(email != undefined){ 
                if(email != user.email){

                   let result = await this.findEmail(email);

                   if(result == false){

                        editUser.email = email;

                   }else{
                        return {status: false,err: "O e-mail já está cadastrado"}
                   }
                }
            }

            if(nome != undefined){

                editUser.nome = nome;

            }

            if(avatar != undefined){
                editUser.avatar = avatar;
            }

            if(avatar_public_id != undefined){
                editUser.avatar_public_id = avatar_public_id;
            }

            try{
                await knex.update(editUser).where({id: id}).table("users");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "O usuário não existe!"}
        }
    }

    async delete(id){

        let user = await this.findById(id);

        if(user != undefined){

            try{
                await knex.delete().where({id: id}).table("users");
                await await FileManager.delete(user.avatar_public_id)
                // return {status: true}
            }catch(err){
                console.log(err);
                // return {status: false,err: err}
            }
        }else{
            return {status: false,err: "O usuário não existe, portanto não pode ser deletado."}
        }
    }

    async MyDelete(id,token){

        let user = await this.findById(id);

        if(user != undefined){

            try{
                await knex.delete().where({id: id}).table("users");
                await await FileManager.delete(user.avatar_public_id)
                await PasswordToken.setUsed(token);
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "O usuário não existe, portanto não pode ser deletado."}
        }
    }

    async blacklistToken(token){
        
        try {
            
            await knex.insert({token: token}).into("blacklisttoken")
        
        } catch (error) {
            console.log(error);
        }

    }

    async findBlacklist(token){
        try {
            let result = await knex.select().where({token: token}).table("blacklisttoken");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async changePassword(novaSenha,id,token){
        let  hash = await bcrypt.hash(novaSenha, 10);
        await knex.update({senha: hash}).where({id: id}).table("users");
        await PasswordToken.setUsed(token);
    }
}

module.exports = new User()