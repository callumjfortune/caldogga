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
  const topHeadlineRef = useRef<HTMLDivElement>(null);
  const bottomHeadlineRef = useRef<HTMLDivElement>(null);
  const timeTabRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [topHeadlineOpen, setTopHeadlineOpen] = useState<boolean | null>(null);
  const [bottomHeadlineOpen, setBottomHeadlineOpen] = useState<boolean | null>(null);
  const [timeTabOpen, setTimeTabOpen] = useState<boolean | null>(null);
  const [headlines, setHeadlines] = useState<string[]>([
    "Breaking",
    "This is a breaking story",
    "This is a third headline that is also cool",
  ]);

  // Function to setup the animation
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

  // Update current time
  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(`${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Re-run animation when headlines change
  useEffect(() => {
    setupAnimation();
  }, [headlines]);

  // Animation for top headline
  useEffect(() => {
    if (topHeadlineOpen !== null && topHeadlineRef.current) {
      if (topHeadlineOpen) {
        gsap.to(topHeadlineRef.current, {
          height: "auto", // Target height when opened
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      } else {
        gsap.to(topHeadlineRef.current, {
          height: 0, // Collapse height when closed
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        });
      }
    }
  }, [topHeadlineOpen]);

  useEffect(() => {
    if (bottomHeadlineOpen !== null && bottomHeadlineRef.current) {
      if (bottomHeadlineOpen) {
        gsap.to(bottomHeadlineRef.current, {
          height: "auto", // Target height when opened
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      } else {
        gsap.to(bottomHeadlineRef.current, {
          height: 0, // Collapse height when closed
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        });
      }
    }
  }, [bottomHeadlineOpen]);

  useEffect(() => {
    if (timeTabOpen !== null && timeTabRef.current) {
      if (timeTabOpen) {
        gsap.to(timeTabRef.current, {
          height: "auto", // Target height when opened
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      } else {
        gsap.to(timeTabRef.current, {
          height: 0, // Collapse height when closed
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
        });
      }
    }
  }, [timeTabOpen]);

  // Listen for messages
  useEffect(() => {
    if (messages.length > 0) {
      messages.forEach((message) => {
        if (message.message.startsWith('updateHeadlines:')) {
          const newHeadlines = message.message.replace('updateHeadlines:', '').split('\n').filter(headline => headline.trim() !== '');
          setHeadlines(newHeadlines); // Update headlines
        }

        switch(message.message) {
          case 'topHeadlineOpen':
            setTopHeadlineOpen(true);
            break;
          case 'topHeadlineClose':
            setTopHeadlineOpen(false);
            break;
          case 'bottomHeadlineOpen':
            setBottomHeadlineOpen(true);
            break;
          case 'bottomHeadlineClose':
            setBottomHeadlineOpen(false);
            break;
          case 'timeTabOpen':
            setTimeTabOpen(true);
            break;
          case 'timeTabClose':
            setTimeTabOpen(false);
            break;
          default:
            break;
        }
      });
    }
  }, [messages]);

  return (
    <div className="w-full flex flex-col">
      <div className="grid grid-cols-3">
        <div ref={topHeadlineRef} className="overflow-hidden flex flex-col gap-4 py-4 w-full bg-[#b90000] px-[15%] col-span-3">
          <h1 className='leading-[100%] ml-2 text-[5em] text-white'>Callum Fortune</h1>
          <h2 className='leading-[100%] ml-2 text-[3.5em] text-white'>Caldogga creator</h2>
        </div>
        <div className="w-full bg-[#b90000] px-[15%] py-1 col-span-3">
          <div className='-ml-[2px] flex items-center text-white text-[3.3em]'>
            <div className='w-[200px]'><Logo /></div>
            <span className='font-[reithsansmd]'>NEWS</span>
          </div>
        </div>
        <div ref={bottomHeadlineRef} className='w-full bg-[#b90000] px-[15%] col-span-3'>
          <h2 className='text-[5em] leading-[100%] py-8 pb-16 text-white'>Americans also choosing who controls Congress</h2>
        </div>
      </div>
      <div className="flex px-[15%] bg-white">
        <div className="w-full h-[1.5em] text-gray-600 col-span-5 text-[3.5em] pl-3 flex flex-col overflow-hidden">
          <ul className="h-[1em] v-slides relative">
            {[...headlines, ...headlines].map((headline, index) => (
              <li key={index} className="v-slide headline flex gap-6 items-center font-[reithsanslt]">
                <HeadlineBulletPoint colour="#b90000" />
                {headline}
              </li>
            ))}
          </ul>
        </div>
        <div ref={timeTabRef} className="px-4 bg-[#b90000] mt-[-1px] border-[#b90000] grid place-content-center">
          <div ref={divRef} className="text-white text-[3.5em] font-[reithsanslt]">
            {currentTime || '--:--'}
          </div>
        </div>
      </div>
      <div className='bg-white h-16 w-full -mt-1'></div>
    </div>
  );
};

export default NewsLowerThird;
