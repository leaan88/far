import axios from 'axios';
import { API_URL } from '../config';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tiempo de espera agotado');
    }

    // Manejar errores de autenticación
    if (error.response?.status === 401) {
      // Si hay un error de autenticación, redirigir al login
      window.location.href = '/login';
    }

    // Manejar errores de autorización
    if (error.response?.status === 403) {
      throw new Error('No tienes permisos para realizar esta acción');
    }

    // Manejar errores del servidor
    if (error.response?.status >= 500) {
      throw new Error('Error del servidor. Por favor, intenta más tarde');
    }

    throw new Error(error.response?.data?.message || error.message);
  }
);

export default api;