import insertUserModel from '../../models/users/insertUserModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const registerUserController = async (req, res, next) => {
    try {
        const { firstName, lastname, username, email, password, birthdate } =
            req.body;

        if (
            !firstName ||
            !lastname ||
            !username ||
            !email ||
            !password ||
            !birthdate
        ) {
            generateErrorUtil('Faltan campos.', 400);
        }

        await insertUserModel(
            firstName,
            lastname,
            username,
            email,
            password,
            birthdate,
        );

        res.status(201).send({
            status: 'ok',
            message:
                'Account created successfully. Please activate your account by following the instructions sent to your email.',
        });
    } catch (err) {
        next(err);
    }
};

export default registerUserController;
