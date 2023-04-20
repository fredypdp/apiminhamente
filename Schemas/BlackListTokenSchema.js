import mongoose from "mongoose";

const BlackListTokenSchema = mongoose.Schema({
    token: {type: String, required: true},
})

export default mongoose.model("BlackListToken", BlackListTokenSchema)