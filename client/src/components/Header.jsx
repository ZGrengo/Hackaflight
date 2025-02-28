import { Link } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

// Inicializamos el componente
const Header = () => {
    const { authUser, authLogoutState } = useAuthContext();

    return (
        <header className='flex justify-around items-center bg-[#25779b] w-full box-border'>
            <nav className='flex gap-4 max-w-full'>
                <Link to='/'>
                    <img
                        src='/public/logo.svg'
                        alt='home'
                        className='rounded-full w-1/2'
                    />
                </Link>
            </nav>
            <nav className='flex gap-[18px] justify-between items-between w-1/12'>
                <Link to='/favorites'>
                    <img
                        src='/public/corazon.png'
                        alt='favoritos'
                        className='w-8'
                    />
                </Link>

                {authUser ? (
                    <>
                        <Link to='/users/profile'>
                            <img src='' alt='profile' className='w-8' />
                        </Link>
                        <button onClick={authLogoutState}>
                            <img
                                src='/public/logout.png'
                                alt='logout'
                                className='w-8'
                            />
                        </button>
                    </>
                ) : (
                    <>
                        <Link to='/login'>
                            <img
                                src='/public/Users.png'
                                alt='login'
                                className='w-8'
                            />
                        </Link>
                        <Link to='/register'>
                            <button className='w-8'>Register</button>
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

// Exportamos el componente
export default Header;
