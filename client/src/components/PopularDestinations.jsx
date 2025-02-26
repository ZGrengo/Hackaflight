// Importamos PropTypes para validar los tipos de datos de las propiedades
import PropTypes from 'prop-types';

// Este componente recibe un array de destinos populares y los muestra
const PopularDestinations = ( { popularDestinations } ) => {
    return (
        <section >
            <div >
                <h2 >Destinos Más Buscados...</h2>
                <div >
                    <button >
                        <img src='/public/flecha.png' alt='retroceder' />
                    </button>
                    <button >
                        <img src='/public/flecha.png' alt='avanzar' />
                    </button>
                </div>
                <ul >
                    {popularDestinations.map( ( destino, index ) => (
                        <li key={index} >
                            <span >{destino.origen}</span>
                            <img src='/public/plane.png' alt='avion' />
                            <span >{destino.destino}</span>
                        </li>
                    ) )}
                </ul>
            </div>
        </section>
    );
};

// Validamos las propiedades
PopularDestinations.propTypes = {
    popularDestinations: PropTypes.arrayOf(
        PropTypes.shape( {
            origen: PropTypes.string.isRequired,
            destino: PropTypes.string.isRequired
        } )
    ).isRequired
};

// Exportamos el componente
export default PopularDestinations;