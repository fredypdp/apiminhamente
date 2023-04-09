const express = require("express")
const app = express()
require("dotenv").config()
const bodyParser = require("body-parser")
const session = require("express-session")
const router = require("./routes/routes")
require("./database/connection");

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