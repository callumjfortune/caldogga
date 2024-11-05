'use client';

import React, { useEffect, useRef, useState } from 'react';
import HeadlineBulletPoint from './HeadlineBulletPoint';
import { gsap } from 'gsap';
import Logo from '../misc/logo';

interface Message {
  message: string;
}

interface LowerThirdProps {
  messages: Message[];
}

const NewsLowerThird: React.FC<LowerThirdProps> = ({ messages }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null); // Start with null

  // Headlines array
  const headlines = [
    "Breaking",
    "This is a breaking story",
    "This is a third headline that is also cool",
  ];

  // Animation effect setup
  const setupAnimation = () => {
    const $list = document.querySelector('.v-slides');
    const timeline = gsap.timeline({ repeat: -1 }); // Create a repeating timeline

    if ($list) {
      // Get the height of one slide
      const lineHeight = ($list.firstElementChild as HTMLElement)?.clientHeight || 0;
      const totalHeight = lineHeight * headlines.length;

      headlines.forEach((headline, index) => {
        // Create the animation for each headline
        timeline.to($list, {
          y: -lineHeight * index, // Move to the position of the current headline
          duration: 1, // Duration for the animation of each headline
          ease: "power1.inOut", // Easing function for smooth in-out effect
        }).to($list, {
          duration: 3, // Pause for 1 second before moving to the next headline
          ease: "none",
          y: `+=0`, // Effectively a no-op to create the pause
        });
      });

      timeline.to($list, {
        y: -totalHeight, // Reset to cover all headlines once
        duration: 1,
        ease: "power1.inOut", // Easing for the reset movement
      });
    }
  };

  useEffect(() => {
    setupAnimation(); // Setup animation once on mount
    return () => {
      gsap.killTweensOf('.v-slides'); // Cleanup animation on unmount
    };
  }, []); // Empty dependency array ensures this only runs once

  useEffect(() => {
    // Set the current time when the component mounts
    const updateCurrentTime = () => {
      setCurrentTime(`${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    };

    updateCurrentTime(); // Set initial time
    const intervalId = setInterval(updateCurrentTime, 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    if (messages.length > 0 ) {
      alert(JSON.stringify(messages));
    }
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-2/6"></div>
      <div className="h-3/6 grid grid-cols-3">
        <div className="w-full bg-[#b90000] px-[15%] pt-4 col-span-3">

          <div className='-ml-[2px] flex items-center text-white text-[3em]'>
            <div className='w-[200px]'><Logo /></div>
            <span className=''>NEWS</span>
          </div>

          <h1 className='leading-[100%] uppercase text-[10em] text-white'>Breaking</h1>

        </div>
      </div>
      <div className="h-1/6 flex px-[15%]">
        <div className="w-full text-[#b90000] col-span-5 text-[3.75em] pl-3 flex flex-col overflow-hidden">
          <ul className="v-slides relative">
            {[...headlines, ...headlines].map((headline, index) => ( // Duplicate headlines for seamless scroll
              <li key={index} className="v-slide headline flex gap-6 items-center">
                <HeadlineBulletPoint colour="#b90000" />
                {headline}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 bg-[#b90000] mt-[-1px] border-[#b90000] grid place-content-center">
          <div ref={divRef} className="text-white text-[3.75em]">
            {currentTime || '--:--'} {/* Fallback for when currentTime is null */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLowerThird;
