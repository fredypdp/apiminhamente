import mongoose from "mongoose";
mongoose.Promise = global.Promise

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_SENHA}@cluster1.im5qg0x.mongodb.net/minhamente?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then( () => console.log("Conectado ao banco de dados"))
.catch( (erro) => console.log(erro))

export default mongoose