// src/services/api.ts
import axios from 'axios';

export const API_BASE_URL = "http://localhost:8080/api"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(config => {
  
  if (typeof window !== 'undefined') { 
    const token = localStorage.getItem('taskflow_jwt');
    if (token) {
      
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;