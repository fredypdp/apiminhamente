import mongoose from "mongoose";

const BlackListTokenSchema = mongoose.Schema({
    token: {type: String, required: true},
    created_at: {type: mongoose.Schema.Types.Date, required: true},
})

export default mongoose.model("BlackListToken", BlackListTokenSchema)