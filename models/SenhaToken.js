import SenhaTokensSchema from "../Schemas/SenhaTokensSchema.js";
import Usuario from "./Usuario.js";
import { v4 as uuidv4 } from 'uuid';

export default class PasswordToken{
    async criar(email){
        let usuario = await new Usuario().encontrarPorEmail(email);
        if(usuario != null && usuario != undefined){
            try{
                let token = uuidv4();
                
                await SenhaTokensSchema.create({usuario: usuario.id, usado: false, token: token, created_at: new Date})
                return {status: true, token: token}
            }catch(erro){
                return {status: false, erro: erro}
            }
        }else{
            return {status: false, erro: "Nenhum usuário com esse email foi encontrado!"}
        }
    }

    async validar(token){
        try{
            let result = await SenhaTokensSchema.findOne({token: token})

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
        let tokenEditado = await SenhaTokensSchema.findOneAndUpdate({token: token}, {usado: true, edited_at: new Date} , {new: true})
        return tokenEditado
    }
}