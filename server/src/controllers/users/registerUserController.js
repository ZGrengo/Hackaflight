import insertUserModel from '../../models/users/insertUserModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const registerUserController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            generateErrorUtil('Missing fields.', 400);
        }

        await insertUserModel(username, email, password);

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
