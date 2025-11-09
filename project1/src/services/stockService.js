import api from '../utils/api';
import { mockStock } from '../utils/mockData';

const isDev = import.meta.env.DEV;

/**
 * Obtiene el stock de una unidad sanitaria
 */
export async function fetchStock(unidadSanitariaId) {
  if (isDev) {
    return mockStock.filter(
      (item) => item.unidadSanitariaId === unidadSanitariaId
    );
  }
  const response = await api.get(`/stock?unidadSanitariaId=${unidadSanitariaId}`);
  return response.data;
}

/**
 * Registra un ingreso de medicamento al stock
 */
export async function registrarIngreso(data) {
  if (isDev) {
    const newIngreso = {
      ...data,
      id: Date.now().toString(),
      fechaIngreso: new Date().toISOString(),
    };
    console.log('Ingreso registrado (mock):', newIngreso);
    return newIngreso;
  }
  const response = await api.post('/stock/ingreso', data);
  return response.data;
}

/**
 * Registra un egreso (salida) de medicamento del stock
 */
export async function registrarEgreso(data) {
  if (isDev) {
    const newEgreso = {
      ...data,
      id: Date.now().toString(),
      fechaEgreso: new Date().toISOString(),
    };
    console.log('Egreso registrado (mock):', newEgreso);
    return newEgreso;
  }
  const response = await api.post('/stock/egreso', data);
  return response.data;
}

/**
 * Obtiene el historial de movimientos de stock
 */
export async function fetchMovimientos(unidadSanitariaId, filtros = {}) {
  if (isDev) {
    // Retorna array vacío en desarrollo, se implementará más adelante
    return [];
  }
  const params = new URLSearchParams({
    unidadSanitariaId,
    ...filtros,
  });
  const response = await api.get(`/stock/movimientos?${params}`);
  return response.data;
}

/**
 * Obtiene medicamentos con stock bajo (menor al mínimo)
 */
export async function fetchStockBajo(unidadSanitariaId) {
  if (isDev) {
    return mockStock.filter((item) => item.cantidad < 10);
  }
  const response = await api.get(
    `/stock/alertas/stock-bajo?unidadSanitariaId=${unidadSanitariaId}`
  );
  return response.data;
}

/**
 * Obtiene medicamentos próximos a vencer (dentro de 30 días)
 */
export async function fetchProximosAVencer(unidadSanitariaId) {
  if (isDev) {
    const hoy = new Date();
    const treintaDias = new Date(hoy.getTime() + 30 * 24 * 60 * 60 * 1000);
    return mockStock.filter((item) => {
      const vencimiento = new Date(item.fechaVencimiento);
      return vencimiento >= hoy && vencimiento <= treintaDias;
    });
  }
  const response = await api.get(
    `/stock/alertas/proximos-vencer?unidadSanitariaId=${unidadSanitariaId}`
  );
  return response.data;
}