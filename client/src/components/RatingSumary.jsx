// Importamos PropTypes para validar los tipos de datos de las propiedades
import PropTypes from 'prop-types';

// Importamos componente
import RatingListItem from './RatingListItem';
import useAvgRating from '../hooks/useAvgRating';

// Este componente recibe un array de comentarios y muestra los 3 primeros
const RatingsSummary = ( { ratings } ) => {
    // Declaramos las variables
    const { avgRating, totalRatings } = useAvgRating();
    // Calculamos la media de las valoraciones

    // Filtramos las valoraciones con puntuación de 5
    const topRatings = ratings.filter( rating => rating.rate === 5 ).slice( 0, 3 );

    return (
        <div className='bg-medium-blue p-4 text-light-blue text-center'>
            <h2>Lo que piensan nuestros usuarios...</h2>
            <div>
                {/* Calculamos (hook) y Mostramos la valoración media y el total */}
                <p>
                    {avgRating}⭐ de {totalRatings} valoraciones
                </p>

                {/* Indicamos cuántas valoraciones se muestran del total */}
                <p>Mostrando 3 de {ratings.length} valoraciones</p>
            </div>

            <ul>
                {/* Mostramos los 3 primeros comentarios de valoracion 5 */}
                {topRatings.map( ( rating ) => (
                    <RatingListItem
                        key={rating.id}
                        title={rating.title}
                        rate={rating.rate}
                        comment={rating.comment}
                        username={rating.username}
                    />
                ) )}
            </ul>
        </div>
    );
};

// Validamos las propiedades
RatingsSummary.propTypes = {
    ratings: PropTypes.arrayOf(
        PropTypes.shape( {
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            rate: PropTypes.number.isRequired,
            comment: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,

        } ),
    ).isRequired,
};

// Exportamos el componente
export default RatingsSummary;