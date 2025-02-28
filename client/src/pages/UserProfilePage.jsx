// Importamos los hooks.
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos la función que muestra un mensaje al usuario.
import toast from 'react-hot-toast';
// Importamos el contexto de autorización.
import useAuthContext from '../hooks/useAuthContext.js';
//importamos momento para configurar la fehca entregada por el servidor
import moment from 'moment';

// Importamos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;
// Inicializamos el componente
const UserProfilePage = () => {
    // obtenemos el toquen de autenticación del contexto
    const { authToken } = useAuthContext();
    const navigate = useNavigate();

    // Para almacenar los datos del usuario
    const [userData, setUserData] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);

    // obtenemos los datos del usuario al cargar la página
    useEffect(() => {
        // si no hay toquen, regresamos a la página de login
        if (!authToken) {
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            setProfileLoading(true);
            try {
                // Realizamos una precisión a la API para la información del usuario
                const response = await fetch(
                    `${VITE_API_URL}/api/users/profile`,
                    { headers: { Authorization: `${authToken}` } },
                );

                // Si no hay respuesta, se lanza un error
                if (!response.ok)
                    throw new Error(
                        `Error ${response.status}: ${response.statusText}`,
                    );

                const data = await response.json();
                setUserData(data.data.user);
            } catch (error) {
                toast.error(
                    error.message || 'Error al obtener los datos del usuario',
                );
            } finally {
                setProfileLoading(false);
            }
        };

        fetchUserData();
    }, [authToken, navigate]);

    // Mostramos mensajes de perfil cargando...
    if (profileLoading) {
        return <p>Cargando perfil...</p>;
    }
    // Si el perfil no carga, mostramos un error.
    if (!userData) {
        return <p>No se pudo cargar la información del usuario.</p>;
    }

    return (
        <div className="user-profile-page">
            <h2>Perfil de Usuario</h2>
            {/* Mostramos la información de usuario */}
            <div className="user-info">
                <img
                    src={userData.avatar || '/default-avatar.png'}
                    alt="Avatar"
                />
                <p>
                    <strong>Nombre:</strong> {userData.firstName}{' '}
                    {userData.lastName}
                </p>
                <p>
                    <strong>Usuario:</strong> {userData.username}
                </p>
                <p>
                    <strong>Email:</strong> {userData.email}
                </p>
                <p>
                    <strong>Edad:</strong>{' '}
                    {moment().diff(moment(userData.birthdate), 'years')} años
                </p>
                <p>
                    <strong>Miembro desde:</strong>{' '}
                    {moment(userData.createdAt).format('DD/MM/YYYY')}
                </p>
            </div>
            <button onClick={() => navigate('/users/profile/edit')}>
                Editar perfil
            </button>
            <button onClick={() => navigate('/Users/Profile/password')}>
                Cambiar contraseña
            </button>
        </div>
    );
};

export default UserProfilePage;
