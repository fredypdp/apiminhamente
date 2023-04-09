import knex from "../database/connection.js";
import User from "./User.js";
import { v4 as uuidv4 } from 'uuid';

export default class PasswordToken{
    async create(email){
        let user = await User.findByEmail(email);
        if(user != undefined){
            try{
                let token = uuidv4();
                await knex.insert({user_id: user.id,used: 0,token: token}).table("senhatokens");
                return {status: true,token: token}
            }catch(err){
                console.log(err);
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: "O e-mail passado não existe no banco de dados!"}
        }
    }

    async validate(token){
        try{
            let result = await knex.select().where({token: token}).table("senhatokens");

            if(result.length > 0){

                let tk = result[0];

                if(tk.used == 1){
                    return {status: false};
                }else{
                    return {status: true, token: tk};
                }

            }else{
                return {status: false};
            }
        }catch(err){
            console.log(err);
            return {status: false};
        }
    }

    async setUsed(token){
        await knex.update({used: 1}).where({token: token}).table("senhatokens");
    }
}