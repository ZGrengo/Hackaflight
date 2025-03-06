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
        <div className='bg-[#083059] p-8 text-white text-center max-h-fit mx-auto'>
            <h2 className='text-2xl font-bold mb-6'>
                <Link to='/ratings'>Lo que piensan nuestros usuarios...</Link>
            </h2>
            <div className='mb-6'>
                {/* Calculamos (hook) y Mostramos la valoración media y el total */}
                <p className='text-xl mb-2'>
                    {avgRating}⭐ de {totalRatings} valoraciones
                </p>

                {/* Indicamos cuántas valoraciones se muestran del total */}
                <p>Mostrando 3 de {ratings.length} valoraciones</p>
            </div>
            <div className='w-full px-4'>
                <ul className='space-y-4 w-full max-w-2xl mx-auto'>
                    {/* Mostramos los 3 más recientes */}
                    {topRatings && topRatings.length > 0 ? (
                        topRatings.slice(0, 3).map((rating) => (
                            <div
                                key={rating.id}
                                className='bg-white p-4 rounded-lg shadow-sm text-[#083059]'
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
