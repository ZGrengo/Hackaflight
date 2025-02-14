import activateUserModel from '../../models/users/activateUserModel.js';

const activateUserController = async (req, res, next) => {
    try {
        // Obtenemos el codigo de registro.
        const { regCode } = req.params;

        //Llamamos la funcion y le damos el codigo de registro.
        await activateUserModel(regCode);

        res.send({
            status: 'ok',
            message: 'Usuario activado.',
        });
    } catch (err) {
        next(err);
    }
};

export default activateUserController;
