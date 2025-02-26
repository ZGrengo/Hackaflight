// Iportamos PropTypes para validar los tipos de datos de las propiedades
import PropTypes from 'prop-types';

// Este componente recibe un array de comentarios y muestra los 3 primeros
const RatingsSummary = ( { topComments } ) => {
    return (
        <div >
            <h2 >Lo que piensan nuestros usuarios...</h2>
            {topComments.slice( 0, 3 ).map( ( comment, index ) => (
                <div key={index} >
                    <p ><strong>{comment.user}:</strong> {comment.comment}</p>
                    <p >Rating: {comment.rating}/5</p>
                </div>
            ) )}
        </div>
    );
};

// Validamos las propiedades
RatingsSummary.propTypes = {
    topComments: PropTypes.arrayOf(
        PropTypes.shape( {
            user: PropTypes.string.isRequired,
            comment: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired
        } )
    ).isRequired
};

// Exportamos el componente
export default RatingsSummary;