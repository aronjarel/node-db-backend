// /frontend/src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',  // Proxy setup will redirect to Node.js
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
