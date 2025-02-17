//importamos las funciones controladoras
import authUserMiddleware from './authUserMiddleware.js';
import authAdminMiddleware from './authAdminMiddleware.js';
import joiValidatorError from './joiValidatorMiddleware.js';

//exportamos las funciones controladoras
export default {
    authUserMiddleware,
    authAdminMiddleware,
    joiValidatorError,
};
