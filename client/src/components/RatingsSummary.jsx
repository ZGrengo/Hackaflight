// Importamos PropTypes para validar los tipos de datos de las propiedades
import PropTypes from 'prop-types';

// Importamos componente
import RatingListItem from './RatingListItem';
import useAvgRating from '../hooks/useAvgRating';
import { Link } from 'react-router-dom';

// Este componente recibe un array de comentarios y muestra los 3 primeros
const RatingsSummary = ({ ratings }) => {
    // Declaramos las variables
    const { avgRating, totalRatings } = useAvgRating();
    // Calculamos la media de las valoraciones

    // Filtramos las valoraciones con puntuación de 5
    const topRatings = [...ratings].slice(0, 3);

    return (
        <div className='p-7'>
            <h2 className='text-3xl font-heading font-light mb-4 text-dark-blue border-b-2 border-accent-blue pb-2'>
                <Link to='/ratings'>LO QUE PIENSAN NUESTROS USUARIOS</Link>
            </h2>
            <div className='mb-6'>
                {/* Calculamos (hook) y Mostramos la valoración media y el total */}
                <p className='text-xl text-dark-blue'>
                    {avgRating}⭐ de {totalRatings} valoraciones
                </p>

                {/* Indicamos cuántas valoraciones se muestran del total */}
                <p className='text-sm text-medium-blue'>
                    Mostrando 3 de {ratings.length} valoraciones
                </p>
            </div>
            <div className='space-y-6 space-y-4 w-full max-w-2xl mx-auto '>
                <ul className=''>
                    {/* Mostramos los 3 más recientes */}
                    {topRatings && topRatings.length > 0 ? (
                        topRatings.slice(0, 3).map((rating) => (
                            <div
                                key={rating.id}
                               
                            >
                                <RatingListItem
                                    ratingId={rating.id}
                                    title={rating.title}
                                    rate={rating.rate}
                                    comment={rating.comment}
                                    username={rating.username}
                                    createdAt={rating.createdAt}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No hay valoraciones disponibles</p>
                    )}
                </ul>
            </div>
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
        }),
    ).isRequired,
};

// Exportamos el componente
export default RatingsSummary;
