import joi from 'joi';

const searchFlightsSchema = joi.object( {
    origin: joi.string().length( 3 ).required().messages( {
        'string.empty': 'El origen es requerido',
        'string.length': 'El código de origen debe tener 3 caracteres',
    } ),
    destination: joi.string().length( 3 ).required().messages( {
        'string.empty': 'El destino es requerido',
        'string.length': 'El código de destino debe tener 3 caracteres',
    } ),
    departureDate: joi.date().greater( 'now' ).required().messages( {
        'date.base': 'La fecha debe ser válida',
        'date.greater': 'La fecha debe ser futura',
    } ),
    returnDate: joi.date().greater( 'now' ).messages( {
        'date.base': 'La fecha debe ser válida',
        'date.greater': 'La fecha debe ser futura',
    } ),
    adults: joi.number().min( 1 ).max( 9 ).required().messages( {
        'number.base': 'El número de adultos debe ser un número',
        'number.min': 'Debe haber al menos 1 adulto',
        'number.max': 'No puede haber más de 9 adultos',
    } ),
} );

export default searchFlightsSchema;
