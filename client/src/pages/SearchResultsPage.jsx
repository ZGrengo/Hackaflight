import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import FlightCard from '../components/FlightCard';

const SearchResultsPage = () => {
    const location = useLocation();
    const { flights = { ida: [], vuelta: [] } } = location.state || {};
    const [ filteredFlights, setFilteredFlights ] = useState( [ ...flights.ida, ...flights.vuelta ] );
    const [ sortOption, setSortOption ] = useState( '' );

    const handleFilterChange = ( filter ) => {
        // Implementar lógica de filtrado aquí
        let updatedFlights = [ ...flights.ida, ...flights.vuelta ];

        // Filtrar por destino
        if ( filter.destination )
        {
            updatedFlights = updatedFlights.filter( flight => flight.destination.includes( filter.destination ) );
        }

        // Filtrar por fechas
        if ( filter.departureDate )
        {
            updatedFlights = updatedFlights.filter( flight => flight.departureDate === filter.departureDate );
        }

        // Filtrar por número de paradas
        if ( filter.stops !== undefined )
        {
            updatedFlights = updatedFlights.filter( flight => flight.stops === filter.stops );
        }

        // Filtrar por rango de precios
        if ( filter.priceRange )
        {
            updatedFlights = updatedFlights.filter( flight => flight.price.total >= filter.priceRange.min && flight.price.total <= filter.priceRange.max );
        }

        setFilteredFlights( updatedFlights );
    };

    const handleSortChange = ( option ) => {
        setSortOption( option );
        let sortedFlights = [ ...filteredFlights ];

        if ( option === 'date' )
        {
            sortedFlights.sort( ( a, b ) => new Date( a.departureDate ) - new Date( b.departureDate ) );
        } else if ( option === 'price' )
        {
            sortedFlights.sort( ( a, b ) => a.price.total - b.price.total );
        }

        setFilteredFlights( sortedFlights );
    };

    if ( !flights.ida.length && !flights.vuelta.length )
    {
        return <p>No se encontraron resultados de búsqueda.</p>;
    } else
    {
        return (
            <div>
                <h2>Resultados de la Búsqueda</h2>
                <div>
                    <label>
                        Filtrar por destino:
                        <input type="text" onChange={( e ) => handleFilterChange( { destination: e.target.value } )} />
                    </label>
                </div>
                {/* Agregar componentes de filtro y ordenamiento aquí */}
                <div>
                    <label>
                        Ordenar por:
                        <select value={sortOption} onChange={( e ) => handleSortChange( e.target.value )}>
                            <option value="">Seleccionar</option>
                            <option value="date">Fecha</option>
                            <option value="price">Precio</option>
                        </select>
                    </label>
                </div>
                <div className="flight-cards-container">
                    {filteredFlights.map( ( flight, index ) => (
                        <FlightCard key={index} flight={flight} />
                    ) )}
                </div>
            </div>
        );
    }
};

SearchResultsPage.propTypes = {
    flights: PropTypes.shape( {
        ida: PropTypes.arrayOf( PropTypes.shape( {
            origin: PropTypes.string.isRequired,
            destination: PropTypes.string.isRequired,
            departureDate: PropTypes.string.isRequired,
            returnDate: PropTypes.string,
            price: PropTypes.shape( {
                currency: PropTypes.string.isRequired,
                total: PropTypes.string.isRequired,
                base: PropTypes.string,
                fees: PropTypes.arrayOf( PropTypes.shape( {
                    amount: PropTypes.string,
                    type: PropTypes.string
                } ) ),
                grandTotal: PropTypes.string
            } ).isRequired,
            stops: PropTypes.number
        } ) ),
        vuelta: PropTypes.arrayOf( PropTypes.shape( {
            origin: PropTypes.string.isRequired,
            destination: PropTypes.string.isRequired,
            departureDate: PropTypes.string.isRequired,
            returnDate: PropTypes.string,
            price: PropTypes.shape( {
                currency: PropTypes.string.isRequired,
                total: PropTypes.string.isRequired,
                base: PropTypes.string,
                fees: PropTypes.arrayOf( PropTypes.shape( {
                    amount: PropTypes.string,
                    type: PropTypes.string
                } ) ),
                grandTotal: PropTypes.string
            } ).isRequired,
            stops: PropTypes.number
        } ) )
    } )
};

export default SearchResultsPage;