'use client';

import React, { useEffect, useRef, useState } from 'react';
import HeadlineBulletPoint from './HeadlineBulletPoint';
import { gsap } from 'gsap';

interface Message {
  message: string;
}

interface LowerThirdProps {
  messages: Message[];
}

const LowerThird: React.FC<LowerThirdProps> = ({ messages }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  // Headlines array
  const headlines = [
    "This is a headline",
    "This is another headline",
    "This is a third headline",
  ];

  useEffect(() => {
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
          ease: "none",
        }).to($list, {
          duration: 1, // Pause for 1 second before moving to the next headline
          ease: "none",
          y: `+=0`, // Effectively a no-op to create the pause
        });
      });

      timeline.to($list, {
        y: -totalHeight, // Reset to cover all headlines once
        duration: 1,
        ease: "none",
      });
    }

    return () => {
      gsap.killTweensOf($list);
    };
  }, [headlines]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-[#330066] h-1/5"></div>
      <div className="h-3/5 grid grid-cols-3">
        <div className="w-full bg-purple-900 col-span-2"></div>
        <div className="w-full bg-purple-300"></div>
      </div>
      <div className="h-1/5 grid grid-cols-7 gap-2">
        <div className="w-full bg-white col-span-6 text-[4em] px-10 flex flex-col overflow-hidden">
          <ul className="v-slides relative">
            {[...headlines, ...headlines].map((headline, index) => ( // Duplicate headlines for seamless scroll
              <li key={index} className="v-slide headline flex gap-6 items-center">
                <HeadlineBulletPoint />
                {headline}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full bg-purple-900 grid place-content-center">
          <div ref={divRef} className="text-white text-[3.75em]">
            12:03
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowerThird;
