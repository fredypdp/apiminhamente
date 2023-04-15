import express from "express";
const router = express.Router();
import AssuntoController from "../controllers/AssuntoController.js";
import ApontamentoController from "../controllers/ApontamentoController.js";
import UserController from "../controllers/UserController.js";
import AdminAuth from "../middleware/AdminAuth.js";
import UserAuth from "../middleware/UserAuth.js";

// FileManager
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "../temp/"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname))
    },
})

const upload = multer({storage})

// User
router.get('/usuarios', new UserController().Usuarios) // Todos os usuários

router.get("/usuario/:id", new UserController().UsuarioById) // Usuário pelo id
router.post("/usuario", upload.single("avatar"), new UserController().criar) // Criar usuário
router.put("/usuario", upload.single("avatar"), new UserController().edit) // Editar usuário
router.post("/usuario/:id/:email", new UserController().removeEmail) // Enviar email de deleção de conta
router.delete("/deletarconta", new UserController().remove) // Deletar conta
router.delete("/usuario/:id", new UserController().AdmRemove) // Adm deletando usuário

router.post("/recuperarsenha", new UserController().recoverPassword) // Enviar email de recuperação de senha
router.post("/mudarsenha", new UserController().changePassword) // Mudar senha

router.post("/login", new UserController().login) // Fazer login
router.post("/logout", new UserController().logout) // Terminar sessão

// Assuntos
router.get("/assuntos", new AssuntoController().Assuntos) // Todos os assuntos
router.get("/assunto/:slug", new AssuntoController().AssuntoSlug) // Assunto pelo slug
router.get("/assunto/:id", new AssuntoController().AssuntoById) // Assunto pelo id
router.post("/assunto", new AssuntoController().criar) // Criar assunto
router.put("/assunto", new AssuntoController().editar) // Editar assunto
router.delete("/assunto/:id", new AssuntoController().deletar) // Deletar assunto


// Apontamento
router.get("/apontamentos", new ApontamentoController().Apontamentos) // Todos os apontamentos
router.get("/apontamento/:id", new ApontamentoController().apontamentoById) // Apontamento pelo id
router.post("/apontamento", upload.single("miniatura"), new ApontamentoController().criar) // Criar apontamento
router.put("/apontamento", upload.single("miniatura"), new ApontamentoController().editar) // Editar apontamento
router.delete("/apontamento/:id", new ApontamentoController().deletar) // Deletar apontamento

router.get("/results", new ApontamentoController().pesquisarApontamento) // Pesquisar apontamento

export default router