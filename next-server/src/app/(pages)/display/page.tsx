'use client';

import React, { useEffect, useState } from 'react';
import CustomLowerThird from "../../components/lower-third/CustomLowerThird";
import NewsLowerThird from '@/app/components/lower-third/NewsLowerThird';

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]); // Store messages as an array of objects
  const [videoEnabled, setVideoEnabled] = useState<boolean>(false); // State to track video background

  useEffect(() => {
    // Replace with your WebSocket server URL
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    ws.onmessage = (event) => {
      console.log('Message received:', event.data);

      try {
        // Parse incoming JSON message data
        const parsedData = JSON.parse(event.data);

        // alert(JSON.stringify(parsedData));

          if (parsedData.message === 'enableVideo') {
            setVideoEnabled(true);
          } else if (parsedData.message === 'disableVideo') {
            setVideoEnabled(false);
          }

        // Check for enableVideo and disableVideo messages
        // Add new message(s) to the state, assuming it's either an array or single message object
        setMessages((prevMessages) => [
          ...(Array.isArray(parsedData) ? parsedData : [parsedData]),
        ])

      } catch (error) {
        console.error('Error parsing message data as JSON:', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up the connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (videoEnabled) {
      navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 } })
        .then(function(stream) {
          const video = document.createElement('video');
          video.srcObject = stream;
          video.onloadedmetadata = function(e) {
            video.play();
          };
          video.style.position = 'absolute';
          video.style.top = '0';
          video.style.left = '0';
          video.style.width = '100%';
          video.style.height = '100%';
          video.style.zIndex = '-1';
          video.id = 'background-video';
          document.body.appendChild(video);
        })
        .catch(function(err) {
          console.log("The following error occurred: " + err.name);
        });
    } else {
      const video = document.getElementById('background-video');
      if (video) {
        video.remove();
      }
    }
  }, [videoEnabled]);

  return (
    <div className="w-screen aspect-video --p-24 pb-16">
      <div className="w-full h-screen flex flex-col bg-[4D0099]">
        <div id="upper-third" className="flex-grow grid grid-cols-3 grid-rows-2">
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
          <div className=""></div>
        </div>

        <NewsLowerThird messages={messages} />

        {/* <div id="lower-third" className="h-1/3">
          {/* <CustomLowerThird messages={messages} /> */}
          
        {/* </div> */}
      </div>
    </div>
  );
}
