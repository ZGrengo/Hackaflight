// importamos los Hooks necesarios.

// Importamos los componentes necesarios.
import { Link } from 'react-router-dom';

// Importamos el contexto de autenticación.

// Importamos la URL de nuestra API.

// Inicializamos el componente
const Footer = () => {
    return (
        <>
            <footer className='bg-[#083059] text-xs text-white py-8 px-4 mt-auto'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {/* Sección de contacto */}
                        <div className='space-y-4'>
                            <h3 className='font-bold text-sm mb-3'>
                                Contactar
                            </h3>
                            <p className='hover:text-[#179DD9] transition-colors'>
                                Email: contacto@hackafly.com
                            </p>
                            <p>Teléfono: +35 123 456 789</p>
                        </div>

                        {/* Sección de ayuda al cliente */}
                        <div className='space-y-4'>
                            <h3 className='font-bold text-sm mb-3'>
                                Sobre nosotros
                            </h3>
                            <ul className='space-y-2'>
                                <li>
                                    <Link
                                        to='/about'
                                        className='hover:text-[#179DD9] transition-colors'
                                    >
                                        Acerca de HackaFlight
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/team'
                                        className='hover:text-[#179DD9] transition-colors'
                                    >
                                        Nuestro Equipo
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/faq'
                                        className='hover:text-[#179DD9] transition-colors'
                                    >
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Sección de información y redes sociales */}
                        <div className='space-y-4'>
                            <div className='space-y-4'>
                                <h3 className='font-bold text-sm mb-3'>
                                    Legal
                                </h3>
                                <ul className='space-y-2'>
                                    <li>
                                        <Link
                                            to='/cookies'
                                            className='hover:text-[#179DD9] transition-colors'
                                        >
                                            Configuración de las cookies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/privacidad'
                                            className='hover:text-[#179DD9] transition-colors'
                                        >
                                            Política de privacidad
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/términos'
                                            className='hover:text-[#179DD9] transition-colors'
                                        >
                                            Términos y Condiciones
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='pt-4'>
                                <ul className='flex space-x-4'>
                                    <li>
                                        <Link
                                            to='https://facebook.com'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            <img
                                                src='/public/facebook.png'
                                                alt='Facebook'
                                                className='w-8 h-8 hover:opacity-80 transition-opacity rounded'
                                            />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='https://instagram.com'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            <img
                                                src='/public/instagram.png'
                                                alt='Instagram'
                                                className='w-8 h-8 hover:opacity-80 transition-opacity'
                                            />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='https://x.com'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            <img
                                                src='/public/xlogo.png'
                                                alt='X'
                                                className='w-8 h-8 hover:opacity-80 transition-opacity'
                                            />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Copyright section */}
                    <div className='border-t border-gray-600 pt-4 mt-8'>
                        <p className='text-sm text-gray-300 text-center'>
                            Copyright © 2025 HackaFligth Company S.L. Todos los
                            derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

// Exportamos el componente
export default Footer;
