import Joi from 'joi';

const filterFlightsSchema = Joi.object({
    airline: Joi.string().optional(),
    minPrice: Joi.number().optional(),
    maxPrice: Joi.number().optional(),
    departureTime: Joi.date().iso().optional(),
    arrivalTime: Joi.date().iso().optional(),
    travelClass: Joi.string().optional(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
    //he añadido estos dos para ordenar y que los valide joi
    sortBy: Joi.string().valid('price', 'stops', 'duration').optional(),
    order: Joi.string().valid('asc', 'desc').optional(),
});

export default filterFlightsSchema;
