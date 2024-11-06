import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import HeadlineBulletPoint from './HeadlineBulletPoint';

const HeadlineFlipper = ({headlines}: {headlines: string[]}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [headlineIndex, setHeadlineIndex] = useState<number>(1);

    const cycle = () => {
        if(headlines.length > 1) {
            let boxOne = containerRef.current?.firstElementChild;
            let boxTwo = containerRef.current?.lastElementChild;

            if (containerRef.current && boxTwo) {
                (boxTwo as HTMLElement).getElementsByTagName('span')[0].textContent = headlines[headlineIndex];
            }

            setHeadlineIndex((prevIndex) => (prevIndex === headlines.length - 1 ? 0 : prevIndex + 1));

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
                    }
                });
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            cycle();
        }, 3000);

        return () => clearInterval(interval);
    }, [headlineIndex]);

    useEffect(() => {

        console.log("headlines: ", headlines);

    }, [headlines]);

    return (
        <div
            ref={containerRef}
            className="relative h-[5em] w-full overflow-hidden flex flex-col"
        >
            <div style={{ top: '0%' }} className="w-full text-gray-600 font-[reithsanslt] absolute min-h-[100%] text-[3em] flex items-center gap-4">
                <HeadlineBulletPoint colour="#b90000" />
                <span className='font-[reithsans]'>{headlines[0]}</span>
            </div>
            <div style={{ top: '100%' }} className="w-full text-gray-600 font-[reithsanslt] absolute min-h-[100%] text-[3em] flex items-center gap-4">
                <HeadlineBulletPoint colour="#b90000" />
                <span className='font-[reithsans]'></span>
            </div>
        </div>
    );
};

export default HeadlineFlipper;
