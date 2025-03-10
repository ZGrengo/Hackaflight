import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext.js';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { Eye, EyeOff } from 'lucide-react';

const { VITE_API_URL } = import.meta.env;

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, authLoginState } = useAuthContext();
    const [showPassword, setShowPassword] = useState(false);
    const [formInputs, setFormInputs] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const res = await fetch(`${VITE_API_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formInputs),
            });

            const body = await res.json();

            if (body.status === 'error') {
                throw new Error(body.message);
            }

            authLoginState(body.data.token);
            toast.success('Bienvenid@!');
        } catch (err) {
            toast.error(err.message),
                {
                    id: 'login',
                };
        } finally {
            setLoading(false);
        }
    };

    if (authUser) {
        return <Navigate to='/' />;
    }

    return (
        <>
            <Header />
            <main className='bg-[#E5F7FF] flex items-center justify-center min-h-screen p-4'>
                <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                    <h2 className='text-2xl font-bold text-[#083059] text-center mb-6'>
                        Iniciar sesión
                    </h2>
                    <form
                        onSubmit={handleLogin}
                        className='flex flex-col gap-[30px] p-[30px] font-bold'
                    >
                        <label
                            htmlFor='email'
                            className='block text-[#083059] font-medium'
                        >
                            Correo Electrónico
                        </label>
                        <input
                            className='w-full p-3 border border-[#3951AA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#179DD9]'
                            type='email'
                            id='email'
                            value={formInputs.email}
                            onChange={(e) =>
                                setFormInputs({
                                    ...formInputs,
                                    email: e.target.value,
                                })
                            }
                            autoComplete='email'
                            autoFocus
                            required
                        />
                        <label
                            htmlFor='pass'
                            className='block text-[#083059] font-medium'
                        >
                            Contraseña
                        </label>
                        <div className='relative'>
                            <input
                                className='w-full p-3 pr-10 border border-[#3951AA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#179DD9]'
                                type={showPassword ? 'text' : 'password'}
                                id='pass'
                                value={formInputs.password}
                                onChange={(e) =>
                                    setFormInputs({
                                        ...formInputs,
                                        password: e.target.value,
                                    })
                                }
                                autoComplete='current-password'
                                required
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute inset-y-0 right-3 flex items-center text-[#3951AA] hover:text-[#179DD9]'
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                        <div className='text-center text-[#083059] '>
                            <Link
                                className='text-[#3951AA] font-bold hover:underline'
                                to='/users/password/recover/request'
                            >
                                Recuperar Contraseña
                            </Link>
                        </div>
                        <button
                            disabled={loading}
                            className={`w-full py-3 font-bold rounded-md transition 
                                ${
                                    loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[#179DD9] text-white hover:bg-[#083059]'
                                }`}
                        >
                            {loading ? 'Iniciando...' : 'Iniciar sesión'}
                        </button>
                        <div className='text-center text-[#083059]'>
                            <p>
                                ¿Ya tienes cuenta?
                                <Link
                                    to='/register'
                                    className='text-[#3951AA] pl-2 hover:underline'
                                >
                                    ¡Registrate!
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default LoginPage;
