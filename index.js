import express from "express";
const app = express()
import "dotenv/config";
import bodyParser from "body-parser";
import session from "express-session";
import router from "./routes/routes.js";
import "./database/connection.js";
import cors from "cors";

app.use(cors())
app.use(express.static('.'));
app.use(express.static('temp'))

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
