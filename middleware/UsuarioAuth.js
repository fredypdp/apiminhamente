import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

export default async function(req, res, next){
    const authToken = req.headers["authorization"]
    
    if(authToken != undefined){
        const tk = authToken
        const bearer = tk.split(" ")
        let token = bearer[1]
        const tokenValido = await new Usuario().findBlacklist(token)
        console.log(token)
        if (tokenValido == null || tokenValido == undefined) {
            jwt.verify(token, process.env.ADMIN_AUTH_SECRET, (erro, decoded) => {
                if (erro) {
                    res.status(401);
                    res.json({erro: "Token inválido"});
                } else {
                    next();
                }
            });
        } else {
            res.status(403);
            res.json({erro: "Token invalido"});
        }
    }else{
        res.status(403);
        res.json({erro: "Você não está autenticado"});
    }
}
