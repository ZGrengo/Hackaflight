import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FlightCard from '../components/FlightCard';
import FlightFilters from '../components/FlightFilters';

const { VITE_API_URL } = import.meta.env;

const SearchResultsPage = () => {
    const location = useLocation();
    const [ flights ] = useState( () => location.state || { ida: [], vuelta: [] } );
    const [ filteredFlights, setFilteredFlights ] = useState( { ida: [], vuelta: [] } );

    console.log( "Initial flights data:", flights );

    const handleFilterChange = async ( filters ) => {
        try
        {
            console.log( "Filters applied:", filters );

            const searchParams = new URLSearchParams( filters );

            const res = await fetch(
                `${ VITE_API_URL }/api/flights/filter?${ searchParams.toString() }`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if ( !res.ok ) throw new Error( 'Network response was not ok' );
            const body = await res.json();

            if ( body.status === 'error' ) throw new Error( body.message );

            const { flights: filteredFlights } = body.data || {};
            setFilteredFlights( filteredFlights );

            console.log( 'Filtered flights data:', body.data );
        } catch ( err )
        {
            console.log( 'Error al filtrar vuelos:', err );
        }
    };

    useEffect( () => {
        setFilteredFlights( flights );
        console.log( "Updated flights data:", flights );
    }, [ flights ] );

    if ( !flights.length )
    {
        return <p>No se encontraron resultados de búsqueda.</p>;
    }

    return (
        <section>
            <FlightFilters onFilterChange={handleFilterChange} />
            <h2>Resultados de la Búsqueda</h2>
            <section className="flight-cards-container">
                <h3>Vuelos de Ida</h3>
                {filteredFlights.ida.length > 0 ? (
                    filteredFlights.ida.map( ( flight, index ) => (
                        <FlightCard key={index} flight={flight} />
                    ) )
                ) : (
                    <p>No hay vuelos de ida que coincidan con los filtros.</p>
                )}
                <h3>Vuelos de Vuelta</h3>
                {filteredFlights.vuelta.length > 0 ? (
                    filteredFlights.vuelta.map( ( flight, index ) => (
                        <FlightCard key={index} flight={flight} />
                    ) )
                ) : (
                    <p>No hay vuelos de vuelta que coincidan con los filtros.</p>
                )}
            </section>
        </section>
    );
};

SearchResultsPage.propTypes = {
    flights: PropTypes.shape(
        PropTypes.shape( {
            origin: PropTypes.string.isRequired,
            destination: PropTypes.string.isRequired,
            departureDate: PropTypes.string.isRequired,
            returnDate: PropTypes.string,
            price: PropTypes.shape( {
                currency: PropTypes.string.isRequired,
                total: PropTypes.string.isRequired,
                base: PropTypes.string,
                fees: PropTypes.arrayOf(
                    PropTypes.shape( {
                        amount: PropTypes.string,
                        type: PropTypes.string,
                    } )
                ),
                grandTotal: PropTypes.string,
            } ).isRequired,
            stops: PropTypes.number,
        } )
    )
};

export default SearchResultsPage;
