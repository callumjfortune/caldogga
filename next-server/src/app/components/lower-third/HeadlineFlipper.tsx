import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import HeadlineBulletPoint from './HeadlineBulletPoint';

const HeadlineFlipper = ({ headlines }: { headlines: string[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [headlineIndex, setHeadlineIndex] = useState<number>(1);

    const cycle = () => {

        let boxOne = containerRef.current?.firstElementChild;
        let boxTwo = containerRef.current?.lastElementChild;

        if (headlines.length > 1) {

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
                    },
                });
            }
        } else {

            if (containerRef.current && boxTwo) {
                (boxTwo as HTMLElement).getElementsByTagName('span')[0].textContent = headlines[headlineIndex];
            }

            if (containerRef.current && boxOne) {
                (boxOne as HTMLElement).getElementsByTagName('span')[0].textContent = headlines[headlineIndex];
            }

        }
    };

    useEffect(() => {
        if (headlines.length > 1) {
            const interval = setInterval(() => {
                cycle();
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [headlineIndex, headlines.length]); // Add headlines.length as dependency

    return (
        <div
            ref={containerRef}
            className={`${headlines.length > 0 ? 'flex flex-col' : 'opacity-0'} relative h-[5em] w-full overflow-hidden`}
        >
            <div
                style={{ top: '0%' }}
                className="w-full text-gray-600 font-[reithsanslt] absolute min-h-[100%] text-[3em] flex items-center gap-4"
            >
                <HeadlineBulletPoint colour="#b90000" />
                <span className="font-[reithsans]">{headlines[0]}</span>
            </div>
            <div
                style={{ top: '100%' }}
                className="w-full text-gray-600 font-[reithsanslt] absolute min-h-[100%] text-[3em] flex items-center gap-4"
            >
                <HeadlineBulletPoint colour="#b90000" />
                <span className="font-[reithsans]"></span>
            </div>
        </div>
    );
};

export default HeadlineFlipper;
