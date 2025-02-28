//importamos los hooks
import { useEffect, useState } from 'react';

//importamos componentes
import toast from 'react-hot-toast';

//importamos variables de entorno
const { VITE_API_URL } = import.meta.env;

//iniciamos el hook
const useAvgRating = () => {
    //Declaramos las variables en el State para almacenar la media y el total de las valoraciones
    const [avgRating, setAvgRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);
    //obtenemos las entradas cuando se monte el componente
    useEffect(() => {
        //iniciamos la función
        const fetchAvgRating = async () => {
            try {
                //obtenemos la respuesta
                const res = await fetch(`${VITE_API_URL}/api/ratings/avg`);

                //obtenemos  el body
                const body = await res.json();

                //si hay un error lo lanzamos
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                //Actualizamos el State con la media y el total de las valoraciones
                setAvgRating(body.data.average_rating);
                setTotalRatings(body.data.total_ratings);
            } catch (err) {
                toast.error(err.message, {
                    id: 'avgRating',
                    duration: 5000,
                });
            }
        };
        //llamamos a la función
        fetchAvgRating();
    }, []);
    //Devolvemos los datos necesarios
    return { avgRating, totalRatings };
};
export default useAvgRating;
