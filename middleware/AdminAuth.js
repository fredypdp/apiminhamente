const jwt = require("jsonwebtoken");
const secret = "paçoca";
const User = require("../models/User")

module.exports = async function(req, res, next){
    const authToken = req.session.token
    
    if(authToken != undefined){
        const token = authToken
        const tokenValido = await User.findBlacklist(token)

        if (tokenValido == undefined) {
            const decoded = jwt.verify(token,secret);
            
            if(decoded.role == 1){
                req.session.user = decoded
                next();
            }else{
                res.status(403);
                res.redirect("/")
                // res.json({err: "Você não tem permissão para acessar essa rota!"});
                return;
            }
        } else {
            res.status(403);
            res.redirect("/login")
            // res.json({err: "Token invalido"});
            return;
        }
    }else{
        res.status(403);
        res.redirect("/login")
        // res.json({err: "Você não está autenticado"});
        return;
    }
}