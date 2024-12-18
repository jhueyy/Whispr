import React, { useState } from 'react';
import axios from 'axios';
import { Axios } from 'axios';

interface RegisterResponse {
  message: string;
}

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:5001/register', {
        email,
        username,
        password,
      });

      // Set success message
      setMessage(response.data.message);
    } catch (error: any) {
      // Handle different types of errors
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        console.error('Server Response:', error.response.data);
        console.error('Status Code:', error.response.status);
        console.error('Headers:', error.response.headers);
        setMessage(error.response.data.message || 'Server error occurred');
      } else if (error.request) {
        // Request was made but no response received
        console.error('No Response Received:', error.request);
        setMessage('No response from server. Please try again.');
      } else {
        // Something happened in setting up the request
        console.error('Request Error:', error.message);
        setMessage('An error occurred while setting up the request.');
      }
    }
  };
  

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterPage;
