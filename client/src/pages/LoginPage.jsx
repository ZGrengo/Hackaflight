import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext.js';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

const { VITE_API_URL } = import.meta.env;

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, authLoginState } = useAuthContext();
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
            <main className='flex flex-col items-center pt-[50px] bg-[#e5f7ff]'>
                <h2>Log in</h2>
                <form
                    onSubmit={handleLogin}
                    className='flex flex-col gap-[30px] p-[30px] font-bold'
                >
                    <label htmlFor='email'>Correo Electrónico:</label>
                    <input
                        className='w-full py-[8px] px-[20px] pr-[40px] text-[20px] rounded-[30px] border-none bg-[#083059]
                     text-[white] transition-all duration-[300ms] ease-in-out focus:border-blue-500 focus:outline-[#3951aa]'
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

                    <label htmlFor='pass'>Contraseña:</label>
                    <input
                        className='w-full py-[8px] px-[20px] pr-[40px] text-[20px] rounded-[30px] border-none bg-[#083059] 
                    text-[white] transition-all duration-[300ms] ease-in-out focus:border-blue-500 focus:outline-[#3951aa]'
                        type='password'
                        id='pass'
                        value={formInputs.password}
                        onChange={(e) =>
                            setFormInputs({
                                ...formInputs,
                                password: e.target.value,
                            })
                        }
                        autoComplete='password'
                        required
                    />
                    <div className='flex gap-[4]'>
                        <Link
                            className='no-underline'
                            to='/users/password/recover/request'
                            style={{ paddingLeft: '20px', color: '#179dd9' }}
                        >
                            Recuperar Contraseña
                        </Link>
                        <Link
                            className='no-underline'
                            to='/register'
                            style={{ paddingLeft: '80px', color: '#179dd9' }}
                        >
                            Registrate!
                        </Link>
                    </div>
                    <button
                        disabled={loading}
                        className='w-full py-[8px] px-[30px] pr-[40px] text-[20px] rounded-[30px] border-none bg-[#083059]
                    text-[white] transition-all duration-[300ms] ease-in-out ml-[25px] mt-[20px]  focus:border-blue-500 focus:outline-[#179dd9] hover:bg-[#179dd9]'
                    >
                        Log in
                    </button>
                </form>
            </main>
        </>
    );
};

export default LoginPage;
