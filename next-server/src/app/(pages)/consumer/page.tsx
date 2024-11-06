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
    <div className='w-screen h-screen grid place-content-center text-[4em]'>
      <div>
        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('topHeadlineOpen');
        }} >Open top headline</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('topHeadlineClose');
        }} >Close top headline</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('bottomHeadlineOpen');
        }} >Open bottom headline</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('bottomHeadlineClose');
        }} >Close bottom headline</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('topHeadlineOpen');
          sendMessage('bottomHeadlineOpen');
        }} >Open both</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('topHeadlineClose');
          sendMessage('bottomHeadlineClose');
        }} >Close both</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('timeTabOpen');
        }} >Open time</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('timeTabClose');
        }} >Close time</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('enableVideo');
        }} >Enable video</button>

        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('disableVideo');
        }} >Disable video</button>
      </div>

      <div>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='border border-black'
        />
        <button onClick={(e) => {
          e.preventDefault();
          sendMessage('updateHeadlines: ' + inputValue);
        }}>Update headlines</button>
      </div>
    </div>
  );
}
