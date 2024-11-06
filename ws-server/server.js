const WebSocket = require('ws');
const { WebSocketServer } = WebSocket;
const fs = require('fs');
const path = require('path');

// Path to the file where messages will be saved
const payloadPath = path.join(__dirname, 'payload.json');

// Initialize the WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send a confirmation message when a new client connects
  ws.send(JSON.stringify({ message: 'Connection received' }));

  // Handle incoming messages
  ws.on('message', (data) => {
    try {
      // Parse the received message as JSON
      const jsonData = JSON.parse(data.toString());
      console.log('Received message:', jsonData);


      // Broadcast the message to all connected clients as a JSON string
      const messageString = JSON.stringify(jsonData);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageString); // Send the message to all clients
        }
      });
    } catch (err) {
      console.error('Error parsing incoming message as JSON:', err);
    }
  });

  // Handle close event
  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Handle errors
  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});

// Log when the WebSocket server is running
console.log('WebSocket server is running on ws://localhost:8080');
