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
            { x: window.innerWidth, y: -100 },
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
            scale: 4,
        } );
    }, [] );

    return (
        <div className="w-screen h-[40vh] relative animation">
            <section
                className="w-full h-full bg-[url('/public/blue-sky.jpg')] bg-cover bg-center bg-no-repeat md:bg-contain"
            >
                <img
                    ref={planeRef}
                    className="paper-plane h-[40px] w-[40px] absolute top-2/3 left-0 transform -translate-y-1/2 rotate-30"
                    src="/public/plane-r.png"
                    alt="paper-plane"
                />
            </section>
        </div>
    );
};

export default PaperPlaneAnimation;