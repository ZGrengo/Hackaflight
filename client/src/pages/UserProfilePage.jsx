// Importamos los hooks.
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos la función que muestra un mensaje al usuario.
import toast from 'react-hot-toast';
// Importamos el contexto de autorización.
import useAuthContext from '../hooks/useAuthContext.js';
// Importamos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;
// Inicializamos el componente
const UserProfilePage = () => {
    // obtenemos el toquen de autenticación del contexto
    const { authToken } = useAuthContext();
    const navigate = useNavigate();

    // Para almacenar los datos del usuario
    const [userData, setUserData] = useState(null);

    // para el cambio de contraseña
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // cargando
    const [loading, setLoading] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);

    // obtenemos los datos del usuario al cargar la página
    useEffect(() => {
        // si no hay toquen, regresamos a la página de login
        if (!authToken) {
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
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

    // Cambio de contraseña
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        // Doble validación de la nueva contraseña
        if (newPassword !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
        try {
            setLoading(true);
            // realizamos la petición a la API para la actualización de contraseña
            const response = await fetch(`${VITE_API_URL}/api/users/password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${authToken}`,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            // Si la respuesta no es positiva, se lanza un error
            const result = await response.json();
            if (!response.ok) {
                throw new Error(
                    result.message || 'Error al actualizar la contraseña',
                );
            }
            // si todo está bien, muestra un mensaje de éxito y se limpian los campos del formulario
            toast.success('Contraseña actualizada correctamente');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

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

            {/* Muestra la información de usuario*/}
            <div className="user-info">
                <img src={userData.avatar} alt="Avatar" />
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
            </div>

            {/* Formulario para cambiar la contraseña*/}
            <form onSubmit={handlePasswordChange}>
                <h3>Cambiar Contraseña</h3>
                {/* Campo oculto para el nombre de usuario */}
                <input
                    type="text"
                    value={userData.username}
                    readOnly
                    style={{ display: 'none' }}
                    autoComplete="username"
                />
                <div>
                    <label>Contraseña Actual:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                </button>
            </form>
        </div>
    );
};

export default UserProfilePage;
