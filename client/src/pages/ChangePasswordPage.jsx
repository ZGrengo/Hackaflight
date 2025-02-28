// Importamos los hooks.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos la función que muestra un mensaje al usuario.
import toast from 'react-hot-toast';
// Importamos el contexto de autorización.
import useAuthContext from '../hooks/useAuthContext.js';
// Importamos la URL de nuestra API.
const { VITE_API_URL } = import.meta.env;
// Inicializamos el componente
const ChangePasswordPage = () => {
    // obtenemos el toquen de autenticación del contexto
    const { authToken } = useAuthContext();
    const navigate = useNavigate();
    // para el cambio de contraseña
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // cargando
    const [loading, setLoading] = useState(false);

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

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || 'Error al actualizar la contraseña',
                );
            }
            // si todo está bien, muestra un mensaje de éxito y se limpian los campos del formulario
            toast.success('Contraseña actualizada correctamente');
            // al hacer el cambio de contraseña, redirigimos al perfil
            navigate('/users/profile');
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="change-password-page">
            <h2>Cambiar Contraseña</h2>
            <form onSubmit={handlePasswordChange}>
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
                    {loading ? 'Actualizando...' : 'Cambiar contraseña'}
                </button>
            </form>
            <button
                onClick={() => navigate('/users/profile')}
                disabled={loading}
            >
                Cancelar
            </button>
        </div>
    );
};

export default ChangePasswordPage;
