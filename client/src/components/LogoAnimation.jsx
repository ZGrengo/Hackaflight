import { useEffect } from 'react';
import './LogoAnimation.css';

const LogoAnimation = () => {
    useEffect(() => {
        // Verifica si la animacion ya se ejecutó en esta sessión
        if (sessionStorage.getItem('logoAnimationPlayed')) {
            const logoAnimationSection = document.querySelector(
                '.logo-animation-section',
            );
            if (logoAnimationSection) {
                logoAnimationSection.classList.add('hidden');
            }
            return;
        }

        const paths = document.querySelectorAll('.path');
        const firstH2 = document.getElementById('first-h2');
        const secondH2 = document.getElementById('second-h2');

        const logoAnimationSection = document.querySelector(
            '.logo-animation-section',
        );

        // Duración de la animación de escritura
        const typingDuration = 1000;
        // Duración del parpadeo del cursor de escritura
        const cursorBlinkDelay = 200;

        // Función para simular el efecto de escritura
        const typeText = (element, text, duration, callback) => {
            if (element.dataset.typing) return;
            element.dataset.typing = true;
            let index = 0;
            const interval = duration / text.length;

            // Agregar cursor de escritura
            element.classList.add('typing-cursor');

            // Simular escritura
            const typingInterval = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text[index];
                    index++;
                } else {
                    // Eliminar cursor de escritura
                    clearInterval(typingInterval);
                    element.classList.remove('typing-cursor');
                    if (callback) callback();
                }
            }, interval);
        };

        // Animar logo
        const animateLogo = (paths) => {
            paths.forEach((path, index) => {
                setTimeout(() => {
                    // Agregar animación de desplazamiento
                    path.style.animationPlayState = 'running';
                    path.style.opacity = 1;
                    // Agregar efecto de desvanecimiento
                }, index);
            });
        };

        // Iniciar animación
        typeText(firstH2, 'HACK', typingDuration, () => {
            setTimeout(() => {
                firstH2.style.borderRight = 'none';
                secondH2.style.borderRight = '0.10em solid white';

                // Agregar cursor de escritura
                typeText(secondH2, 'FLIGHT', typingDuration, () => {
                    setTimeout(() => {
                        animateLogo(paths);
                        secondH2.classList.add('animate-blink-caret');

                        // Eliminar cursor de escritura después de un tiempo específico
                        setTimeout(() => {
                            secondH2.classList.remove('animate-blink-caret');
                            // Ocultar la animación después de que termine
                            sessionStorage.setItem(
                                'logoAnimationPlayed',
                                'true',
                            );
                            logoAnimationSection.classList.add('hidden');
                        }, 2000); // Cambia 2000 por el tiempo deseado en milisegundos
                    }, 500);
                });
                // Parpadear cursor de escritura
            }, cursorBlinkDelay);
        });
    }, []);

    return (
        <section className='logo-animation-section relative flex items-center justify-center bg-dark-blue h-screen'>
            <div className='flex items-center justify-center'>
                <div className='logo-container flex items-center justify-center w-41 h-41 -ml-9 relative z-10'>
                    <svg
                        className='responsive-logo w-full h-full rotate-[30deg]'
                        viewBox='0 0 372 345'
                        fill='none'
                    >
                        <g transform='translate(186, 172.5) scale(0.25) translate(-186, -172.5)'>
                            {/* Fondo blanco */}
                            <path
                                d='M333 171.5C333 252.41 267.41 318 186.5 318C105.59 318 40 252.41 40 171.5C40 90.5903 105.59 25 186.5 25C267.41 25 333 90.5903 333 171.5Z'
                                fill='#083059'
                                className='path path1'
                            />
                            {/* Secciones de circunferencias */}
                            <path
                                d='M240.355 304.268L226.463 42.7809C226.362 40.8791 223.912 40.1815 222.824 41.7449L72.5274 257.804C71.7646 258.901 70.195 258.967 69.4122 257.884C63.1494 249.225 40.5 214.811 40.5 170C40.5 131.263 50.1225 106.693 75.0001 77C96.5644 51.2613 114.674 39.0833 147 30C177.455 21.4424 197.658 22.048 228 31C263.38 41.4386 283.904 55.0945 305.5 85C326.436 113.992 332.953 136.742 332.5 172.5C332.069 206.523 325.144 227.371 306 255.5C285.128 286.17 252.28 301.961 243.01 305.964C241.767 306.501 240.427 305.62 240.355 304.268Z'
                                fill='white'
                                className='path path2'
                            />
                            {/* Triángulo negro */}
                            <path
                                d='M101.613 287.37L197.457 146.985C198.601 145.309 201.226 146.206 201.105 148.232L191.108 315.203C191.046 316.225 190.224 317.035 189.202 317.082L180 317.5L168.5 316.5L155 314.5L142.5 311.5L131 307L119.5 301.5L109.75 295.5L102.114 290.135C101.219 289.505 100.996 288.274 101.613 287.37Z'
                                fill='white'
                                stroke='black'
                                strokeWidth='2'
                                className='path path3'
                            />
                            {/* Ala derecha */}
                            <path
                                d='M257.812 192.638L257.812 192.633L248.851 55.4365C248.779 54.3346 250.283 53.9462 250.753 54.9453L285.245 128.203L322.534 207.404C322.885 208.148 322.238 208.973 321.432 208.81L274.206 199.285C272.459 198.933 270.792 200.172 270.626 201.947L264.394 268.672C264.279 269.901 262.475 269.871 262.4 268.639L257.812 192.638Z'
                                fill='#083059'
                                stroke='white'
                                strokeWidth='2'
                                className='path path4'
                            />
                            {/* Ala izquierda */}
                            <path
                                d='M112.888 149.998L112.891 149.994L195.593 40.1597C196.257 39.2776 195.212 38.1283 194.271 38.706L125.265 81.0689L50.6616 126.869C49.9611 127.299 50.0498 128.343 50.8128 128.649L95.532 146.57C97.1865 147.233 97.9014 149.184 97.0672 150.759L65.7029 209.982C65.1249 211.073 66.6506 212.037 67.3884 211.047L112.888 149.998Z'
                                fill='#083059'
                                stroke='white'
                                strokeWidth='2'
                                className='path path5'
                            />
                        </g>
                    </svg>
                </div>
                <div className='absolute inset-0 flex items-center justify-center z-20 space-x-9'>
                    <h2
                        id='first-h2'
                        className='text-5xl font-heading font-light text-white'
                    ></h2>
                    <div className='w-2'></div>
                    <h2
                        id='second-h2'
                        className='text-5xl font-heading font-light text-white'
                    ></h2>
                </div>
            </div>
        </section>
    );
};

export default LogoAnimation;
