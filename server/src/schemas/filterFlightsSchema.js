import Joi from 'joi';

const timePattern = /^([01]\d|2[0-3])$/;

const filterFlightsSchema = Joi.object( {
    airline: Joi.string().optional(),
    minPrice: Joi.number().optional(),
    maxPrice: Joi.number().optional(),
    departureTime: Joi.string().pattern( timePattern ).optional(),
    arrivalTime: Joi.string().pattern( timePattern ).optional(),
    class: Joi.string().valid( 'a', 'f', 'p', 'r', 'c', 'd', 'i', 'j', 'z' ).optional(),
    sortByPrice: Joi.string().valid( 'true', 'false' ).optional(),
    stops: Joi.number().integer().min( 0 ).optional(), // Añadir validación para stops
} );

export default filterFlightsSchema;