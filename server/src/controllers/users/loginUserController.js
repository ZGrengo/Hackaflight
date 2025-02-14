import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            generateErrorUtil('Faltan campos.', 400);
        }

        const user = await selectUserByEmailModel(email);
        let isPassValid;

        if (user) {
            isPassValid = await bcrypt.compare(password, user.password);
        }

        if (!user || !isPassValid) {
            generateErrorUtil('Credenciales no válidas.', 403);
        }

        if (!user.active) {
            generateErrorUtil('Cuenta en espera de validacion.', 403);
        }

        const tokenInfo = {
            id: user.userId,
            role: user.role,
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default loginUserController;
