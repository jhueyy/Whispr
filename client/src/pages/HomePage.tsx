import React from 'react';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import { Box, CssBaseline } from '@mui/material';

function HomePage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <Box sx={{ flexGrow: 1 }}>
        <ChatBox />
      </Box>
    </Box>
  );
}

export default HomePage;
