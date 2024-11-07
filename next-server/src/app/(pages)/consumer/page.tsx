'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function Consumer() {
  const [inputValue, setInputValue] = useState('');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create a WebSocket connection
    wsRef.current = new WebSocket('ws://localhost:8080');

    wsRef.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    wsRef.current.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    wsRef.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Clean up the connection on component unmount
    return () => {
      wsRef.current?.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ message: message }));
      console.log('Sent:', message);
      setInputValue(''); // Clear input after sending
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  };

  return (
    <div className='text-[3em]'>
      <div className='grid grid-cols-4'>
        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('topHeadlineOpen');
        }} className='bg-blue-400'>Open Introduction</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('topHeadlineClose');
        }} className='bg-blue-400'>Close introduction</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('bottomHeadlineOpen');
        }} className='bg-red-400'>Open headline</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('bottomHeadlineClose');
        }} className='bg-red-400'>Close headline</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('timeTabOpen');
        }} className='bg-green-400'>Open time</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('timeTabClose');
        }} className='bg-green-400'>Close time</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('enableVideo');
        }} className='bg-pink-400'>Enable video</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('disableVideo');
        }} className='bg-pink-400'>Disable video</button>
      </div>

      <div className='w-full flex flex-col p-4'>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Flipper headlines (seperate by newlines)'
          className='border text-[0.5em] p-4 border-black w-full'
        />
        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('updateHeadlines: ' + inputValue);
        }} 
        className='w-full bg-blue-400'>Update flipper (seperate by newlines)</button>
      </div>
    </div>
  );
}
