import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import HeadlineBulletPoint from './HeadlineBulletPoint';

const HeadlineFlipper = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [headlines, setHeadlines] = useState<string[]>(["one", "two", "three"]);
    const [headlineIndex, setHeadlineIndex] = useState<number>(0);

    const cycle = () => {

        let boxOne = containerRef.current?.firstElementChild;
        let boxTwo = containerRef.current?.lastElementChild;

        if (containerRef.current) {
            if (containerRef.current && containerRef.current.lastElementChild) {
                containerRef.current.lastElementChild.textContent = headlines[headlineIndex];
            }

        }
        setHeadlineIndex((prevIndex) => (prevIndex === headlines.length - 1 ? 0 : prevIndex + 1));

        setTimeout(() => {

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
    
                        containerRef.current?.removeChild(boxOne);
                        containerRef.current?.appendChild(boxOne);

                        (boxOne as HTMLElement).style.top = '100%';
    
                    }
                });
    
            }

        }, 1000);
    
    }

    setInterval(() => {
        cycle();
    }, 3000);


    return (
        <div
            ref={containerRef}
            className="relative h-[5em] w-full overflow-hidden flex flex-col"
        >
            <div style={{ top: '0%' }} className='w-full absolute min-h-[100%] text-[3em]'></div>
            <div style={{ top: '100%' }} className='w-full absolute min-h-[100%] text-[3em]'></div>
        </div>
    );
};

export default HeadlineFlipper;
