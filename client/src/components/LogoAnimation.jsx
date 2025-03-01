import { useEffect } from 'react';
import './LogoAnimation.css';

const LogoAnimation = () => {
    useEffect( () => {
        const paths = document.querySelectorAll( ".path" );
        const firstH2 = document.getElementById( "first-h2" );
        const secondH2 = document.getElementById( "second-h2" );

        const typingDuration = 1000; // 1 second for each h2
        const cursorBlinkDelay = 500; // Cursor blink time

        const typeText = ( element, text, duration, callback ) => {
            if ( element.dataset.typing ) return; // Prevent typing if already typing
            element.dataset.typing = true;
            let index = 0;
            const interval = duration / text.length;

            const typingInterval = setInterval( () => {
                if ( index < text.length )
                {
                    element.textContent += text[ index ];
                    index++;
                } else
                {
                    clearInterval( typingInterval );
                    if ( callback ) callback();
                }
            }, interval );
        };

        const animateLogo = ( paths ) => {
            paths.forEach( ( path, index ) => {
                setTimeout( () => {
                    path.style.animationPlayState = 'running'; // Start the animation
                    path.style.opacity = 1;
                }, index * 500 );
            } );
        };

        typeText( firstH2, "HACK", typingDuration, () => {
            setTimeout( () => {
                firstH2.style.borderRight = "none";
                secondH2.style.borderRight = "0.15em solid orange";

                typeText( secondH2, "FLIGHT", typingDuration, () => {
                    setTimeout( () => {
                        console.log( "Starting logo animation after delay" );
                        animateLogo( paths );
                        secondH2.classList.add( "animate-blink-caret" ); // Add blinking cursor class
                    }, 2000 );
                } );
            }, cursorBlinkDelay );
        } );
    }, [] );

    return (
        <section className="logo-animation-section flex flex-col items-center justify-center bg-medium-blue h-screen">
            <h2 id="first-h2" className='text-3xl font-bold text-white mb-4'></h2>
            <div className="logo-container flex items-center justify-center">
                <svg className="responsive-logo w-24 h-24" viewBox="0 0 372 345" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M333 171.5C333 252.41 267.41 318 186.5 318C105.59 318 40 252.41 40 171.5C40 90.5903 105.59 25 186.5 25C267.41 25 333 90.5903 333 171.5Z" fill="white" className="path path1" />
                    <path d="M240.355 304.268L226.463 42.7809C226.362 40.8791 223.912 40.1815 222.824 41.7449L72.5274 257.804C71.7646 258.901 70.195 258.967 69.4122 257.884C63.1494 249.225 40.5 214.811 40.5 170C40.5 131.263 50.1225 106.693 75.0001 77C96.5644 51.2613 114.674 39.0833 147 30C177.455 21.4424 197.658 22.048 228 31C263.38 41.4386 283.904 55.0945 305.5 85C326.436 113.992 332.953 136.742 332.5 172.5C332.069 206.523 325.144 227.371 306 255.5C285.128 286.17 252.28 301.961 243.01 305.964C241.767 306.501 240.427 305.62 240.355 304.268Z" fill="black" className="path path2" />
                    <path d="M101.613 287.37L197.457 146.985C198.601 145.309 201.226 146.206 201.105 148.232L191.108 315.203C191.046 316.225 190.224 317.035 189.202 317.082L180 317.5L168.5 316.5L155 314.5L142.5 311.5L131 307L119.5 301.5L109.75 295.5L102.114 290.135C101.219 289.505 100.996 288.274 101.613 287.37Z" fill="black" className="path path3" />
                    <path d="M226.463 42.7809L225.465 42.834L225.465 42.834L226.463 42.7809ZM240.355 304.268L241.353 304.215L241.353 304.215L240.355 304.268ZM197.457 146.985L196.631 146.421L196.631 146.421L197.457 146.985ZM101.613 287.37L102.438 287.934L102.438 287.934L101.613 287.37ZM191.108 315.203L190.109 315.144L190.109 315.144L191.108 315.203ZM201.105 148.232L202.103 148.292L202.103 148.292L201.105 148.232ZM72.5274 257.804L71.7065 257.233L71.7064 257.233L72.5274 257.804ZM222.824 41.7449L222.003 41.1739L222.003 41.1739L222.824 41.7449ZM228 31L227.717 31.9592L227.717 31.9592L228 31ZM147 30L147.27 30.9628L147.27 30.9628L147 30ZM75.0001 77L75.7666 77.6422L75.7666 77.6422L75.0001 77ZM40.5 170L39.5 170V170L40.5 170ZM69.4122 257.884L70.2225 257.298L70.2225 257.298L69.4122 257.884ZM243.01 305.964L242.613 305.046L242.613 305.046L243.01 305.964ZM306 255.5L306.827 256.063L306.827 256.063L306 255.5ZM332.5 172.5L333.5 172.513L333.5 172.513L332.5 172.5ZM305.5 85L306.311 84.4146L306.311 84.4146L305.5 85ZM168.5 316.5L168.353 317.489L168.383 317.494L168.413 317.496L168.5 316.5ZM180 317.5L179.913 318.496L179.979 318.502L180.045 318.499L180 317.5ZM189.202 317.082L189.157 316.083L189.157 316.083L189.202 317.082ZM142.5 311.5L142.136 312.431L142.2 312.456L142.267 312.472L142.5 311.5ZM155 314.5L154.767 315.472L154.81 315.483L154.853 315.489L155 314.5ZM119.5 301.5L118.976 302.352L119.021 302.379L119.069 302.402L119.5 301.5ZM131 307L130.569 307.902L130.602 307.918L130.636 307.931L131 307ZM102.114 290.135L101.539 290.953L101.539 290.953L102.114 290.135ZM109.75 295.5L109.175 296.318L109.2 296.336L109.226 296.352L109.75 295.5ZM225.465 42.834L239.356 304.321L241.353 304.215L227.462 42.7279L225.465 42.834Z" fill="black" className="path path4" />
                    <path d="M257.812 192.638L257.812 192.633L248.851 55.4365C248.779 54.3346 250.283 53.9462 250.753 54.9453L285.245 128.203L322.534 207.404C322.885 208.148 322.238 208.973 321.432 208.81L274.206 199.285C272.459 198.933 270.792 200.172 270.626 201.947L264.394 268.672C264.279 269.901 262.475 269.871 262.4 268.639L257.812 192.638Z" fill="white" stroke="black" strokeWidth="2" className="path path5" />
                    <path d="M112.888 149.998L112.891 149.994L195.593 40.1597C196.257 39.2776 195.212 38.1283 194.271 38.706L125.265 81.0689L50.6616 126.869C49.9611 127.299 50.0498 128.343 50.8128 128.649L95.532 146.57C97.1865 147.233 97.9014 149.184 97.0672 150.759L65.7029 209.982C65.1249 211.073 66.6506 212.037 67.3884 211.047L112.888 149.998Z" fill="white" stroke="black" strokeWidth="2" className="path path6" />
                </svg>
            </div>
            <h2 id="second-h2" className='text-3xl font-bold text-white mb-4'></h2>
        </section>
    );
};

export default LogoAnimation;