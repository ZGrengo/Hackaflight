import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const FlightFilters = ( { onFilterChange } ) => {
    const [ filters, setFilters ] = useState( {
        stops: '',
        minPrice: '',
        maxPrice: '',
        sortByPrice: '',
    } );

    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        console.log( `Filter changed: ${ name } = ${ value }` );
        setFilters( ( prevFilters ) => ( {
            ...prevFilters,
            [ name ]: value,
        } ) );
    };

    const applyFilters = () => {
        console.log( "Applying filters:", filters );
        onFilterChange( filters );
    };

    useEffect( () => {
        console.log( "Filters state updated:", filters );
    }, [ filters ] );

    return (
        <section>
            <section>
                <label>Paradas:</label>
                <select name="stops" value={filters.stops} onChange={handleInputChange}>
                    <option value="">Cualquiera</option>
                    <option value="0">Directo</option>
                    <option value="1">1 Parada</option>
                    <option value="2">2 Paradas</option>
                </select>
            </section>
            <section>
                <label>Precio Mínimo:</label>
                <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleInputChange}
                />
            </section>
            <section>
                <label>Precio Máximo:</label>
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleInputChange}
                />
            </section>
            <section>
                <label>Ordenar por:</label>
                <select name="sortByPrice" value={filters.sortByPrice} onChange={handleInputChange}>
                    <option value="">Seleccionar</option>
                    <option value="true">Precio Ascendente</option>
                    <option value="false">Precio Descendente</option>
                </select>
            </section>
            <button onClick={applyFilters}>Aplicar Filtros</button>
        </section>
    );
};

FlightFilters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default FlightFilters;