import Joi from 'joi';

const validateSearch = Joi.object({
    originLocationCode: Joi.string().length(3).uppercase().required(),
    destinationLocationCode: Joi.string().length(3).uppercase().required(),
    departureDate: Joi.date().iso().required(),
    returnDate: Joi.date().iso().required(),
    adults: Joi.number().integer().min(1).required(),
});

export default validateSearch;
