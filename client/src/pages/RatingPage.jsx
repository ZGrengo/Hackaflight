//importamos el contexto de autorización
import { AuthContext } from '../contexts/AuthContext';

//importamos hooks
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

//importamos dependencias
import toast from 'react-hot-toast';

//importamos la variables de entorno
const { VITE_API_URL } = import.meta.env;

//Iniciamos componente
const RatingPage = () => {
    //obtenemos el token de autorización
    const { authToken, authUser } = useContext(AuthContext);

    //obtenemos navigate
    const navigate = useNavigate();

    //declaramos una variable en el State para almacenar cada input
    const [title, setTitle] = useState('');
    const [rate, setRate] = useState('');
    const [comment, setComment] = useState('');

    //declaramos la variable para almacenar el fetch
    const [loading, setLoading] = useState(false);

    //función que maneja el envío del evento
    const handleRating = async (e) => {
        try {
            //prevenimos el comportamiento por defecto del formulario
            e.preventDefault();

            //indicamos que da comienzo el fetch
            setLoading(true);

            //Obtenemos la respuesta
            const res = await fetch(`${VITE_API_URL}/api/users/ratings`, {
                method: 'POST',
                headers: { Authorization: authToken },
                body: JSON.stringify({ title, rate, comment }),
            });

            //obtenemos el body
            const body = await res.json();

            //si hay algún error lo lanzamos
            if (body.status === 'error') {
                throw new Error(body.message);
            }
            //si todo va bien
            toast.success(body.message, {
                id: 'rating',
                duration: 5000,
            });

            //redirigimos al home
            navigate('/');
        } catch (err) {
            toast.error(err.message, { id: 'rating', duration: 5000 });
        } finally {
            setLoading(false);
        }
    };
    //si no estamos logueados, redirigimos a la pagina principal
    if (!authUser) {
        return <Navigate to="/login" />;
    }
    return (
        <main>
            <h2>Déjanos un comentario!</h2>
            <p>
                Ayúdanos a mejorar nuestra plataforma para poder llevarte cada
                día más lejos al mejor precio.
            </p>
            <section>
                <form onSubmit={handleRating}>
                    <div>
                        <label htmlFor="title">Título:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="rate">Valoración:</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            id="rating"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="comment">Descripción:</label>
                        <textarea
                            name="comment"
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        >
                            Déjanos tu comentario
                        </textarea>

                        <button disabled={loading}>Enviar valoración</button>
                    </div>
                </form>
            </section>
            <section>
                {/*Listado de valoraciones de más reciente a menos */}
            </section>
        </main>
    );
};

export default RatingPage;
