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
        <section className="flex justify-center w-full py-6">
            <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-center text-dark-blue mb-4">
                    Filtros de Búsqueda
                </h2>
                <div className="space-y-3">
                    <div>
                        <label className="block text-base font-medium text-gray-700">Paradas</label>
                        <select
                            name="stops"
                            value={filters.stops}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medium-blue focus:border-medium-blue text-sm"
                        >
                            <option value="">Cualquiera</option>
                            <option value="0">Directo</option>
                            <option value="1">1 Parada</option>
                            <option value="2">2 Paradas</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-base font-medium text-gray-700">Precio Mínimo</label>
                        <input
                            type="number"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medium-blue focus:border-medium-blue text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-base font-medium text-gray-700">Precio Máximo</label>
                        <input
                            type="number"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medium-blue focus:border-medium-blue text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-base font-medium text-gray-700">Ordenar por</label>
                        <select
                            name="sortByPrice"
                            value={filters.sortByPrice}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medium-blue focus:border-medium-blue text-sm"
                        >
                            <option value="">Seleccionar</option>
                            <option value="true">Precio Ascendente</option>
                            <option value="false">Precio Descendente</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={applyFilters}
                            className='top-3 relative py-2 px-4 text-slate-900 text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                        >Aplicar Filtros</button>
                    </div>
                </div>
            </div>
        </section >
    );
};

FlightFilters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
};

export default FlightFilters;
