const cloudinary = require("cloudinary").v2;

class Image {

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

module.exports = new Image()