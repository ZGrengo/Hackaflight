// Importamos los hooks.
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos la función que muestra un mensaje al usuario.
import toast from 'react-hot-toast';
// Importamos el contexto de autorización.
import useAuthContext from '../hooks/useAuthContext.js';
//importamos momento para configurar la fehca entregada por el servidor
import moment from 'moment';
import Header from '../components/Header.jsx';

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
        return (
            <p className='text-center mt-8 text-gray-600'>
                {' '}
                Cargando perfil...
            </p>
        );
    }
    // Si el perfil no carga, mostramos un error.
    if (!userData) {
        return (
            <p className='text-center mt-8 text-gray-600'>
                No se pudo cargar la información del usuario.
            </p>
        );
    }

    return (
        <>
            <Header />
            <main className='bg-[#E5f7ff] min-h-screen flex itenms-center justify-center p-4'>
                <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-lg'>
                    <h2 className='text-2x1 font-bold text-[#083059] text-center mb-4'>
                        Perfil de Usuario
                    </h2>
                    {/* Mostramos la información de usuario */}
                    <div className='flex flex-col items-center space-y-4'>
                        <img
                            src={
                                userData.avatar !== null
                                    ? `${VITE_API_URL}/uploads/${userData.avatar}`
                                    : '/default-avatar.png'
                            }
                            alt='Avatar'
                            className='w-24 h-24 rounded-full object-cover shadow-lg transition transform hover:scale-105'
                        />
                        <div className='w-full'>
                            <p className='text-[#083059] text-sm'>
                                <strong>Nombre:</strong> {userData.firstName}{' '}
                                {userData.lastName}
                            </p>
                            <p className='text-[#083059] text-sm'>
                                <strong>Usuario:</strong> {userData.username}
                            </p>
                            <p className='text-[#083059] text-sm'>
                                <strong>Email:</strong> {userData.email}
                            </p>
                            <p className='text-[#083059] text-sm'>
                                <strong>Edad:</strong>{' '}
                                {moment().diff(
                                    moment(userData.birthdate),
                                    'years',
                                )}{' '}
                                años
                            </p>
                            <p className='text-[#083059] text-sm'>
                                <strong>Miembro desde:</strong>{' '}
                                {moment(userData.createdAt).format(
                                    'DD/MM/YYYY',
                                )}
                            </p>
                        </div>
                    </div>

                    <div className='mt-4 space-y-3'>
                        <button
                            onClick={() => navigate('/users/profile/edit')}
                            className='w-full py-2 font-bold rounded-md transition bg-[#083059] text-white hover:bg-[#179DD9]'
                        >
                            Editar perfil
                        </button>
                        <button
                            onClick={() => navigate('/Users/Profile/password')}
                            className='w-full py-2 font-bold rounded-md transition bg-[#083059] text-white hover:bg-[#179DD9]'
                        >
                            Cambiar contraseña
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default UserProfilePage;
