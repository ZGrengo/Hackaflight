import Joi from 'joi';

const flightSchema = Joi.object({
    validatingAirlineCodes: Joi.array().items(Joi.string()).required(),
    price: Joi.object({
        total: Joi.string().required(),
    }).required(),
    itineraries: Joi.array()
        .items(
            Joi.object({
                segments: Joi.array()
                    .items(
                        Joi.object({
                            departure: Joi.object({
                                at: Joi.date().iso().required(),
                            }).required(),
                            arrival: Joi.object({
                                at: Joi.date().iso().required(),
                            }).required(),
                        }),
                    )
                    .required(),
            }),
        )
        .required(),
    travelerPricings: Joi.array()
        .items(
            Joi.object({
                travelerType: Joi.string().required(),
            }),
        )
        .required(),
});

const storeFlightsSchema = Joi.array().items(flightSchema);

export default storeFlightsSchema;
