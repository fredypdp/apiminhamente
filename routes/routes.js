import express from "express";
const app = express();
const router = express.Router();
import AssuntoController from "../controllers/AssuntoController.js";
import TemaController from "../controllers/TemaController.js";
import ApontamentoController from "../controllers/ApontamentoController.js";
import UsuarioController from "../controllers/UsuarioController.js";
import AdminAuth from "../middleware/AdminAuth.js";
import UsuarioAuth from "../middleware/UsuarioAuth.js";

import path, { dirname } from "path";

// FileManager
import multer from "multer";
app.use(express.static('.'));
app.use(express.static('temp'))

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "temp/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname))
    },
})

const upload = multer({storage})

// Usuario
router.get('/usuarios', AdminAuth, new UsuarioController().Usuarios) // Todos os usuários

router.get("/usuario/:id", UsuarioAuth, new UsuarioController().UsuarioById) // Usuário pelo id
router.get("/usuario/email/:email", UsuarioAuth, new UsuarioController().UsuarioByEmail) // Usuário pelo email
router.post("/usuario", upload.single("avatar"), new UsuarioController().criar) // Criar usuário
router.put("/usuario", UsuarioAuth, upload.single("avatar"), new UsuarioController().editar) // Editar usuário
router.post("/recuperarsenha/:email", UsuarioAuth, new UsuarioController().recuperarSenha) // Enviar email de recuperação de senha
router.post("/mudarsenha/:token", UsuarioAuth, new UsuarioController().mudarSenha) // Mudar senha
router.post("/usuario/:id/:email", UsuarioAuth, new UsuarioController().DeletarMinhaContaEmail) // Enviar email de deleção de conta
router.delete("/deletarconta/:token", UsuarioAuth, new UsuarioController().DeletarMinhaConta) // Deletar minha conta
router.delete("/usuario/:id", AdminAuth, new UsuarioController().AdmDeletarUsuario) // Adm deletar usuário

router.post("/login", new UsuarioController().login) // Fazer login
router.post("/logout", UsuarioAuth, new UsuarioController().logout) // Terminar sessão

// Assuntos
router.get("/assuntos", new AssuntoController().Assuntos) // Todos os assuntos
router.get("/assunto/:id", new AssuntoController().AssuntoById) // Assunto pelo id
router.get("/assunto/slug/:slug", new AssuntoController().AssuntoSlug) // Assunto pelo slug
router.post("/assunto", AdminAuth, new AssuntoController().criar) // Criar assunto
router.put("/assunto", AdminAuth, new AssuntoController().editar) // Editar assunto
router.delete("/assunto/:id", AdminAuth, new AssuntoController().deletar) // Deletar assunto

// Temas
router.get("/temas", new TemaController().Temas) // Todos os temas
router.get("/tema/:id", new TemaController().TemaById) // Tema pelo id
router.get("/tema/slug/:slug", new TemaController().TemaSlug) // Tema pelo slug
router.post("/tema", AdminAuth, new TemaController().criar) // Criar tema
router.put("/tema", AdminAuth, new TemaController().editar) // Editar tema
router.delete("/tema/:id", AdminAuth, new TemaController().deletar) // Deletar tema


// Apontamento
router.get("/apontamentos", new ApontamentoController().Apontamentos) // Todos os apontamentos
router.get("/apontamento/:id", new ApontamentoController().apontamentoById) // Apontamento pelo id
router.get("/results", new ApontamentoController().pesquisarApontamento) // Pesquisar apontamento
router.post("/apontamento", AdminAuth, upload.single("miniatura"), new ApontamentoController().criar) // Criar apontamento
router.put("/apontamento", AdminAuth, upload.single("miniatura"), new ApontamentoController().editar) // Editar apontamento
router.delete("/apontamento/:id", AdminAuth, new ApontamentoController().deletar) // Deletar apontamento

export default router
