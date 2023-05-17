import { v2 as cloudinary } from 'cloudinary'

export default class Image {

    async upload(imagem){
        try {
           let result = await cloudinary.uploader.upload(imagem, { folder: process.env.CLOUDINARY_FOLDER })
           return result
        } catch (erro) {
            console.log(erro);
            return erro
        }
    }

    async deletar(imagem){
        try {
            console.log(imagem);
            let result = await cloudinary.uploader.destroy(imagem)
            console.log(result);
            return result
        } catch (erro) {
            console.log(erro);
            return erro
        }
    }
}
