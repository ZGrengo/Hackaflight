import Amadeus from 'amadeus';
import dotenv from 'dotenv';

dotenv.config();

const { AMADEUS_API_KEY, AMADEUS_API_SECRET } = process.env;

const amadeus = new Amadeus({
    clientId: AMADEUS_API_KEY,
    clientSecret: AMADEUS_API_SECRET,
});

export default amadeus;

// 🔍 Prueba de autenticación con Amadeus
/*
amadeus.client
    .get('/v1/security/oauth2/token')
    .then((response) =>
        console.log('✅ Autenticación exitosa:', response.result),
    )
    .catch((error) =>
        console.error(
            '❌ Error de autenticación:',
            error.response?.data || error.message,
        ),
    );
*/
