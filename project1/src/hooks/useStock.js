import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchStock,
  registrarIngreso as registrarIngresoApi,
  registrarEgreso as registrarEgresoApi,
  fetchMovimientos,
  fetchStockBajo,
  fetchProximosAVencer,
} from '../services/stockService';

/**
 * Hook principal para gestionar el stock
 */
export function useStock(unidadSanitariaId) {
  const queryClient = useQueryClient();

  const { data: stock, isLoading, error } = useQuery(
    ['stock', unidadSanitariaId],
    () => (unidadSanitariaId ? fetchStock(unidadSanitariaId) : null),
    {
      enabled: !!unidadSanitariaId,
      retry: 2,
      onError: (error) => {
        console.error('Error fetching stock:', error);
      },
    }
  );

  const registrarIngresoMutation = useMutation(registrarIngresoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['stock', unidadSanitariaId]);
      queryClient.invalidateQueries(['movimientos', unidadSanitariaId]);
    },
    onError: (error) => {
      console.error('Error registering ingreso:', error);
    },
  });

  const registrarEgresoMutation = useMutation(registrarEgresoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['stock', unidadSanitariaId]);
      queryClient.invalidateQueries(['movimientos', unidadSanitariaId]);
    },
    onError: (error) => {
      console.error('Error registering egreso:', error);
    },
  });

  return {
    stock: stock || [],
    loading: isLoading,
    error: error?.message,
    registrarIngreso: registrarIngresoMutation.mutate,
    isRegistering: registrarIngresoMutation.isLoading,
    ingresoError: registrarIngresoMutation.error?.message,
    registrarEgreso: registrarEgresoMutation.mutate,
    isRegistrandoEgreso: registrarEgresoMutation.isLoading,
    egresoError: registrarEgresoMutation.error?.message,
  };
}

/**
 * Hook para obtener el historial de movimientos
 */
export function useMovimientos(unidadSanitariaId, filtros = {}) {
  const { data, isLoading, error } = useQuery(
    ['movimientos', unidadSanitariaId, filtros],
    () => (unidadSanitariaId ? fetchMovimientos(unidadSanitariaId, filtros) : null),
    {
      enabled: !!unidadSanitariaId,
      retry: 2,
    }
  );

  return {
    movimientos: data || [],
    loading: isLoading,
    error: error?.message,
  };
}

/**
 * Hook para obtener alertas de stock
 */
export function useAlertasStock(unidadSanitariaId) {
  const {
    data: stockBajo,
    isLoading: loadingBajo,
    error: errorBajo,
  } = useQuery(
    ['stock-bajo', unidadSanitariaId],
    () => (unidadSanitariaId ? fetchStockBajo(unidadSanitariaId) : null),
    {
      enabled: !!unidadSanitariaId,
      retry: 2,
      refetchInterval: 5 * 60 * 1000, // Actualiza cada 5 minutos
    }
  );

  const {
    data: proximosVencer,
    isLoading: loadingVencer,
    error: errorVencer,
  } = useQuery(
    ['proximos-vencer', unidadSanitariaId],
    () =>
      unidadSanitariaId ? fetchProximosAVencer(unidadSanitariaId) : null,
    {
      enabled: !!unidadSanitariaId,
      retry: 2,
      refetchInterval: 5 * 60 * 1000, // Actualiza cada 5 minutos
    }
  );

  return {
    stockBajo: stockBajo || [],
    proximosVencer: proximosVencer || [],
    loading: loadingBajo || loadingVencer,
    error: errorBajo?.message || errorVencer?.message,
    totalAlertas: (stockBajo?.length || 0) + (proximosVencer?.length || 0),
  };
}