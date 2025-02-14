import updateActiveUserModel from '../../models/users/activateUserModel.js';

const updateActivateUserController = async (req, res, next) => {
    try {
        // Obtenemos el codigo de registro.
        const { active } = req.params;

        //Llamamos la funcion y le damos el codigo de registro.
        await updateActiveUserModel(active);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado.',
        });
    } catch (err) {
        next(err);
    }
};

export default updateActivateUserController;
