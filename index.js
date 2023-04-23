import express from "express";
const app = express()
import "dotenv/config";
import bodyParser from "body-parser";
import session from "express-session";
import router from "./routes/routes.js";
import "./database/connection.js";

app.use(session({secret: process.env.SECRET, cookie: {maxAge: 604800000}}))

// BodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/",router);

// Server
const port = process.env.SERVER_PORT || 3000
app.listen(port, () => {
    console.log("Servidor rodando")
})

export default app