import api from '../utils/api';
import { mockActores, mockDetenidos } from '../utils/mockData';

const isDev = import.meta.env.DEV;

export async function uploadActores(data) {
  if (isDev) {
    console.log('Mock upload actores:', data);
    return { success: true, data: mockActores };
  }
  const response = await api.post('/admin/actores/upload', data);
  return response.data;
}

export async function uploadDetenidos(data) {
  if (isDev) {
    console.log('Mock upload detenidos:', data);
    return { success: true, data: mockDetenidos };
  }
  const response = await api.post('/admin/detenidos/upload', data);
  return response.data;
}

export async function getUSStats(unidadSanitariaId) {
  if (isDev) {
    return {
      actorNombre: 'Actor Mock',
      detenidosCount: 5,
      stockBajo: [
        { id: '1', medicamentoNombre: 'Paracetamol', cantidad: 5 }
      ]
    };
  }
  const response = await api.get(`/admin/us-stats/${unidadSanitariaId}`);
  return response.data;
}