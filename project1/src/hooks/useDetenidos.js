import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchDetenidos,
  registrarMedicacion as registrarMedicacionApi,
} from '../services/detenidosService';

export function useDetenidos(unidadSanitariaId) {
  const queryClient = useQueryClient();

  const { data: detenidos, isLoading, error } = useQuery(
    ['detenidos', unidadSanitariaId],
    () => unidadSanitariaId ? fetchDetenidos(unidadSanitariaId) : null,
    {
      enabled: !!unidadSanitariaId,
      retry: 2,
      onError: (error) => {
        console.error('Error fetching detenidos:', error);
      }
    }
  );

  const registrarMedicacionMutation = useMutation(registrarMedicacionApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detenidos', unidadSanitariaId]);
      queryClient.invalidateQueries(['stock', unidadSanitariaId]);
    },
    onError: (error) => {
      console.error('Error registering medicacion:', error);
    }
  });

  return {
    detenidos: detenidos || [],
    loading: isLoading,
    error: error?.message,
    registrarMedicacion: registrarMedicacionMutation.mutate,
    isRegistering: registrarMedicacionMutation.isLoading
  };
}