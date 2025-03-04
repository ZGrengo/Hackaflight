import { useEffect } from 'react';
import './LogoAnimation.css';

// Componente que se encarga de la animación del logo
const LogoAnimation = () => {
    useEffect(() => {
        const paths = document.querySelectorAll('.path');
        const firstH2 = document.getElementById('first-h2');
        const secondH2 = document.getElementById('second-h2');

        // Duración de la animación
        const typingDuration = 1000;
        const cursorBlinkDelay = 500;

        // Función que se encarga de escribir el texto
        const typeText = (element, text, duration, callback) => {
            if (element.dataset.typing) return; // Prevent typing if already typing
            element.dataset.typing = true;
            let index = 0;
            const interval = duration / text.length;

            // Inicio de la animación de escritura
            const typingInterval = setInterval(() => {
                // Si el índice es menor al tamaño del texto
                if (index < text.length) {
                    // Agregar el texto al elemento
                    element.textContent += text[index];
                    index++;
                } else {
                    // Si ya se terminó de escribir el texto
                    clearInterval(typingInterval);
                    if (callback) callback();
                }
            }, interval);
        };

        // Función que se encarga de animar el logo
        const animateLogo = (paths) => {
            paths.forEach((path, index) => {
                setTimeout(() => {
                    // Agregar la animación al path
                    path.style.animationPlayState = 'running';
                    // Agregar la opacidad al path
                    path.style.opacity = 1;
                }, index * 500);
            });
        };

        // Iniciar la animación
        typeText(firstH2, 'HACK', typingDuration, () => {
            setTimeout(() => {
                // Agregar el borde derecho al primer h2
                firstH2.style.borderRight = 'none';
                secondH2.style.borderRight = '0.15em solid orange';

                // Iniciar la animación del segundo h2
                typeText(secondH2, 'FLIGHT', typingDuration, () => {
                    setTimeout(() => {
                        // Agregar la animación al logo
                        console.log('Starting logo animation after delay');
                        animateLogo(paths);
                        // Agregar la clase de animación al segundo h2
                        secondH2.classList.add('animate-blink-caret'); // Add blinking cursor class
                    }, 500);
                });
            }, cursorBlinkDelay);
        });
    }, []);

    // Renderizado del componente
    return (
        <section className='logo-animation-section relative flex flex-col items-center justify-center bg-medium-blue h-screen'>
            <h2
                id='first-h2'
                className='relative bottom-8 z-10 text-5xl font-bold text-white mb-4'
            ></h2>
            <div className='logo-container absolute z-[1] flex items-center justify-center w-80 h-80'>
                <svg
                    className='responsive-logo w-full h-full'
                    viewBox='0 0 372 345'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <g transform='translate(186, 172.5) scale(0.25) translate(-186, -172.5)'>
                        {/* Fondo blanco */}
                        <path
                            d='M333 171.5C333 252.41 267.41 318 186.5 318C105.59 318 40 252.41 40 171.5C40 90.5903 105.59 25 186.5 25C267.41 25 333 90.5903 333 171.5Z'
                            fill='white'
                            className='path path1'
                        />
                        {/* Secciones de circunferencias */}
                        <path
                            d='M240.355 304.268L226.463 42.7809C226.362 40.8791 223.912 40.1815 222.824 41.7449L72.5274 257.804C71.7646 258.901 70.195 258.967 69.4122 257.884C63.1494 249.225 40.5 214.811 40.5 170C40.5 131.263 50.1225 106.693 75.0001 77C96.5644 51.2613 114.674 39.0833 147 30C177.455 21.4424 197.658 22.048 228 31C263.38 41.4386 283.904 55.0945 305.5 85C326.436 113.992 332.953 136.742 332.5 172.5C332.069 206.523 325.144 227.371 306 255.5C285.128 286.17 252.28 301.961 243.01 305.964C241.767 306.501 240.427 305.62 240.355 304.268Z'
                            fill='black'
                            className='path path2'
                        />
                        {/* Triángulo negro */}
                        <path
                            d='M101.613 287.37L197.457 146.985C198.601 145.309 201.226 146.206 201.105 148.232L191.108 315.203C191.046 316.225 190.224 317.035 189.202 317.082L180 317.5L168.5 316.5L155 314.5L142.5 311.5L131 307L119.5 301.5L109.75 295.5L102.114 290.135C101.219 289.505 100.996 288.274 101.613 287.37Z'
                            fill='black'
                            className='path path3'
                        />
                        {/* Ala derecha */}
                        <path
                            d='M257.812 192.638L257.812 192.633L248.851 55.4365C248.779 54.3346 250.283 53.9462 250.753 54.9453L285.245 128.203L322.534 207.404C322.885 208.148 322.238 208.973 321.432 208.81L274.206 199.285C272.459 198.933 270.792 200.172 270.626 201.947L264.394 268.672C264.279 269.901 262.475 269.871 262.4 268.639L257.812 192.638Z'
                            fill='white'
                            stroke='black'
                            strokeWidth='2'
                            className='path path5'
                        />
                        {/* Ala izquierda */}
                        <path
                            d='M112.888 149.998L112.891 149.994L195.593 40.1597C196.257 39.2776 195.212 38.1283 194.271 38.706L125.265 81.0689L50.6616 126.869C49.9611 127.299 50.0498 128.343 50.8128 128.649L95.532 146.57C97.1865 147.233 97.9014 149.184 97.0672 150.759L65.7029 209.982C65.1249 211.073 66.6506 212.037 67.3884 211.047L112.888 149.998Z'
                            fill='white'
                            stroke='black'
                            strokeWidth='2'
                            className='path path6'
                        />
                    </g>
                </svg>
            </div>
            <h2
                id='second-h2'
                className='relative top-8 z-10 text-5xl font-bold text-white mb-4'
            ></h2>
        </section>
    );
};

export default LogoAnimation;
