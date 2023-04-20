import mongoose from "mongoose";

const DeleteTokensSchema = mongoose.Schema({
    token: {type: String, required: true},
    usuario: {type: String, required: true},
    usado: {type: String, default: false,required: true},
})

export default mongoose.model("DeleteTokens", DeleteTokensSchema)