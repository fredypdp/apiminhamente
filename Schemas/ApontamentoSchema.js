import mongoose from "mongoose";

const ApontamentoSchema = mongoose.Schema({
    titulo: {type: String, required: true},
    slug: {type: String, required: true},
    conteudo: {type: String, required: true},
    miniatura: {type: String, required: true},
    miniatura_public_id: {type: String, required: true},
    visibilidade: {type: mongoose.Schema.Types.Boolean, default: true},
    assuntos: [
        {
            required: true,
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
})

export default mongoose.model("Apontamento", ApontamentoSchema)