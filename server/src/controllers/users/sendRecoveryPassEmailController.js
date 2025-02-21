import crypto from 'crypto';
import insertRecoverPassCodeModel from '../../models/users/insertRecoverPassCodeModel.js';
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import sendEmailUtil from '../../utils/sendEmailUtil.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const sendRecoveryPassEmailController = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw generateErrorUtil('Faltan campos.', 400);
        }

        const user = await selectUserByEmailModel(email);

        if (user) {
            const recoverPassCode = crypto.randomBytes(15).toString('hex');

            await insertRecoverPassCodeModel(recoverPassCode, email);
            const emailSubject = 'Hack a Flight recuperación de contraseña :)';

            const emailBody = `
              Ha habido un cambio de contraseña para la cuenta vinculada a este correo electrónico. Si no fuiste tú, ignora este mensaje.
              
              Por favor haga clic en el siguiente enlace para restablecer su contraseña:
                
             ${process.env.CLIENT_URL}/users/password/${recoverPassCode}

            `;
            await sendEmailUtil(email, emailSubject, emailBody);
        }

        res.send({
            status: 'ok',
            message:
                'Si existe una cuenta con ese correo electrónico, se ha enviado un enlace de recuperación de contraseña. Por favor revise su correo electrónico para obtener más instrucciones.',
        });
    } catch (err) {
        next(err);
    }
};

export default sendRecoveryPassEmailController;
