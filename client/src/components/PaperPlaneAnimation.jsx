import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, MotionPathPlugin } from 'gsap/all';
import 'tailwindcss/tailwind.css';

gsap.registerPlugin( ScrollTrigger, MotionPathPlugin );

const PaperPlaneAnimation = () => {
    const planeRef = useRef( null );

    useEffect( () => {
        const path = [
            { x: 50, y: 100 },
            { x: 150, y: 100 },
            { x: 250, y: 50 },
            { x: 375, y: -50 },
            { x: 175, y: -25 },
            { x: 300, y: 25 },
            { x: window.innerWidth - 100, y: -250 },
        ];

        gsap.to( ".paper-plane", {
            duration: 100,
            ease: "power1.out",
            motionPath: {
                path: path,
                align: "self",
                autoRotate: true,
                curviness: 1.25,
                alignOrigin: [ 0.5, 0.5 ],
            },
            scale: 0.1,
            scrollTrigger: {
                trigger: ".animation",
                start: "top top",
                end: "bottom bottom",
                scrub: 12,
                pin: true,
                anticipatePin: 1,
            },
        } );

        gsap.set( ".paper-plane", {
            scale: 10,
        } );
    }, [] );

    return (
        <div className="w-screen h-[20vh] relative animation">
            <section
                className="w-full h-full"
                style={{
                    backgroundImage: "url('/public/blue-sky.jpg')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <img
                    ref={planeRef}
                    className="paper-plane h-[5px] w-[5px] absolute top-1/2 left-0 transform -translate-y-1/2 rotate-30"
                    src="/public/plane-r.png"
                    alt="paper-plane"
                />
            </section>
        </div>
    );
};

export default PaperPlaneAnimation;