//importamos las funciones controladoras
import registerUserController from './registerUserController.js';
import loginUserController from './loginUserController.js';
import privateUserProfileController from './privateUserProfileController.js';
import deleteUserController from './deleteUserController.js';
import saveUserFavoriteController from './saveUserFavoriteController.js';
import userFavoriteController from './userFavoriteController.js';
import userFavoriteDetailsController from './userFavoriteDetailsController.js';
import deleteUserFavoriteController from './deleteUserFavoriteController.js';
import updateUserPassController from './updateUserPassController.js';
import activateUserController from './activateUserController.js';

//exportamos las funciones controladoras
export {
    registerUserController,
    loginUserController,
    privateUserProfileController,
    deleteUserController,
    userFavoriteController,
    deleteUserFavoriteController,
    userFavoriteDetailsController,
    saveUserFavoriteController,
    updateUserPassController,
    activateUserController,
};
