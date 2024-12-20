import { useQuery, useMutation, useQueryClient } from 'react-query';
import { 
  fetchUsers, 
  createUser as createUserApi,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi
} from '../services/userService';

export function useUsers() {
  const queryClient = useQueryClient();

  const { data: users, isLoading, error } = useQuery(
    'users',
    fetchUsers,
    {
      select: (data) => data?.map(user => ({
        ...user,
        unidadSanitaria: user.unidadSanitariaId 
          ? { id: user.unidadSanitariaId, nombre: user.unidadSanitariaNombre }
          : null
      }))
    }
  );

  const createMutation = useMutation(createUserApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });

  const updateMutation = useMutation(updateUserApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });

  const deleteMutation = useMutation(deleteUserApi, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });

  return {
    users: users || [],
    loading: isLoading,
    error: error?.message,
    createUser: createMutation.mutate,
    updateUser: updateMutation.mutate,
    deleteUser: deleteMutation.mutate,
  };
}