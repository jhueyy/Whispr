import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:5001'); // Connect to the backend

function ChatBox() {
  const [messages, setMessages] = useState<string[]>([]); // Array of strings
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Listen for messages and ensure they are strings
    socket.on('receiveMessage', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage'); // Clean up listener
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && username.trim()) {
      socket.emit('sendMessage', { user: username, message: input });
      setInput('');
    } else {
      console.error("Username and message cannot be empty.");
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Message Display Area */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, backgroundColor: '#f4f4f4' }}>
        {messages.map((msg, index) => (
          <Paper key={index} sx={{ p: 1, mb: 1 }}>
            <Typography variant="body1">{msg}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Input Area */}
      <Box sx={{ display: 'flex', p: 1, backgroundColor: '#fff' }}>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username..."
          variant="outlined"
          sx={{ mr: 1 }}
        />
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          variant="outlined"
          fullWidth
        />
        <Button
          onClick={sendMessage}
          variant="contained"
          color="primary"
          sx={{ ml: 1 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default ChatBox;
