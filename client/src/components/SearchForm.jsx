import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import aircodes from 'aircodes';

const SearchForm = ({
    tipoViaje,
    fechaSalida,
    fechaRetorno,
    origen,
    destino,
    pasajeros,
    setTipoViaje,
    setFechaSalida,
    setFechaRetorno,
    setOrigen,
    setDestino,
    setPasajeros,
    handleSubmit,
}) => {
    const [originSuggestions, setOriginSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    const originRef = useRef(null);
    const destinationRef = useRef(null);

    // Función para buscar aeropuertos con `aircodes`
    const handleSearch = (query, setSuggestions) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        const results = aircodes.findAirport(query) || []; // 🔍 Busca aeropuertos por ciudad, país o código IATA

        setSuggestions(results);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                originRef.current &&
                !originRef.current.contains(event.target) &&
                destinationRef.current &&
                !destinationRef.current.contains(event.target)
            ) {
                setOriginSuggestions([]);
                setDestinationSuggestions([]);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            className='w-full font-body text-dark-blue'
        >
            {/* Fila Superior: Origen y Destino*/}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 mb-4'>
                <div ref={originRef} className='relative'>
                    <label className='mb-1 text-sm font-medium'>Origen</label>
                    <input
                        type='text'
                        placeholder='Ciudad o aeropuerto'
                        value={origen}
                        onChange={(e) => {
                            setOrigen(e.target.value);
                            handleSearch(e.target.value, setOriginSuggestions);
                        }}
                        className='w-full border border-medium-blue rounded-md p-2 text-sm
                                    text-dark-blue focus:outline-none focus:ring-2 focus:ring-medium-blue
                                    placeholder:text-gray-400'
                    />
                    {originSuggestions.length > 0 && (
                        <ul
                            className='absolute top-full left-0 w-full bg-white text-dark-blue
                                            border border-gray-300 max-h-48 overflow-y-auto rounded-md shadow-md mt-1 z-10'
                        >
                            {originSuggestions.map((airport) => (
                                <li
                                    key={airport.iata}
                                    className='p-2 hover:bg-gray-100 cursor-pointer'
                                    onClick={() => {
                                        setOrigen(airport.iata);
                                        setOriginSuggestions([]);
                                    }}
                                >
                                    {airport.city} - {airport.name} (
                                    {airport.iata})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div ref={destinationRef} className='relative'>
                    <label className='mb-1 text-sm font-medium'>Destino</label>
                    <input
                        type='text'
                        placeholder='Ciudad o aeropuerto'
                        value={destino}
                        onChange={(e) => {
                            setDestino(e.target.value);
                            handleSearch(
                                e.target.value,
                                setDestinationSuggestions,
                            );
                        }}
                        className='w-full border border-medium-blue rounded-md p-2 text-sm
                                        text-dark-blue focus:outline-none focus:ring-medium-blue
                                        placeholder:text-gray-400'
                    />
                    {destinationSuggestions.length > 0 && (
                        <ul
                            className='absolute top-full left-0 w-full bg-white text-dark-blue
                                                border border-gray-300 max-h-48 overflow-y-auto
                                                rounded-md shadow-md mt-1 z-10'
                        >
                            {destinationSuggestions.map((airport) => (
                                <li
                                    key={airport.iata}
                                    className='p-2 hover:bg-gray-100 cursor-pointer'
                                    onClick={() => {
                                        setDestino(airport.iata);
                                        setDestinationSuggestions([]);
                                    }}
                                >
                                    {airport.city} - {airport.name}(
                                    {airport.iata})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Fila inferior destribuida en 5 columnas iguales*/}
            <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-5 md:items-end'>
                <div className='flex flex-col'>
                    <label className='mb-1 text-sm font-medium'>
                        Tipo de Viaje
                    </label>
                    <select
                        value={tipoViaje}
                        onChange={(e) => setTipoViaje(e.target.value)}
                        className='w-full border border-medium-blue rounded-md p-2
                                        text-sm focus:outline-none focus:ring-2 focus:ring-medium-blue'
                    >
                        <option value='ida-vuelta'>Ida y Vuelta</option>
                        <option value='ida'>Solo Ida</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label className='mb-1 text-sm font-medium'>Salida</label>
                    <input
                        type='date'
                        value={fechaSalida}
                        onChange={(e) => setFechaSalida(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className='w-full border border-medium-blue rounded-md p-2 text-sm
                                        text_dark-blue focus:outline-none focus:ring-2 focus:ring-medium-blue'
                    />
                </div>
                <div className='flex flex-col'>
                    <label
                        className={`mb-1 text-sm font-medium ${tipoViaje === 'ida' ? 'text-light-blue' : ''}`}
                    >
                        Retorno
                    </label>
                    {tipoViaje === 'ida-vuelta' ? (
                        <input
                            type='date'
                            value={fechaRetorno}
                            onChange={(e) => setFechaRetorno(e.target.value)}
                            min={
                                fechaSalida ||
                                new Date().toISOString().split('T')[0]
                            }
                            className='w-full border border-medium-blue rounded-md p-2 text-sm text_dark-blue focus:outline-none focus:ring-2 focus:ring-medium-blue'
                        />
                    ) : (
                        <input
                            type='dete'
                            value={fechaRetorno}
                            disabled
                            className='w-full border border-light-blue rounded-md p-2 text-sm text-light-blue bg-light-blue cursor-not-allowed'
                        />
                    )}
                </div>
                <div className='flex flex-col'>
                    <label className='mb-1 text-sm font-medium'>
                        Pasajeros
                    </label>
                    <input
                        type='number'
                        value={pasajeros}
                        onChange={(e) => setPasajeros(e.target.value)}
                        min='1'
                        className='w-full border border-medium-blue rounded-md p-2 text-sm text-dark-blue text-center focus:outline-none focus:ring-2 focus:ring-medium-blue'
                    />
                </div>
                <div className='flex justify-center'>
                    <button
                        type='submit'
                        className='w-full bg-dark-blue text-white font-button text-sm font-bold rounded-md px-6 py-3 hover:bg-medium-blue transition-colors duration-300'
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </form>
    );
};

SearchForm.propTypes = {
    tipoViaje: PropTypes.string.isRequired,
    fechaSalida: PropTypes.string.isRequired,
    fechaRetorno: PropTypes.string,
    origen: PropTypes.string.isRequired,
    destino: PropTypes.string.isRequired,
    pasajeros: PropTypes.number.isRequired,
    setTipoViaje: PropTypes.func.isRequired,
    setFechaSalida: PropTypes.func.isRequired,
    setFechaRetorno: PropTypes.func.isRequired,
    setOrigen: PropTypes.func.isRequired,
    setDestino: PropTypes.func.isRequired,
    setPasajeros: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
