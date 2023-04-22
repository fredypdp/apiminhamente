import mongoose from "mongoose";

const DeleteTokensSchema = mongoose.Schema({
    token: {type: String, required: true},
    usuario: {type: String, required: true},
    usado: {type: String, default: false,required: true},
    created_at: {type: mongoose.Schema.Types.Date, required: true},
    edited_at: {type: mongoose.Schema.Types.Date},
})

export default mongoose.model("DeleteTokens", DeleteTokensSchema)