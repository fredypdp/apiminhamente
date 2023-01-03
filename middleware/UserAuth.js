const jwt = require("jsonwebtoken");
const secret = "paçoca";
const User = require("../models/User")

module.exports = async function(req, res, next){
    const authToken = req.headers["authorization"]
    
    if(authToken != undefined){
        const tk = authToken
        const tokenValido = await User.findBlacklist(tk)
        const bearer = tk.split(" ")
        let token = bearer[1]

        if (tokenValido == undefined) {
            jwt.verify(token,secret, (err, decoded) => {
                if (err) {
                    res.status(401);
                    res.json({err: "Token inválido"});
                } else {                    
                    res.status(200);
                    res.send("Permissão para acessar a rota");
                    next();
                }
            });
        } else {
            res.status(403);
            res.json({err: "Token invalido"});
        }
    }else{
        res.status(403);
        res.json({err: "Você não está autenticado"});
    }
}