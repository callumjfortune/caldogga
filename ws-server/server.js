const WebSocket = require('ws');
const { WebSocketServer } = WebSocket;
const fs = require('fs');
const path = require('path');

// Path to the file where messages will be saved
const payloadPath = path.join(__dirname, 'payload.json');

// Initialize the WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

// Utility function to write messages to payload.json
function writeMessageToFile(message) {
  fs.readFile(payloadPath, 'utf8', (err, data) => {
    let messages = [];

    // Check if there’s existing data in payload.json
    if (!err && data) {
      try {
        messages = JSON.parse(data); // Parse existing messages
      } catch (parseError) {
        console.error('Error parsing existing file data:', parseError);
      }
    }

    // Add the new message (parsed JSON object) to the array
    messages.push(message);

    // Write the updated array back to payload.json
    fs.writeFile(payloadPath, JSON.stringify(messages, null, 2), (writeErr) => {
      if (writeErr) {
      console.error('Error writing to payload.json:', writeErr);
      } else {
      console.log('Message written to payload.json');
      }
    });
  });
}

// Function to send the content of payload.json to a newly connected client
function sendInitialMessages(ws) {
  fs.readFile(payloadPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading payload.json:', err);
      ws.send(JSON.stringify([])); // Send an empty array if there's an error
    } else {
      try {
        const messages = JSON.parse(data); // Parse the messages as JSON
        ws.send(JSON.stringify(messages)); // Send all messages as a JSON array
      } catch (parseError) {
        console.error('Error parsing payload.json:', parseError);
        ws.send(JSON.stringify([])); // Send an empty array on parse error
      }
    }
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send the content of payload.json to the newly connected client
  sendInitialMessages(ws);

  // Send a confirmation message when a new client connects
  ws.send(JSON.stringify({ message: 'Connection received' }));

  // Handle incoming messages
  ws.on('message', (data) => {
    try {
      // Parse the received message as JSON
      const jsonData = JSON.parse(data.toString());
      console.log('Received message:', jsonData);

      // Write the received message (as JSON) to the file
      writeMessageToFile(jsonData);

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
