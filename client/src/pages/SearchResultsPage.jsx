import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FlightCard from '../components/FlightCard';
import FlightFilters from '../components/FlightFilters';

const { VITE_API_URL } = import.meta.env;

const SearchResultsPage = () => {
    const location = useLocation();
    const [ initialFlights, setInitialFlights ] = useState( [] ); // Almacena los vuelos originales
    const [ flights, setFlights ] = useState( [] ); // Almacena los vuelos filtrados
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( null );

    // Cargar vuelos iniciales desde el estado de la ubicación
    useEffect( () => {
        if ( location.state?.flights )
        {
            setInitialFlights( location.state.flights );
            setFlights( location.state.flights );
        }
    }, [ location.state?.flights ] );

    // Función para aplicar filtros localmente
    const applyFiltersLocally = ( filters ) => {
        let filteredFlights = [ ...initialFlights ];

        // Aplicar filtros
        if ( filters.airline )
        {
            filteredFlights = filteredFlights.filter( ( flight ) =>
                flight.validatingAirlineCodes.includes( filters.airline )
            );
        }
        if ( filters.maxPrice )
        {
            filteredFlights = filteredFlights.filter(
                ( flight ) => parseFloat( flight.price.total ) <= parseFloat( filters.maxPrice )
            );
        }
        if ( filters.duration )
        {
            filteredFlights = filteredFlights.filter( ( flight ) =>
                flight.itineraries.some( ( itinerary ) => itinerary.duration <= filters.duration )
            );
        }

        // Actualizar el estado con los vuelos filtrados
        setFlights( filteredFlights );
    };

    // Manejar cambios en los filtros
    const handleFilterChange = async ( filters ) => {
        try
        {
            console.log( "Filters applied:", filters );

            // Filtrar los parámetros vacíos
            const searchParams = new URLSearchParams();
            Object.keys( filters ).forEach( key => {
                if ( filters[ key ] )
                {
                    searchParams.append( key, filters[ key ] );
                }
            } );
            console.log( "Filtered parameters:", searchParams.toString() );

            // Realizar la petición a la API para vuelos filtrados
            const res = await fetch(
                `${ VITE_API_URL }/api/flights/filter?${ searchParams.toString() }`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            console.log( 'Response:', res );

            // Manejar la respuesta de la API
            if ( !res.ok ) throw new Error( 'Network response was not ok' );
            const body = await res.json();

            console.log( 'Response body:', body );
            if ( body.status === 'error' ) throw new Error( body.message );

            // Actualizar los vuelos con los datos filtrados
            const filteredFlights = body.data || [];
            setFlights( filteredFlights );

            filteredFlights.forEach( ( flight, index ) => {
                console.log( `Filtered Flight ${ index } itineraries:`, flight.itineraries );
            } );

            console.log( 'Filtered flights data:', filteredFlights );
            console.log( 'Updated flights state:', filteredFlights );
        } catch ( err )
        {
            console.log( 'Error al filtrar vuelos:', err );
            console.log( 'Error message:', err.message );
            console.log( 'Error stack:', err.stack );
        }
    };

    // Renderizar resultados
    return (
        <section>
            <FlightFilters onFilterChange={handleFilterChange} />
            <h2>Resultados de la Búsqueda</h2>
            <section className="flight-cards-container">
                {flights.map( ( flight, index ) => (
                    <FlightCard key={`${ flight.id }-${ index }`} flight={flight} />
                ) )}
            </section>
        </section>
    );
};

export default SearchResultsPage;