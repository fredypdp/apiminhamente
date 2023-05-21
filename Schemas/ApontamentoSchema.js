import mongoose from "mongoose";

const ApontamentoSchema = mongoose.Schema({
    id: {type: String, required: true},
    titulo: {type: String, required: true},
    slug: {type: String, required: true},
    conteudo: {type: String, required: true},
    miniatura: {type: String, required: true},
    miniatura_public_id: {type: String, required: true},
    visibilidade: {type: mongoose.Schema.Types.Boolean, default: true},
    assuntos: [
        {
            required: false,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assunto"
        }
    ],
    temas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tema"
        }
    ],
    created_at: {type: mongoose.Schema.Types.Date, required: true},
    edited_at: {type: mongoose.Schema.Types.Date},
})

export default mongoose.model("Apontamento", ApontamentoSchema)