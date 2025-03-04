//importamos las dependencias que permiten validar las props
import PropTypes from 'prop-types';

//importamos la dependencia que permite formatear fechas
import moment from 'moment';

//iniciamos el componente
const RatingListItem = ({ title, rate, comment, createdAt, username }) => {
    return (
        <li>
            <header>
                <h3 className='font-bold'>{title}</h3>
            </header>
            <div className='p-2'>
                <p className='font-semibold'>Valoración: {'⭐'.repeat(rate)}</p>
                <p>
                    <span className='font-semibold'>Descripción:</span>{' '}
                    {comment}
                </p>
            </div>
            <footer className='ml-2'>
                <p>Autor/a: {username}</p>
                <p className='font-light'>
                    Creada el {''}
                    {moment(createdAt).format('DD/MM/YYYY [a las] HH:mm')}
                </p>
            </footer>
        </li>
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
