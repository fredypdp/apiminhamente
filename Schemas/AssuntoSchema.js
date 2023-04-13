import mongoose from "mongoose";

const AssuntoSchema = mongoose.Schema({
    nome: {type: String, required: true},
    slug: {type: String, required: true},
    icone: {type: String, required: true},
    apontamentos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Apontamento"
        }
    ]
})

export default mongoose.model("Assunto", AssuntoSchema)