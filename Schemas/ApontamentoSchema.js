import mongoose from "mongoose";

const ApontamentoSchema = mongoose.Schema({
    titulo: {type: String, required: true},
    conteudo: {type: String, required: true},
    miniatura: {type: String, required: true},
    miniatura_public_id: {type: String, required: true},
    visibilidade: {type: mongoose.Schema.Types.Boolean, default: true},
    assuntos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assunto"
        }
    ]
})

export default mongoose.model("Apontamento", ApontamentoSchema)