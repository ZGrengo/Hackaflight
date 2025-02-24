//importamos dependencias para el envio de emails
import nodemailer from 'nodemailer';

//importamos la función que lanza un error
import generateErrorUtil from './generateErrorUtil.js';

//obtenemos las variables de entorno
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

//Creamos un transporte (una conexión) para poder enviar un email
const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});
//Función que envía un email
const sendEmailUtil = async (email, subject, body) => {
    try {
        //Enviamos el email
        await transport.sendMail({
            from: SMTP_USER,
            to: email,
            subject,
            text: body,
        });
    } catch (err) {
        console.error(err);
        throw generateErrorUtil('Error al enviar el email', 500);
    }
};

//exportamos la función
export default sendEmailUtil;
