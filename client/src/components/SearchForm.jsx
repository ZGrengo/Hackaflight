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
        <section className='w-full max-w-5xl mx-auto px-4 py-6 hover:scale-[1.008]'>
            <form
                onSubmit={handleSubmit}
                className='
                        bg-white
                        shadow-xl
                        rounded-md
                        p-4 flex
                        flex-col
                        md:flex-row
                        items-center
                        justify-between
                        space-y-4
                        md:space-y-0
                        md:space-x-4
                        font-body
                        text-dark-blue'
            >
                <div className='flex flex-col w-full md:w-auto relative'>
                    <label className='mb-1 text-sm font-medium'>
                        Tipo de Viaje
                    </label>
                    <select
                        value={tipoViaje}
                        onChange={(e) => setTipoViaje(e.target.value)}
                        className='
                            w-full
                            md:w-40
                            border
                            border-medium-blue
                            rounded-md
                            p-2
                            focus:outline-none
                            focus:ring-2
                            focus:ring-medium-blue
                            text-sm'
                    >
                        <option value='ida-vuelta'>Ida y Vuelta</option>
                        <option value='ida'>Solo Ida</option>
                    </select>
                </div>
                <div
                    ref={originRef}
                    className='flex flex-col w-full md:w-auto relative'
                >
                    <label className='mb-1 text-sm font-medium'>Origen</label>
                    <input
                        type='text'
                        placeholder='Ciudad o Aeropuerto'
                        value={origen}
                        onChange={(e) => {
                            setOrigen(e.target.value);
                            handleSearch(e.target.value, setOriginSuggestions);
                        }}
                        className='
                            w-full
                            md:w-44
                            border
                            border-medium-blue
                            rounded-md
                            p-2
                            text-dark-blue
                            focus:ring-2
                            focus:ring-medium-blue
                            placeholder:text-gray-400'
                    />
                    {/* Sugerencias de origen*/}
                    {originSuggestions.length > 0 && (
                        <ul
                            className='
                            absolute
                            top-full
                            left-0
                            w-full
                            bg-white
                            text-dark-blue
                            border
                            border-gray-300
                            max-h-48
                            overflow-y-auto
                            rounded-md 
                            mt-1
                            z-10'
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

                {/* Destino*/}

                <div
                    ref={destinationRef}
                    className='flex flex-col w-full md:w-auto relative'
                >
                    <label className='mb-1 text-sm font-medium'>Destino</label>
                    <input
                        type='text'
                        placeholder='Ciudad o Aeropuerto'
                        value={destino}
                        onChange={(e) => {
                            setDestino(e.target.value);
                            handleSearch(
                                e.target.value,
                                setDestinationSuggestions,
                            );
                        }}
                        className='
                            w-full
                            md:w-44
                            border
                            border-medium-blue
                            rounded-md
                            p-2
                            text-sm
                            text-dark-blue
                            focus:outline-none
                            focus:ring-2
                            focus:ring-medium-blue
                            placeholder:text-gray-400'
                    />

                    {/*Sugetencias de destino*/}

                    {destinationSuggestions.length > 0 && (
                        <ul
                            className='
                                        absolute
                                        top-full
                                        left-0
                                        w-full
                                        bg-white
                                        text-dark-blue
                                        border-gray-300
                                        max-h-48
                                        overflow-y-auto
                                        rounded-md
                                        shadow-md
                                        mt-1
                                        z-10'
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
                                    {airport.city} - {airport.name} (
                                    {airport.iata})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* Fecha de Salida*/}
                <div className='flex flex-col w-full md:w-auto relative'>
                    <label className='mb-1 text-sm font-medium'>Salida</label>
                    <input
                        type='date'
                        value={fechaSalida}
                        onChange={(e) => setFechaSalida(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className='
                                w-full 
                                md:w-36 
                                border 
                                border-medium-blue 
                                rounded-md 
                                p-2 
                                text-sm 
                                text-dark-blue 
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-medium-blue'
                    />
                </div>
                {/* Fecha de Retorno*/}
                {tipoViaje === 'ida-vuelta' && (
                    <div className='flex flex-col w-full md:w-auto relative'>
                        <label className='mb-1 text-sm font-medium'>
                            Retorno
                        </label>
                        <input
                            type='date'
                            value={fechaRetorno}
                            onChange={(e) => setFechaRetorno(e.target.value)}
                            min={
                                fechaSalida ||
                                new Date().toISOString().split('T')[0]
                            }
                            className='
                                w-full 
                                md:w-36 
                                border 
                                border-medium-blue 
                                rounded-md 
                                p-2 
                                text-sm 
                                text-dark-blue 
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-medium-blue'
                        />
                    </div>
                )}

                {/* Pasajeros*/}
                <div className='flex flex-col w-full md:w-auto relative'>
                    <label className='mb-1 text-sm font-medium'>
                        Pasajeros
                    </label>
                    <input
                        type='number'
                        value={pasajeros}
                        onChange={(e) => setPasajeros(e.target.value)}
                        min='1'
                        className='
                                w-full 
                                md:w-16 
                                border 
                                border-medium-blue 
                                rounded-md 
                                p-2 
                                text-sm 
                                text-dark-blue 
                                text-center
                                focus:outline-none 
                                focus:ring-2 
                                focus:ring-medium-blue'
                    />
                </div>

                {/* botón de Buscar*/}
                <button
                    type='submit'
                    className='
                        bg-dark-blue
                        text-white
                        font-button
                        text-sm
                        font-bold
                        rounded-md
                        px-6
                        py-3
                        mt-2
                        md:mt-5
                        md:ml-2
                        hover:bg-medium-blue
                        transition-colors
                        duration-300'
                >
                    Buscar
                </button>
            </form>
        </section>
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
