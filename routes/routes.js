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
router.get('/usuarios', AdminAuth, async (req, res) => await UserController.Usuarios(req, res)) // Todos os usuários

router.get("/usuario/:id", UserAuth, async (req, res) => await UserController.UsuarioById(req, res)) // Usuário pelo id
router.post("/user", upload.single("avatar"), async (req, res) => await UserController.criar(req, res)) // Criado usuário
router.put("/user", UserAuth, upload.single("avatar"), async (req, res) => await UserController.edit(req, res)) // Editando usuário
router.post("/user/:id/:email", UserAuth, async (req, res) => await UserController.removeEmail(req, res)) // Enviando email de deleção
router.delete("/deletarconta", UserAuth, async (req, res) => await UserController.remove(req, res)) // Deletando usuário
router.delete("/user/:id", AdminAuth, async (req, res) => await UserController.AdmRemove(req, res)) // Adm deletando usuário

router.post("/login",async (req, res) => await UserController.login(req, res)) // Fazendo login
router.post("/logout", UserAuth, async (req, res) => await UserController.logout(req, res)) // Terminando sessão


router.post("/recuperarsenha", UserAuth, async (req, res) => await UserController.recoverPassword(req, res)) // Enviando email de recuperação de senha
router.post("/mudarsenha", UserAuth, async (req, res) => await UserController.changePassword(req, res)) // Mudando senha

router.get("/login", async (req, res) => await UserController.paginaDeLogin(req, res))
router.get('/mudarsenha/:token', UserAuth, async (req, res) => await UserController.paginaNovaSenha(req, res))
router.get('/deletarconta/:token', async (req, res) => await UserController.paginaDeletarConta(req, res))

// Assuntos
router.get("/assunto/:slug", async (req, res) => await AssuntoController.assuntoPage(req, res)) // Apontamento pelo slug
router.post("/assunto", AdminAuth, async (req, res) => await AssuntoController.criar(req, res)) // Criando assunto
router.put("/assunto", AdminAuth, async (req, res) => await AssuntoController.editar(req, res)) // Editando assunto
router.delete("/assunto/:id", AdminAuth, async (req, res) => await AssuntoController.deletar(req, res)) // Deletando assunto

router.get("/assunto/:id", async (req, res) => await AssuntoController.AssuntoById(req, res))
router.get("/assuntos", async (req, res) => await AssuntoController.Assuntos(req, res))

// Apontamento
router.post("/apontamento", AdminAuth, upload.single("miniatura"), async (req, res) => await ApontamentoController.criar(req, res)) // Criando apontamento
router.put("/apontamento", AdminAuth, upload.single("miniatura"), async (req, res) => await ApontamentoController.editar(req, res)) // Editando apontamento
router.delete("/apontamento/:id", AdminAuth, async (req, res) => await ApontamentoController.deletar(req, res)) // Deletando apontamento

router.get("/apontamentos", async (req, res) => await ApontamentoController.Apontamentos(req, res)) // Todos os apontamentos
router.get("/apontamento/:id", async (req, res) => await ApontamentoController.apontamentoById(req, res)) // Apontamento pelo id
router.get("/results", async (req, res) => await ApontamentoController.pesquisarApontamento(req, res)) // Pesquisar apontamento

export default router