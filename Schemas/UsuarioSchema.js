import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    id: {type: String, required: true},
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
    role: {type: Number, default: 1, required: true},
    avatar: {type: String, required: true},
    avatar_public_id: {type: String, required: true},
    created_at: {type: mongoose.Schema.Types.Date, required: true},
    edited_at: {type: mongoose.Schema.Types.Date},
})

export default mongoose.model("Usuario", UsuarioSchema)