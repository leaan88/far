import api from '../utils/api';
import { mockActores } from '../utils/mockData';

const isDev = import.meta.env.DEV;

export async function fetchActores() {
  if (isDev) {
    return mockActores;
  }
  const response = await api.get('/actores');
  return response.data;
}

export async function sincronizarActores() {
  if (isDev) {
    return { success: true, message: 'Sincronización simulada exitosa' };
  }
  const response = await api.post('/actores/sync');
  return response.data;
}