// Iportamos PropTypes para validar los tipos de datos de las propiedades
import PropTypes from 'prop-types';

//importamos componente
import RatingListItem from './RatingListItem';
import useAvgRating from '../hooks/useAvgRating';

// Este componente recibe un array de comentarios y muestra los 3 primeros
const RatingsSummary = ({ ratings }) => {
    //declaramos las variables
    const { avgRating, totalRatings } = useAvgRating();
    //calculamos la media de las valoraciones

    return (
        <div>
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
                {ratings.slice(0, 3).map((rating) => (
                    <RatingListItem
                        key={rating.id}
                        ratingId={rating.id}
                        title={rating.title}
                        rate={rating.rate}
                        comment={rating.comment}
                        username={rating.username}
                        createdAt={rating.createdAt}
                    />
                ))}
            </ul>
        </div>
    );
};

// Validamos las propiedades
RatingsSummary.propTypes = {
    ratings: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            rate: PropTypes.number.isRequired,
            comment: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

// Exportamos el componente
export default RatingsSummary;
