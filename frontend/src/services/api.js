import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,   // ← utiliser l'env var
  headers: { 'Content-Type': 'application/json' }
});

const token = localStorage.getItem('access_token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;
