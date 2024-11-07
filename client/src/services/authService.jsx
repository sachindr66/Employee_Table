import axios from 'axios';

const apiUrl = 'http://localhost:5006/api/auth';

const login = async (userName, password) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, { userName, password });
    return response.data.token;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export default { login };
