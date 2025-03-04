import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../components/Header';

const { VITE_API_URL } = import.meta.env;

const SendRecoverPassPage = () => {
    const { authUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendRecoveryPassCode = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const res = await fetch(
                `${VITE_API_URL}/api/users/password/reset`,
                {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                    }),
                },
            );

            const body = await res.json();
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            toast.success(body.message, {
                id: 'sendRecoverPass',
                duration: 10000,
            });

            navigate('/');
        } catch (err) {
            toast.error(err.message, {
                id: 'sendRecoverPass',
            });
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
                <h2>Recuperacion de contraseña</h2>
                <p>Por favor introduce el correo electronico registrado.</p>
                <form
                    onSubmit={handleSendRecoveryPassCode}
                    className='flex flex-col gap-[30px] p-[30px] font-bold'
                >
                    <label htmlFor='email'>Email:</label>
                    <input
                        className='w-full py-[8px] px-[20px] pr-[40px] text-[20px] rounded-[30px] border-none bg-[#083059]
                     text-[white] transition-all duration-[300ms] ease-in-out focus:border-blue-500 focus:outline-[#3951aa]'
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='new-password'
                        autoFocus
                        required
                    />

                    <button
                        className='w-full py-[8px] px-[30px] pr-[40px] text-[20px] rounded-[30px] border-none bg-[#083059]
                    text-[white] transition-all duration-[300ms] ease-in-out ml-[25px] mt-[20px]  focus:border-blue-500 focus:outline-[#179dd9] hover:bg-[#179dd9]'
                        disabled={loading}
                    >
                        Send
                    </button>
                </form>
            </main>
        </>
    );
};

export default SendRecoverPassPage;
