import mongoose from "mongoose";

const TemaSchema = mongoose.Schema({
    titulo: {type: String, required: true},
    slug: {type: String, required: true},
    assunto:
        {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assunto"
        }
    ,
    apontamentos: [
        {
            type: String,
            ref: "Apontamento"
        }
    ],
})

export default mongoose.model("Tema", TemaSchema)