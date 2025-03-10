import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; 
  } catch (error) {
    throw error;
  }
};
