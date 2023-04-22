import bcrypt from "bcrypt";
import crypto from "crypto";
import UsuarioSchema from "../Schemas/UsuarioSchema.js";
import BlackListTokenSchema from "../Schemas/BlackListTokenSchema.js";
import SenhaToken from "./SenhaToken.js";
import FileManager from "./FileManager.js";

export default class User {
    async usuarioAll(){
        try{
            let usuario = await UsuarioSchema.find({}).sort({nome: 1})
            return usuario;
        }catch(erro){
            return erro
        }
    }

    async encontrarPorId(id){
        try{
            let usuario = await UsuarioSchema.findOne({id: id})
            return usuario
        }catch(erro){
            return erro;
        }
    }

    async encontrarPorEmail(email){
        try{
            let usuario = await UsuarioSchema.findOne({email: email})
            return usuario
        }catch(erro){
            return erro;
        }
    }

    // CRUD 

    async novo(nome, sobrenome, email, senha, avatar, avatar_public_id){
        const buffer = crypto.randomBytes(64)
        let idbase64 = buffer.toString('hex')
        let idUsar = idbase64.slice(0, 11)

        let emailEncontrado = await this.encontrarPorEmail(email)
        if (emailEncontrado != undefined) {
            let erro = {status: 400, msg: "O email já está cadastrado"}
            return erro
        }

        try {
            let hash = await bcrypt.hash(senha, 10)

            let usuario = await UsuarioSchema.create({id: idUsar, nome: nome, sobrenome: sobrenome, email: email, senha: hash, avatar: avatar, avatar_public_id: avatar_public_id, created_at: new Date})

            return usuario
        } catch (erro) {
            await new FileManager().deletar(avatar_public_id)
            return erro
        }
    }

    async editar(id, nome, sobrenome, email, avatar, avatar_public_id, token){

        let emailEncontrado = await this.encontrarPorId(email)
        if (emailEncontrado != undefined) {
            let erro = {status: 400, msg: "O email já está cadastrado"}
            return erro
        }

        let usuario = {};

        if(nome != undefined){
            usuario.nome = nome;
        }
        
        if(sobrenome != undefined){
            usuario.sobrenome = sobrenome;
        }
        
        if(email != undefined){
            usuario.email = email;
        }

        if(avatar != undefined){
            usuario.avatar = avatar;
        }

        if(avatar_public_id != undefined){
            usuario.avatar_public_id = avatar_public_id;
        }

        usuario.edited_at = new Date()
        try{
            
            // Deletando o avatar antigo do Cloudinary
            if (avatar != undefined) {
                let user = await UsuarioSchema.findOne({id: id})
                await new FileManager().deletar(user.avatar_public_id)
            }

            let UsuarioEditado = await UsuarioSchema.findOneAndUpdate({id: id}, usuario, {new: true})
            
            return UsuarioEditado
        }catch(erro){
            await new FileManager().deletar(avatar_public_id)
            return erro
        }
    }

    async DeletarMinhaConta(id,token){
        let usuarioEncontrado = await this.encontrarPorId(id);
        
        if (usuarioEncontrado == undefined) {
            let erro = {status: 406, msg: "O usuario não existe, portanto não pode ser deletado"}
            return erro
        }

        try{
            let usuario = await UsuarioSchema.findOneAndDelete({id: id});
            
            // Deletar o avatar do usuário no Cloudinary
            await new FileManager().deletar(usuario.avatar_public_id)

            // Definindo o token como usado
            await new SenhaToken().DefinirUsado(token);

            return usuario
        }catch(erro){
            return erro
        }
    }

    async AdmDeletarUsuario(id){

        let usuarioEncontrado = await this.encontrarPorId(id);
        
        if (usuarioEncontrado == undefined) {
            let erro = {status: 406, msg: "O usuario não existe, portanto não pode ser deletado"}
            return erro
        }

        try{
            let usuario = await UsuarioSchema.findOneAndDelete({id: id});
            
            // Deletar o avatar do usuário no Cloudinary
            await new FileManager().deletar(usuario.avatar_public_id)

            return usuario
        }catch(erro){
            return erro
        }
    }

    async blacklistToken(token){
        try {
            let blacklistToken= await BlackListTokenSchema.create({token: token, created_at: new Date})
            
            return blacklistToken
        } catch (erro) {
            return erro
        }
    }

    async findBlacklist(token){
        try {
            let result = await BlackListTokenSchema.findOne({token: token})
            
            return result;
        } catch (erro) {
            return erro
        }
    }

    async mudarSenha(novaSenha, id, token){
        let  hash = await bcrypt.hash(novaSenha, 10);
        
        let usuario = await UsuarioSchema.findOneAndUpdate({id: id}, {senha: hash}, {new: true})
        await new SenhaToken().DefinirUsado(token);

        return usuario
    }
}