import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SERVER_EMAIL,
        pass: process.env.SERVER_EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

const siteEmail = process.env.SITE_EMAIL
const urlSenha = process.env.URL_PAGINA_MUDAR_SENHA
const urlDelete = process.env.URL_PAGINA_DELETAR_CONTA

export default class Email{
    enviarNovaSenhaLink(email, token){
        transporter.sendMail({
            from: `MinhaMente ${siteEmail}`,
            to: email,
            subject: "Mudar senha",
            text: `Mude a sua senha clicando aqui: ${urlSenha}/${token}`,
            html: `Mude a sua senha clicando <a href='${urlSenha}/${token}'>aqui</a>`
        }).then( message => {
            console.log(message);
        }).catch( erro => {
            console.log(erro);
        })
    }

    enviarDelecaoLink(email, token){
        transporter.sendMail({
            from: `MinhaMente ${siteEmail}`,
            to: email,
            subject: "Deletar conta",
            text: `Delete a sua conta clicando aqui: ${urlDelete}/${token}`,
            html: `Delete a sua senha clicando <a href='${urlDelete}/${token}'>aqui</a>`
        }).then( message => {
            console.log(message);
        }).catch( err => {
            console.log(err);
        })
    }
}