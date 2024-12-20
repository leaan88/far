import api from '../utils/api';
import { mockStock } from '../utils/mockData';

const isDev = import.meta.env.DEV;

export async function fetchStock(unidadSanitariaId) {
  if (isDev) {
    return mockStock;
  }
  const response = await api.get(`/stock?unidadSanitariaId=${unidadSanitariaId}`);
  return response.data;
}

export async function registrarIngreso(data) {
  if (isDev) {
    return { ...data, id: Date.now().toString() };
  }
  const response = await api.post('/stock/ingreso', data);
  return response.data;
}