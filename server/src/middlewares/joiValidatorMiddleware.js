const joiValidatorMiddleware = (schema) => {
    return async (req, res, next) => {
        try {
            // For GET requests, validate query parameters
            const dataToValidate = req.method === 'GET' ? req.query : req.body;

            await schema.validateAsync(dataToValidate);

            next();
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.details[0].message,
            });
        }
    };
};

export default joiValidatorMiddleware;
