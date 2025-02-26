// Importamos PropTypes para validar los tipos de datos de las propiedades
import PropTypes from 'prop-types';

// Este componente recibe los datos de la búsqueda y los muestra en un formulario

const SearchForm = ( { tipoViaje, fechaSalida, fechaLlegada, origen, destino, pasajeros, claseBillete, setTipoViaje, setFechaSalida, setFechaLlegada, setOrigen, setDestino, setPasajeros, setClaseBillete, handleSubmit } ) => {
    const toggleTipoViaje = () => {
        setTipoViaje( ( prevTipoViaje ) => ( prevTipoViaje === 'ida' ? 'ida-vuelta' : 'ida' ) );
    };

    return (
        <>

            <h2 className='text-[24px]'>¿Qué aventuras tienes en mente?</h2>

            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-2'>
                <div className='w-1/16 sm:w-full'>
                    <label>Origen:</label>
                    <input className='w-4/4 sm:w-full'
                        type="text"
                        name="origen"
                        value={origen}
                        onChange={( e ) => setOrigen( e.target.value )}
                        placeholder="Origen"
                    />
                </div>

                <div className='w-1/16 sm:w-full'>
                    <label>Destino:</label>
                    <input
                        className='w-4/4 sm:w-full'
                        type="text"
                        name="destino"
                        value={destino}
                        onChange={( e ) => setDestino( e.target.value )}
                        placeholder="Destino"
                    />
                </div>

                <div className='w-1/16 sm:w-full'>
                    <label>Fecha de salida:</label>
                    <input
                        type="date"
                        name="fecha-salida"
                        value={fechaSalida}
                        onChange={( e ) => setFechaSalida( e.target.value )}
                    />
                </div>

                {tipoViaje === 'ida-vuelta' && (
                    <div className='w-1/16 sm:w-full'>
                        <label>Fecha de vuelta:</label>
                        <input
                            type="date"
                            name="fecha-llegada"
                            value={fechaLlegada}
                            onChange={( e ) => setFechaLlegada( e.target.value )}
                        />
                    </div>
                )}

                <div className='w-1/16 sm:w-full'>
                    <label>Tipo de viaje:</label>
                    <button type="button" onClick={toggleTipoViaje} className="w-8 h-8">
                        <img src={tipoViaje === 'ida' ? "/public/ida.png" : "/public/idayvuelta.png"} alt="ida-vuelta" />
                    </button>
                </div>

                <div className='w-1/16 sm:w-full'>
                    <label>Cantidad de pasajeros:</label>
                    <input
                        type="number"
                        name="pasajeros"
                        min="1"
                        max="10"
                        value={pasajeros}
                        onChange={( e ) => setPasajeros( e.target.value )}
                    />
                </div>

                <div className='w-1/16 sm:w-full'>
                    <label>Clase del billete:</label>
                    <select
                        name="clase-billete"
                        value={claseBillete}
                        onChange={( e ) => setClaseBillete( e.target.value )}
                    >
                        <option value="">Selecciona una clase</option>
                        <option value="economica">Económica</option>
                        <option value="business">Business</option>
                        <option value="primera">Primera</option>
                    </select>
                </div>
                { /*Agregamos un botón para enviar el formulario y buscar vuelos*/}
                <button type="submit" className='w-8 h-1/2 rounded-lg sm:w-full sm:h-10'>Buscar</button>
            </form>
        </>
    );
};

// Validamos las propiedades
SearchForm.propTypes = {
    tipoViaje: PropTypes.string.isRequired,
    fechaSalida: PropTypes.string.isRequired,
    fechaLlegada: PropTypes.string.isRequired,
    origen: PropTypes.string.isRequired,
    destino: PropTypes.string.isRequired,
    pasajeros: PropTypes.number.isRequired,
    claseBillete: PropTypes.string.isRequired,
    setTipoViaje: PropTypes.func.isRequired,
    setFechaSalida: PropTypes.func.isRequired,
    setFechaLlegada: PropTypes.func.isRequired,
    setOrigen: PropTypes.func.isRequired,
    setDestino: PropTypes.func.isRequired,
    setPasajeros: PropTypes.func.isRequired,
    setClaseBillete: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

// Exportamos el componente

export default SearchForm;