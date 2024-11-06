import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const HeadlineFlipper = ({ headlines }: { headlines: string[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    let counter = 0;

    const introduceNextHeadline = (headline: string) => {

        let boxOne = containerRef.current?.firstElementChild;
        let boxTwo = containerRef.current?.lastElementChild;

        if (containerRef.current && boxTwo) {
            (boxTwo as HTMLElement).getElementsByTagName('span')[0].textContent = headline;
        }

        if (boxOne && boxTwo) {
            gsap.to(boxOne, {
                top: '-=100%',
                duration: 1,
                ease: 'power2.inOut',
            });

            gsap.to(boxTwo, {
                top: '-=100%',
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    if (containerRef.current) {
                        containerRef.current.removeChild(boxOne);
                        containerRef.current.appendChild(boxOne);
                        (boxOne as HTMLElement).style.top = '100%';
                    }
                },
            })
        }
    };
    

    useEffect(() => {
        const intervalId = setInterval(() => {

            console.log("using", headlines);

            counter++;

            let headline = headlines[counter % headlines.length];

            introduceNextHeadline(headline);


        }, 3000);

        return () => clearInterval(intervalId);

    }, [])

    useEffect(() => {

        console.log("HEADLINES", headlines);

        counter = 0;

    }, [headlines]);

    return (
        <div
            ref={containerRef}
            className={`${headlines.length > 0 ? 'flex flex-col' : 'opacity-0'} relative h-[5em] w-full overflow-hidden`}
        >
            <div
                style={{ top: '0%' }}
                className="w-full text-gray-600 font-[reithsanslt] absolute min-h-[100%] text-[3em] flex items-center gap-4"
            >
                <span className="font-[reithsans] bg-red-200">{headlines[0]}</span>
            </div>
            <div
                style={{ top: '100%' }}
                className="w-full text-gray-600 font-[reithsanslt] absolute min-h-[100%] text-[3em] flex items-center gap-4"
            >
                <span className="font-[reithsans] bg-blue-200">test</span>
            </div>
            
        </div>
    );
};

export default HeadlineFlipper;
