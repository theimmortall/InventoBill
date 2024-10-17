// src/api/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api/v1';  // Your backend base URL

  // Add your other exports
  export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow the error for further handling
    }
};
  
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/sign-up`, userData);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow the error for further handling
    }
};
  