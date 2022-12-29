const express = require("express")
const router = express.Router();
const AssuntoController = require("../controllers/AssuntoController")
const ApontamentoController = require("../controllers/ApontamentoController")
const UserController = require("../controllers/UserController")
const AdminAuth = require("../middleware/AdminAuth")
const UserAuth = require("../middleware/UserAuth")

// FileManager
const multer = require("multer")
const path = require("path")

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
router.get('/usuarios', AdminAuth, UserController.Usuarios); // Todos os usuários

router.get("/usuario/:id", UserAuth, UserController.UsuarioById) // Usuário pelo id
router.post("/user", upload.single("avatar"), UserController.criar) // Criado usuário
router.put("/user", UserAuth, upload.single("avatar"), UserController.edit) // Editando usuário
router.post("/user/:id/:email", UserAuth, UserController.removeEmail) // Enviando email de deleção
router.delete("/deletarconta", UserAuth, UserController.remove) // Deletando usuário
router.delete("/user/:id", AdminAuth, UserController.AdmRemove) // Adm deletando usuário

router.post("/login",UserController.login); // Fazendo login
router.post("/logout", UserAuth, UserController.logout); // Terminando sessão


router.post("/recuperarsenha", UserAuth, UserController.recoverPassword); // Enviando email de recuperação de senha
router.post("/mudarsenha", UserAuth, UserController.changePassword); // Mudando senha

router.get("/login", UserController.paginaDeLogin);
router.get('/mudarsenha/:token', UserAuth, UserController.paginaNovaSenha);
router.get('/deletarconta/:token', UserController.paginaDeletarConta);

// Assuntos
router.get("/assunto/:slug", AssuntoController.assuntoPage); // Apontamento pelo slug
router.post("/assunto", AdminAuth, AssuntoController.criar); // Criando assunto
router.put("/assunto", AdminAuth, AssuntoController.editar); // Editando assunto
router.delete("/assunto/:id", AdminAuth, AssuntoController.deletar); // Deletando assunto

router.get("/assunto/:id", AssuntoController.AssuntoById);
router.get("/assuntos", AssuntoController.Assuntos);

// Apontamento
router.post("/apontamento", AdminAuth, upload.single("miniatura"), ApontamentoController.criar); // Criando apontamento
router.put("/apontamento", AdminAuth, upload.single("miniatura"), ApontamentoController.editar); // Editando apontamento
router.delete("/apontamento/:id", AdminAuth, ApontamentoController.deletar); // Deletando apontamento

router.get("/apontamentos", ApontamentoController.Apontamentos); // Todos os apontamentos
router.get("/apontamento/:id", ApontamentoController.apontamentoById); // Apontamento pelo id
router.get("/results", ApontamentoController.pesquisarApontamento); // Pesquisar apontamento

module.exports = router;