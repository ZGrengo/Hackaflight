import insertUserModel from '../../models/users/insertUserModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const registerUserController = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, password, birthdate } =
            req.body;

        if (
            !firstName ||
            !lastName ||
            !username ||
            !email ||
            !password ||
            !birthdate
        ) {
            generateErrorUtil('Faltan campos.', 400);
        }

        await insertUserModel(
            firstName,
            lastName,
            username,
            email,
            password,
            birthdate,
        );

        res.status(201).send({
            status: 'ok',
            message:
                'Cuenta registrada con éxito. Por favor sigue las instucciones en tu correo',
        });
    } catch (err) {
        next(err);
    }
};

export default registerUserController;
