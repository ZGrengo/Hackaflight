import generateErrorUtil from '../../utils/generateErrorUtil.js';
import { globalFlights } from './searchFlightsController.js';

// Controlador para filtrar la lista de vuelos almacenada
const filterFlightListController = (req, res, next) => {
    try {
        // Validar que haya vuelos almacenados
        if (!globalFlights || globalFlights.length === 0) {
            generateErrorUtil(
                'No hay vuelos disponibles para filtrar. Realiza una búsqueda primero.',
                404,
            );
        }

        // Obtener los parámetros de filtrado del query
        const {
            airline,
            minPrice,
            maxPrice,
            departureTime,
            arrivalTime,
            travelClass,
            stops,
            sortBy,
            order,
            page = 1, // Página por defecto: 1
            limit = 10, // Límite de resultados por página: 10
        } = req.query;

        // Validar que los parámetros de paginación sean números válidos
        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);
        if (isNaN(parsedPage)) {
            generateErrorUtil(
                'El parámetro "page" debe ser un número válido.',
                400,
            );
        }
        if (isNaN(parsedLimit)) {
            generateErrorUtil(
                'El parámetro "limit" debe ser un número válido.',
                400,
            );
        }

        // Aplicar los filtros
        let filteredFlights = globalFlights;

        // Filtro por aerolínea
        if (airline) {
            filteredFlights = filteredFlights.filter((flight) =>
                flight.validatingAirlineCodes?.includes(airline.toUpperCase()),
            );
        }

        // Filtro por precio mínimo
        if (minPrice) {
            const parsedMinPrice = parseFloat(minPrice);
            if (isNaN(parsedMinPrice)) {
                generateErrorUtil(
                    'El parámetro "minPrice" debe ser un número válido.',
                    400,
                );
            }
            filteredFlights = filteredFlights.filter(
                (flight) => parseFloat(flight.price?.total) >= parsedMinPrice,
            );
        }

        // Filtro por precio máximo
        if (maxPrice) {
            const parsedMaxPrice = parseFloat(maxPrice);
            if (isNaN(parsedMaxPrice)) {
                generateErrorUtil(
                    'El parámetro "maxPrice" debe ser un número válido.',
                    400,
                );
            }
            filteredFlights = filteredFlights.filter(
                (flight) => parseFloat(flight.price?.total) <= parsedMaxPrice,
            );
        }

        // Filtro por horario de salida
        if (departureTime) {
            const parsedDepartureTime = new Date(
                `1970-01-01T${departureTime}Z`,
            );
            if (isNaN(parsedDepartureTime.getTime())) {
                generateErrorUtil(
                    'El parámetro "departureTime" debe ser una hora válida en formato HH:MM.',
                    400,
                );
            }
            filteredFlights = filteredFlights.filter((flight) => {
                const departure = new Date(
                    `1970-01-01T${new Date(flight.itineraries[0]?.segments[0]?.departure?.at).toISOString().split('T')[1]}Z`,
                );
                return departure >= parsedDepartureTime;
            });
        }

        // Filtro por horario de llegada
        if (arrivalTime) {
            const parsedArrivalTime = new Date(`1970-01-01T${arrivalTime}Z`);
            if (isNaN(parsedArrivalTime.getTime())) {
                generateErrorUtil(
                    'El parámetro "arrivalTime" debe ser una hora válida en formato HH:MM.',
                    400,
                );
            }
            filteredFlights = filteredFlights.filter((flight) => {
                const lastSegment =
                    flight.itineraries[0]?.segments[
                        flight.itineraries[0]?.segments.length - 1
                    ];
                const arrival = new Date(
                    `1970-01-01T${new Date(lastSegment?.arrival?.at).toISOString().split('T')[1]}Z`,
                );
                return arrival <= parsedArrivalTime;
            });
        }

        // Filtro por clase de billete
        if (travelClass) {
            filteredFlights = filteredFlights.filter((flight) =>
                flight.travelerPricings?.some(
                    (pricing) => pricing.travelerType === travelClass,
                ),
            );
        }

        // Filtro por cantidad de escalas
        if (stops) {
            const parsedStops = parseInt(stops);
            if (isNaN(parsedStops)) {
                generateErrorUtil(
                    'El parámetro "stops" debe ser un número válido.',
                    400,
                );
            }
            filteredFlights = filteredFlights.filter(
                (flight) =>
                    flight.itineraries[0]?.segments.length - 1 === parsedStops,
            );
        }

        // Ordenar por precio, paradas o duración
        if (sortBy) {
            filteredFlights = filteredFlights.sort((a, b) => {
                let valueA, valueB;

                switch (sortBy) {
                    case 'price':
                        valueA = parseFloat(a.price?.total);
                        valueB = parseFloat(b.price?.total);
                        break;
                    case 'stops':
                        valueA = a.itineraries[0]?.segments.length;
                        valueB = b.itineraries[0]?.segments.length;
                        break;
                    case 'duration':
                        valueA = a.itineraries[0]?.duration;
                        valueB = b.itineraries[0]?.duration;
                        break;
                    default:
                        return 0;
                }

                if (order === 'desc') {
                    return valueB - valueA;
                }
                return valueA - valueB; // Orden ascendente por defecto
            });
        }

        // Paginación
        const startIndex = (parsedPage - 1) * parsedLimit;
        const endIndex = parsedPage * parsedLimit;
        const paginatedFlights = filteredFlights.slice(startIndex, endIndex);

        // Enviar la respuesta con los vuelos filtrados y paginados
        res.status(200).send({
            status: 'ok',
            data: paginatedFlights,
            pagination: {
                totalFlights: filteredFlights.length,
                totalPages: Math.ceil(filteredFlights.length / parsedLimit),
                currentPage: parsedPage,
                flightsPerPage: parsedLimit,
            },
            message: 'Lista de vuelos filtrada y paginada con éxito',
        });
    } catch (err) {
        next(err);
    }
};

export { filterFlightListController };
