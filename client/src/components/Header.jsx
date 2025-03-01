import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

// Inicializamos el componente
const Header = () => {
    const { authUser, authLogoutState } = useAuthContext();

    return (
        <header className='flex sticky top-0 justify-around items-center bg-[#25779b] w-full p-4 z-50'>
            {/* Logo */}
            <nav className='flex gap-4 max-w-full'>
                <Link to='/'>
                    <img
                        src='/public/logo.svg'
                        alt='home'
                        className='rounded-full w-1/2'
                    />
                </Link>
            </nav>
            {/* Menú de navegación */}

            {authUser ? (
                <>
                    <div className='flex items-center gap-12'>
                        <Link to='/users/profile' className='mx-4'>
                            <img
                                src='/public/users.png'
                                alt='profile'
                                className='w-8'
                            />
                        </Link>

                        <Link to='/users/ratings' className='mx-4'>
                            <img
                                src='/public/opinion.png'
                                alt='ratings'
                                className='w-8'
                            />
                        </Link>
                        <button onClick={authLogoutState} className='mx-4'>
                            <img
                                src='/public/logout.png'
                                alt='logout'
                                className='w-8'
                            />
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className='flex items-center gap-12'>
                        <Link to='/login' className='mx-4'>
                            <img
                                src='/public/Users.png'
                                alt='login'
                                className='w-8'
                            />
                        </Link>
                        <Link
                            to='/register'
                            className='mx-4'
                        >
                            <img
                                src='/public/register.png'
                                alt='register'
                                className='w-8'
                            />
                        </Link>

                        <Link to='/ratings' className='mx-4'>
                            <img
                                src='/public/opinion.png'
                                alt='ratings'
                                className='w-8'
                            />
                        </Link>
                    </div>
                </>
            )}
        </header >
    );
};

// Exportamos el componente
export default Header;