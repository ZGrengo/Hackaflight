//Importamos hooks
import { useState } from 'react';
import useRatingList from '../hooks/useRatingList';

//import useAvgRating from '../hooks/useAvgRating';

//importamos componentes
import RatingListItem from '../components/RatingListItem';
import toast from 'react-hot-toast';
import Header from '../components/Header';

//importamos variables de entorno
const { VITE_API_URL } = import.meta.env;

//iniciamos el componente
const RatingsListPage = () => {
    //Obtenemos las valoraciones usando el hook
    const { ratings, setRatings } = useRatingList();

    // Declaramos una variable en el State para cada query param.
    const [rate, setRate] = useState('');

    //Declaramos una variable en el State para indicar el fetch
    const [loading, setLoading] = useState(false);

    //Declaramos una variable en el State para actualizar el listado de valoraciones
    const [currentPage, setCurrentPage] = useState(1);
    //Definimos cuantas valoraciones queremos mostrar por página
    const ratingsPerPage = 10;

    //Calculamos el índice de la última valoración que se mostrará en la página actual
    const indexOfLastRating = currentPage * ratingsPerPage;
    //Calculamos el índice de la primera valoración que se mostrará en la página actual
    const indexOfFirstRating = indexOfLastRating - ratingsPerPage;

    //Obtenemos las valoraciones que se mostrarán en la página actual
    const currentRatings = ratings.slice(indexOfFirstRating, indexOfLastRating);

    //Si no hay valoraciones, mostramos mensaje de carga
    if (!ratings.length) return <p>No hay valoraciones disponibles</p>;

    //Obtenemos la media y el total de las valoraciones
    //const { avgRating, totalRatings } = useAvgRating();

    // Función que maneja el envío del formulario.
    const handleSearchRatings = async (e) => {
        try {
            //prevenimos el comportamiento por defecto
            e.preventDefault();

            //indicamos el inicio del fetch
            setLoading(true);

            //obtenemos una respuesta
            const res = await fetch(
                `${VITE_API_URL}/api/ratings?rating=${rate}`,
            );

            //obtenemos el body
            const body = await res.json();

            //si hay un error lo lanzamos
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            //Almacenamos las valoraciones en el State a la inversa
            setRatings(body.data.ratings);
        } catch (err) {
            toast.error(err.message);
        } finally {
            //indicamos el final del fetch
            setLoading(false);
        }
    };

    //Mostramos las valoraciones
    return (
        <>
            <Header />
            <main className='bg-[#E5F7FF] flex flex-col items-center justify-center min-h-screen p-6'>
                <section className='bg-white p-8 rounded-lg shadow-md w-full max-w-fit mx-auto'>
                    <h2 className='text-2xl font-bold text-[#083059] text-center mb-6'>
                        Todas las valoraciones
                    </h2>
                    {/* formulario de búsqueda */}
                    <form onSubmit={handleSearchRatings} className='space-y-6'>
                        <select
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className='block text-[#083059] font-medium mb-2'
                        >
                            <option value=''>Valoración</option>
                            <option value='1'>⭐</option>
                            <option value='2'>⭐⭐</option>
                            <option value='3'>⭐⭐⭐</option>
                            <option value='4'>⭐⭐⭐⭐</option>
                            <option value='5'>⭐⭐⭐⭐⭐</option>
                        </select>
                        <button
                            disabled={loading}
                            className='w-full bg-[#179DD9] text-white py-3 px-4 rounded-md hover:bg-[#3951AA] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed '
                        >
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </form>
                    {/* Listado de valoraciones */}
                    <ul className='list-none'>
                        {currentRatings.map((rating) => (
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
                    {/*Botones de la paginación */}
                    <div>
                        {Array.from({
                            length: Math.ceil(ratings.length / ratingsPerPage),
                        }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
};

export default RatingsListPage;
