//Función que gestiona un error
const generateErrorUtil = (msg, code) => {
    const err = new Error(msg);
    err.httpStatus = code;
    throw /*return*/ err;
};

export default generateErrorUtil;
