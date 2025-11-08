import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchMedicamentos,
  fetchMedicamentoById,
  createMedicamento,
  updateMedicamento,
  deleteMedicamento,
  searchMedicamentos,
} from '../services/medicamentosService';

/**
 * Hook para obtener todos los medicamentos
 */
export function useMedicamentos() {
  const { data, isLoading, error } = useQuery(
    'medicamentos',
    fetchMedicamentos,
    {
      staleTime: 5 * 60 * 1000, // 5 minutos
    }
  );

  return {
    medicamentos: data || [],
    loading: isLoading,
    error: error?.message,
  };
}

/**
 * Hook para obtener un medicamento específico por ID
 */
export function useMedicamento(id) {
  const { data, isLoading, error } = useQuery(
    ['medicamento', id],
    () => fetchMedicamentoById(id),
    {
      enabled: !!id,
    }
  );

  return {
    medicamento: data,
    loading: isLoading,
    error: error?.message,
  };
}

/**
 * Hook para crear, actualizar y eliminar medicamentos
 */
export function useMedicamentoMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation(createMedicamento, {
    onSuccess: () => {
      queryClient.invalidateQueries('medicamentos');
    },
  });

  const updateMutation = useMutation(
    ({ id, data }) => updateMedicamento(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('medicamentos');
      },
    }
  );

  const deleteMutation = useMutation(deleteMedicamento, {
    onSuccess: () => {
      queryClient.invalidateQueries('medicamentos');
    },
  });

  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
    isCreating: createMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
    createError: createMutation.error?.message,
    updateError: updateMutation.error?.message,
    deleteError: deleteMutation.error?.message,
  };
}

/**
 * Hook para buscar medicamentos
 */
export function useSearchMedicamentos(query) {
  const { data, isLoading, error } = useQuery(
    ['medicamentos', 'search', query],
    () => searchMedicamentos(query),
    {
      enabled: query.length > 0,
      staleTime: 1 * 60 * 1000, // 1 minuto
    }
  );

  return {
    medicamentos: data || [],
    loading: isLoading,
    error: error?.message,
  };
}
