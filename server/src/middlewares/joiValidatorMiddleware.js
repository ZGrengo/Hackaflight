import generateErrorUtil from '../utils/generateErrorUtil.js';
import validateSearch from '../validators/apiValidation.js';

const joiValidatorError = (req, res, next) => {
    const { origin, destination, departureDate, returnDate, adults } =
        req.query;
    const { error } = validateSearch.validate({
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate,
        returnDate,
        adults,
    });

    if (error) {
        const errorMessage = error.details
            .map((detail) => detail.message)
            .join(', ');
        return next(
            generateErrorUtil(`Error de validación: ${errorMessage}`, 400),
            // return next(
            //     generateErrorUtil('Imposible acceder al servidor amadeus', 500),
        );
    }
    next();
};

export default joiValidatorError;
