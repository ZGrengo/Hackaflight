//importamos las dependencias que permiten validar las props
import PropTypes from 'prop-types';

//importamos la dependencia que permite formatear fechas
import moment from 'moment';

//iniciamos el componente
const RatingListItem = ({ title, rate, comment, createdAt, username }) => {
    return (
        <>
            <div className='bg-white p-4 rounded-lg shadow-md border-l-4 border-dark-blue hover:scale-[1.008]'>
                <div className='text-right'>
                    <p>{'⭐'.repeat(rate)}</p>
                </div>
                <div className='text-left mb-3'>
                    <h3 className='font-bold text-xl text-dark-blue'>
                        {title}
                    </h3>
                </div>

                <div className='text-center mb-5'>
                    <p className='text-base text-dark-blue'>{comment}</p>
                </div>
                <div className='flex flex-col items-end'>
                    <p className='font-light text-sm text-medium-blue'>
                        {moment(createdAt).format('DD/MM/YYYY [a las] HH:mm')}
                    </p>
                    <p className='text-sm text-accent-blue'>@{username}</p>
                </div>
            </div>
        </>
    );
};

//validamos las propos
RatingListItem.propTypes = {
    ratingId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
};
export default RatingListItem;
