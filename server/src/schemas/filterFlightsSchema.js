import Joi from 'joi';

const filterFlightsSchema = Joi.object({
    airline: Joi.string().optional(),
    minPrice: Joi.number().optional(),
    maxPrice: Joi.number().optional(),
    departureTime: Joi.string().isoDate().optional(),
    arrivalTime: Joi.string().isoDate().optional(),
    travelClass: Joi.string().optional(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
});

export default filterFlightsSchema;
