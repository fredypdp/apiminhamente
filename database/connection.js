const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const uri = `mongodb+srv://fredy:${process.env.DB_SENHA}@cluster1.im5qg0x.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then( () => console.log("Conectado ao servidor"))
.catch( (erro) => console.log(erro))

export default mongoose