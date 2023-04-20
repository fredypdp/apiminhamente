import DeleteTokensSchema from "../Schemas/DeleteTokensSchema.js";
import Usuario from "../models/Usuario.js";
import { v4 as uuidv4 } from 'uuid';

export default class DelecaoToken{
    async criar(email){
        let usuario = await new Usuario().encontrarPorEmail(email);

        if(usuario != undefined){
            try{
                let token = uuidv4();
                await DeleteTokensSchema.create({usuario: usuario.id, usado: false, token: token})

                return {status: true,token: token}
            }catch(erro){
                return {status: false, erro: erro}
            }
        }else{
            return {status: false, erro: "Nenhum usuário com esse email foi encontrado!"}
        }
    }

    async validar(token){
        try{
            let result = await DeleteTokensSchema.findOne({token: token})

            if(result != null && result != undefined){
                if(result.usado == true){
                    return {status: false};
                }else{
                    return {status: true, token: result};
                }
            }else{
                return {status: false};
            }
        }catch(erro){
            return erro
        }
    }

    async DefinirUsado(token){
       let tokenEditado = await DeleteTokensSchema.findOneAndUpdate({token: token}, {usado: true} , {new: true})
       return tokenEditado
    }
}