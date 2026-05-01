import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pavel_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('pavel_token', token);
    return;
  }

  localStorage.removeItem('pavel_token');
}

export function getAuthToken() {
  return localStorage.getItem('pavel_token');
}

export default api;
