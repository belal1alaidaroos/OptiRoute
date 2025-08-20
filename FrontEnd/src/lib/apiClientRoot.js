import axios from 'axios';

// Axios instance for non-versioned API routes (e.g., /api/permissions, /api/roles)
const apiClientRoot = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_ROOT || 'http://localhost:5222/api',
});

apiClientRoot.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClientRoot;

