import PropTypes from 'prop-types';
import { useState } from 'react';

const FlightFilters = ( { onFilterChange } ) => {
    const [ filters, setFilters ] = useState( {
        stops: '',
        minPrice: '',
        maxPrice: '',
        sortByPrice: '',
    } );

    // Función para manejar el cambio de filtros
    const handleInputChange = ( e ) => {
        const { name, value } = e.target;
        setFilters( ( prevFilters ) => ( {
            ...prevFilters,
            [ name ]: value,
        } ) );
    };

    // Función para aplicar los filtros
    const applyFilters = () => {
        console.log( 'Aplicando filtros:', filters );
        onFilterChange( filters );
    };

    return (
        <div>
            <div>
                <label>Paradas:</label>
                <select name="stops" value={filters.stops} onChange={handleInputChange}>
                    <option value="">Cualquiera</option>
                    <option value="0">Directo</option>
                    <option value="1">1 Parada</option>
                    <option value="2">2 Paradas</option>
                </select>
            </div>
            <div>
                <label>Precio Mínimo:</label>
                <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Precio Máximo:</label>
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Ordenar por:</label>
                <select name="sortByPrice" value={filters.sortByPrice} onChange={handleInputChange}>
                    <option value="">Seleccionar</option>
                    <option value="true">Precio Ascendente</option>
                    <option value="false">Precio Descendente</option>
                </select>
            </div>
            <button onClick={applyFilters}>Aplicar Filtros</button>
        </div>
    );
};

FlightFilters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default FlightFilters;