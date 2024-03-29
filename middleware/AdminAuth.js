import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

export default async function(req, res, next){
    const authToken = req.headers["authorization"]
    
    if(authToken != undefined){
        const bearer = authToken.split(" ")
        let token = bearer[1]
        const tokenEncontrado = await new Usuario().findBlacklist(token)

        if (tokenEncontrado == null || tokenEncontrado == undefined) {
            jwt.verify(token, process.env.ADMIN_AUTH_SECRET, (erro, decoded) => {
                if (erro) {
                    res.status(401);
                    res.json({erro: "Erro ao acessar rota"});
                } else {
                    if(decoded.usuario.role == 0){
                        next();
                    }else{
                        res.status(403);
                        res.json({erro: "Você não tem permissão para acessar essa rota!"});
                    }
                }
            });
        } else {
            res.status(403);
            res.json({erro: "Erro ao acessar rota, token inválido"});
        }
    }else{
        res.status(403);
        res.json({erro: "Você não está autenticado"});
    }
}