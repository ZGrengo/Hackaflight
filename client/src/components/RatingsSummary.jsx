import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RatingListItem from './RatingListItem';
import { Link } from 'react-router-dom';

const RatingsSummary = ({ ratings }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoSlide] = useState(true);

    useEffect(() => {
        if (autoSlide) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % ratings.length);
            }, 5000); 
            return () => clearInterval(interval);
        }
    }, [autoSlide, ratings.length]);

    const nextRating = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ratings.length);
    };

    const prevRating = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + ratings.length) % ratings.length);
    };

    const currentRating = ratings[currentIndex % ratings.length]; // Ensuring we're within bounds

    return (
        <div className='p-7'>
            <h2 className='text-3xl font-heading font-light mb-4 text-dark-blue border-b-2 text-center border-accent-blue pb-2'>
                <Link to='/ratings'>LO QUE PIENSAN NUESTROS USUARIOS</Link>
            </h2>

            <div className='flex items-center justify-between w-full max-w-2xl mx-auto'>
                <button onClick={prevRating} className='text-4xl text-dark-blue hover:text-accent-blue mx-4 sm:inline-block hidden'>
                    &#8592;
                </button>

                <div className='text-center flex-1'>
                    <h3 className='font-bold text-xl text-dark-blue mb-4'>
                        Valoración {currentIndex + 1}
                    </h3>

                    {/* Check if there's a valid currentRating */}
                    {currentRating ? (
                        <RatingListItem
                            ratingId={currentRating.id}
                            title={currentRating.title}
                            rate={currentRating.rate}
                            comment={currentRating.comment}
                            username={currentRating.username}
                            createdAt={currentRating.createdAt}
                        />
                    ) : (
                        <p>No hay valoraciones disponibles</p>
                    )}
                </div>

                <button onClick={nextRating} className='text-4xl text-dark-blue hover:text-accent-blue mx-4 sm:inline-block hidden'>
                    &#8594;
                </button>
            </div>
            <div className='mt-2'>
                <p className='text-sm text-medium-blue text-center'>
                    Mostrando {currentIndex + 1} de {ratings.length} valoraciones
                </p>
            </div>
        </div>
    );
};

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

export default RatingsSummary;