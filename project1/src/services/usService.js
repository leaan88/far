import api from '../utils/api';
import { mockUnidadesSanitarias } from '../utils/mockData';

const isDev = import.meta.env.DEV;

export async function fetchUnidadesSanitarias() {
  if (isDev) {
    return mockUnidadesSanitarias;
  }
  const response = await api.get('/unidades-sanitarias');
  return response.data;
}

export async function updateUnidadSanitaria(data) {
  if (isDev) {
    return { ...data, updatedAt: new Date().toISOString() };
  }
  const response = await api.put(`/unidades-sanitarias/${data.id}`, data);
  return response.data;
}