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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ message: inputValue }));
      console.log('Sent:', inputValue);
      setInputValue(''); // Clear input after sending
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  };

  return (
    <div className='w-screen h-screen grid place-content-center text-[4em]'>
      <form onSubmit={submit} className='bg-gray-200 p-4'>
        <input
          type="text"
          placeholder="Enter a string"
          value={inputValue}
          className='px-4 py-2'
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>

    </div>
  );
}
