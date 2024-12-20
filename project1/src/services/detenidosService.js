import api from '../utils/api';
import { mockDetenidos } from '../utils/mockData';

const isDev = import.meta.env.DEV;

export async function fetchDetenidos(unidadSanitariaId) {
  if (isDev) {
    return mockDetenidos.filter(d => d.unidadSanitariaId === unidadSanitariaId);
  }
  const response = await api.get(`/detenidos?unidadSanitariaId=${unidadSanitariaId}`);
  return response.data;
}

export async function registrarMedicacion(data) {
  if (isDev) {
    return { ...data, id: Date.now().toString() };
  }
  const response = await api.post('/medicaciones', data);
  return response.data;
}