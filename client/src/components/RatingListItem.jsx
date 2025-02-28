//importamos las dependencias que permiten validar las props
import PropTypes from 'prop-types';

//importamos los componentes
import { Link } from 'react-router-dom';

//importamos la dependencia que permite formatear fechas
import moment from 'moment';

//iniciamos el componente
const RatingListItem = ({
    ratingId,
    title,
    rate,
    comment,
    createdAt,
    username,
}) => {
    return (
        <li>
            <Link to={`/ratings/${ratingId}`}>
                <header>
                    <h3>{title}</h3>
                </header>
                <div>
                    <p>Valoración: {rate}</p>
                    <p>Descripción: {comment}</p>
                </div>
                <footer>
                    <p>Autor/a:{username}</p>
                    <p>
                        Creada el {''}
                        {moment(createdAt).format('DD/MM/YYYY [a las] HH:mm')}
                    </p>
                </footer>
            </Link>
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
