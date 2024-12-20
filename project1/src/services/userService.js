import api from '../utils/api';

const mockUsers = [
  {
    id: '1',
    username: 'Admin',
    nombre: 'Administrador',
    rol: 'admin',
  },
  {
    id: '2',
    username: 'actor1',
    nombre: 'Juan Pérez',
    unidadSanitariaId: 'us1',
    unidadSanitariaNombre: 'Unidad Sanitaria 1',
    rol: 'actor',
  },
];

const isDev = import.meta.env.DEV;

export async function fetchUsers() {
  if (isDev) {
    return mockUsers;
  }
  const response = await api.get('/users');
  return response.data;
}

export async function createUser(userData) {
  if (isDev) {
    console.log('Creating user:', userData);
    return { ...userData, id: Date.now().toString() };
  }
  const response = await api.post('/users', userData);
  return response.data;
}

export async function updateUser(userData) {
  if (isDev) {
    console.log('Updating user:', userData);
    return userData;
  }
  const response = await api.put(`/users/${userData.id}`, userData);
  return response.data;
}

export async function deleteUser(userId) {
  if (isDev) {
    console.log('Deleting user:', userId);
    return { success: true };
  }
  const response = await api.delete(`/users/${userId}`);
  return response.data;
}