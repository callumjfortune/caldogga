'use client';

import React, { useEffect, useState } from 'react';
import CustomLowerThird from "../../components/lower-third/CustomLowerThird";
import NewsLowerThird from '@/app/components/lower-third/NewsLowerThird';

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]); // Store messages as an array of objects

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

        // Add new message(s) to the state, assuming it's either an array or single message object
        setMessages((prevMessages) => [
          ...prevMessages,
          ...(Array.isArray(parsedData) ? parsedData : [parsedData]),
        ]);
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

  return (
    <div className="w-screen aspect-video --p-24 pb-16">
      <div className="w-full h-full flex flex-col bg-[4D0099]">
        <div id="upper-third" className="h-2/3 grid grid-cols-3 grid-rows-2">
          <div className="bg-white"></div>
          <div className="bg-white"></div>
          <div className="bg-white"></div>
          <div className="bg-white"></div>
          <div className="bg-white"></div>
          <div className="bg-white"></div>
        </div>

        <div id="lower-third" className="h-1/3">
          {/* <CustomLowerThird messages={messages} /> */}
          <NewsLowerThird messages={messages} />
        </div>
      </div>
    </div>
  );
}
