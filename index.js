import express from "express";
const app = express()
import "dotenv/config";
import bodyParser from "body-parser";
import session from "express-session";
import router from "./routes/routes.js";
import "./database/connection.js";

// View engine
app.set("view engine", "ejs")

app.use(session({secret: process.env.SECRET, cookie: {maxAge: 604800000}}))
// Static
app.use(express.static("public"))

// BodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/",router);

// Server
const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log("Servidor rodando")
})