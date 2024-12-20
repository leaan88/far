import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchStock,
  registrarIngreso as registrarIngresoApi,
} from '../services/stockService';

export function useStock(unidadSanitariaId) {
  const queryClient = useQueryClient();

  const { data: stock, isLoading, error } = useQuery(
    ['stock', unidadSanitariaId],
    () => unidadSanitariaId ? fetchStock(unidadSanitariaId) : null,
    {
      enabled: !!unidadSanitariaId,
      retry: 2,
      onError: (error) => {
        console.error('Error fetching stock:', error);
      }
    }
  );

  const registrarIngresoMutation = useMutation(registrarIngresoApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['stock', unidadSanitariaId]);
    },
    onError: (error) => {
      console.error('Error registering ingreso:', error);
    }
  });

  return {
    stock: stock || [],
    loading: isLoading,
    error: error?.message,
    registrarIngreso: registrarIngresoMutation.mutate,
    isRegistering: registrarIngresoMutation.isLoading
  };
}