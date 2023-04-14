import mongoose from "mongoose";

const TemaSchema = mongoose.Schema({
    titulo: {type: String, required: true},
    slug: {type: String, required: true},
    apontamentos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Apontamento"
        }
    ],
    assuntos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assunto"
        }
    ],
})

export default mongoose.model("Tema", AssuntoSchema)