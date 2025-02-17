import generateErrorUtil from '../utils/generateErrorUtil.js';
import validateSearch from '../validators/apiValidation.js';

const joiValidatorError = (req, next) => {
    const { origin, destination, departureDate, adults } = req.query;
    const { error } = validateSearch.validate({
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate,
        adults,
    });

    if (error) {
        return next(
            generateErrorUtil('Imposible acceder al servidor amadeus', 500),
        );
    }
    next();
};

export default joiValidatorError;
