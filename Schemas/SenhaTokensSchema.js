import mongoose from "mongoose";

const SenhaTokensSchema = mongoose.Schema({
    token: {type: String, required: true},
    usuario: {type: String, required: true},
    usado: {type: mongoose.Schema.Types.Boolean, default: false, required: true},
})

export default mongoose.model("SenhaTokens", SenhaTokensSchema)