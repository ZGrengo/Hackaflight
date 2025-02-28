// Importamos los hooks.
import { useState, useEffect, useRef } from 'react';
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
const EditProfilePage = () => {
    // obtenemos el toquen de autenticación del contexto
    const { authToken } = useAuthContext();
    const navigate = useNavigate();

    // Para almacenar los datos del usuario
    const [userData, setUserData] = useState(null);

    const [firstName, SetFirstName] = useState('');
    const [lastName, SetLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    // cargando
    const [loading, setLoading] = useState(false);
    const [profileLoading, setProfileLoading] = useState(true);

    const inputFileRef = useRef(null);
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
                // Realizamos una petición a la API para la información del usuario
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
                const user = data.data.user;
                setUserData(user);

                SetFirstName(user.firstName);
                SetLastName(user.lastName);
                setUsername(user.username);
                setEmail(user.email);
            } catch (error) {
                toast.error(
                    error.message || 'Error al cargar los datos del usuario',
                );
            } finally {
                setProfileLoading(false);
            }
        };

        fetchUserData();
    }, [authToken, navigate]);

    const handleAvatarChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData();
            formData.append('avatar', e.target.files[0]);

            try {
                const response = await fetch(
                    `${VITE_API_URL}/api/users/avatar`,
                    {
                        method: 'PUT',
                        headers: {
                            Authorization: `${authToken}`,
                        },
                        body: formData,
                    },
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || 'Error al actualizar el avatar',
                    );
                }
                toast.success('Avatar actualizado');
                // Actualizamos el avatar en el estado
                setUserData({ ...userData, avatar: result.data.user.avatar });
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        }
    };

    // Cambio de contraseña
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        // Doble validación de la nueva contraseña
        try {
            setLoading(true);
            // realizamos la petición a la API para la actualización de contraseña
            const response = await fetch(`${VITE_API_URL}/api/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${authToken}`,
                },
                body: JSON.stringify({ firstName, lastName, username, email }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || 'Error al actualizar el perfil',
                );
            }
            // si todo está bien, muestra un mensaje de éxito y se limpian los campos del formulario
            toast.success('Perfil Actualizado');
            // Actualizamos el perfil y redirigimos a la pagina de perfil
            navigate('/users/profile');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Mostramos mensajes de perfil cargando...
    if (profileLoading) {
        return <p>Cargando datos...</p>;
    }
    // Si el perfil no carga, mostramos un error.
    if (!userData) {
        return <p>Error al cargar los datos del usuario.</p>;
    }
    // formulario para editar el perfil
    return (
        <div className='user-profile-page'>
            <h2>Editar Perfil</h2>
            <div>
                <img
                    src={
                        userData.avatar !== null
                            ? `${VITE_API_URL}/uploads/${userData.avatar}`
                            : '/default-avatar.png'
                    }
                    alt='Avatar'
                />
                <br />
                <button
                    type='button'
                    onClick={() => inputFileRef.current.click()}
                >
                    Cambiar Avatar
                </button>
                <input
                    type='file'
                    ref={inputFileRef}
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                    accept='image/*'
                />
            </div>
            <form onSubmit={handleProfileUpdate}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e) => SetFirstName(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e) => SetLastName(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Usuario:</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                {/* la edad no sera modificable (campo deshabilitado)*/}
                <div>
                    <label>Edad:</label>
                    <input
                        type='text'
                        value={`${moment().diff(moment(userData.birthdate), 'years')} años`}
                        disabled
                    />
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? 'Actualizando...' : 'Actualizar'}
                </button>
                <button
                    type='button'
                    onClick={() => navigate('/users/profile')}
                    disabled={loading}
                >
                    Cancelar
                </button>
            </form>
            <hr />
            <button onClick={() => navigate('/users/profile/password')}>
                Cambiar Contraseña
            </button>
        </div>
    );
};

export default EditProfilePage;
