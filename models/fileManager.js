import { v2 as cloudinary } from 'cloudinary'

export default class Image {

    async upload(imagem){
        try {
           let result = await cloudinary.uploader.upload(imagem, { folder: process.env.CLOUDINARY_FOLDER })
           return result
        } catch (error) {
            console.log(error);
        }
    }

    async delete(imagem){
        try {
           let result = await cloudinary.uploader.destroy(imagem)
           return result
        } catch (error) {
            console.log(error);
        }
    }
}