import express from "express";
const router = express.Router();
import AssuntoController from "../controllers/AssuntoController.js";
import ApontamentoController from "../controllers/ApontamentoController.js";
import UserController from "../controllers/UserController.js";
import AdminAuth from "../middleware/AdminAuth.js";
import UserAuth from "../middleware/UserAuth.js";

// FileManager
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "../temp/"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname))
    },
})

const upload = multer({storage})

// User
router.get('/usuarios', AdminAuth, function () { UserController.Usuarios } ) // Todos os usuários

router.get("/usuario/:id", UserAuth, function () { UserController.UsuarioById }) // Usuário pelo id
router.post("/user", upload.single("avatar"), function () { UserController.criar }) // Criado usuário
router.put("/user", UserAuth, upload.single("avatar"), function () { UserController.edit }) // Editando usuário
router.post("/user/:id/:email", UserAuth, function () { UserController.removeEmail }) // Enviando email de deleção
router.delete("/deletarconta", UserAuth, function () { UserController.remove }) // Deletando usuário
router.delete("/user/:id", AdminAuth, function () { UserController.AdmRemove }) // Adm deletando usuário

router.post("/login",function () { UserController.login }); // Fazendo login
router.post("/logout", UserAuth, function () { UserController.logout }) // Terminando sessão


router.post("/recuperarsenha", UserAuth, function () { UserController.recoverPassword }) // Enviando email de recuperação de senha
router.post("/mudarsenha", UserAuth, function () { UserController.changePassword }) // Mudando senha

router.get("/login", function () { UserController.paginaDeLogin })
router.get('/mudarsenha/:token', UserAuth, function () { UserController.paginaNovaSenha })
router.get('/deletarconta/:token', function () { UserController.paginaDeletarConta })

// Assuntos
router.get("/assunto/:slug", function () { AssuntoController.assuntoPage }) // Apontamento pelo slug
router.post("/assunto", AdminAuth, function () { AssuntoController.criar }) // Criando assunto
router.put("/assunto", AdminAuth, function () { AssuntoController.editar }) // Editando assunto
router.delete("/assunto/:id", AdminAuth, function () { AssuntoController.deletar }) // Deletando assunto

router.get("/assunto/:id", function () { AssuntoController.AssuntoById })
router.get("/assuntos", function () { AssuntoController.Assuntos })

// Apontamento
router.post("/apontamento", AdminAuth, upload.single("miniatura"), function () { ApontamentoController.criar }) // Criando apontamento
router.put("/apontamento", AdminAuth, upload.single("miniatura"), function () { ApontamentoController.editar }) // Editando apontamento
router.delete("/apontamento/:id", AdminAuth, function () { ApontamentoController.deletar }) // Deletando apontamento

router.get("/apontamentos", function () { ApontamentoController.Apontamentos }) // Todos os apontamentos
router.get("/apontamento/:id", function () { ApontamentoController.apontamentoById }) // Apontamento pelo id
router.get("/results", function () { ApontamentoController.pesquisarApontamento }) // Pesquisar apontamento

export default router