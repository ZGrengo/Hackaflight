import PropTypes from 'prop-types';

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
    return (
        <section className='relative z-10 top-48 opacity-90 flex justify-center items-center text-sm'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col items-center w-3/4 space-y-4 p-8 bg-dark-blue text-light-blue shadow-lg rounded-lg'
            >
                <section className='grid grid-cols-2 gap-4 w-full'>
                    <section className='flex flex-col items-center'>
                        <label>Pasajeros:</label>
                        <input
                            type='number'
                            value={pasajeros}
                            onChange={(e) => {
                                console.log(
                                    `Pasajeros changed: ${e.target.value}`,
                                );
                                setPasajeros(e.target.value);
                            }}
                            min='1'
                            className='text-slate-900  w-2/5 h-1/2 border-2 border-medium-blue rounded-md p-2 text-center'
                        />
                    </section>
                    <section className='flex flex-col items-center'>
                        <label>Tipo de Viaje:</label>
                        <select
                            value={tipoViaje}
                            onChange={(e) => {
                                console.log(
                                    `Tipo de Viaje changed: ${e.target.value}`,
                                );
                                setTipoViaje(e.target.value);
                            }}
                            className='text-slate-900  w-4/5 h-1/2 border-2 border-medium-blue rounded-md'
                        >
                            <option value='ida'>Ida</option>
                            <option value='ida-vuelta'>Ida y Vuelta</option>
                        </select>
                    </section>
                    <section className='flex flex-col items-center'>
                        <label>Origen:</label>
                        <input
                            type='text'
                            placeholder='BCN'
                            value={origen}
                            onChange={(e) => {
                                console.log(
                                    `Origen changed: ${e.target.value}`,
                                );
                                setOrigen(e.target.value);
                            }}
                            className='text-slate-900  w-1/2 text-center border-2 border-medium-blue rounded-md'
                        />
                    </section>
                    <section className='flex flex-col items-center'>
                        <label>Destino:</label>
                        <input
                            type='text'
                            placeholder='MAD'
                            value={destino}
                            onChange={(e) => {
                                console.log(
                                    `Destino changed: ${e.target.value}`,
                                );
                                setDestino(e.target.value);
                            }}
                            className='text-slate-900  w-1/2 text-center border-2 border-medium-blue rounded-md'
                        />
                    </section>
                    <section className='flex flex-col items-center text-[12px]'>
                        <label>Fecha de Salida:</label>
                        <input
                            type='date'
                            value={fechaSalida}
                            onChange={(e) => {
                                console.log(
                                    `Fecha de Salida changed: ${e.target.value}`,
                                );
                                setFechaSalida(e.target.value);
                            }}
                            className='text-slate-900 text-center border-2 border-medium-blue rounded-md'
                        />
                    </section>
                    {tipoViaje === 'ida-vuelta' && (
                        <section className='flex flex-col items-center text-[12px]'>
                            <label>Fecha de Retorno:</label>
                            <input
                                type='date'
                                value={fechaRetorno}
                                onChange={(e) => {
                                    console.log(
                                        `Fecha de Retorno changed: ${e.target.value}`,
                                    );
                                    setFechaRetorno(e.target.value);
                                }}
                                className='text-slate-900 text-center border-2 border-medium-blue rounded-md'
                            />
                        </section>
                    )}
                </section>
                <button
                    type='submit'
                    className='top-3 relative py-2 px-4 text-slate-900 text-base font-bold overflow-hidden bg-medium-blue rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-accent-blue before:to-medium-blue before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
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
