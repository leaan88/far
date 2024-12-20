import create from 'zustand';
import { persist } from 'zustand/middleware';
import { isTokenValid, getTokenData } from '../utils/auth/jwtHelper';
import api from '../utils/api';

const useAuth = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      error: null,
      loading: false,

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/auth/login', credentials);
          const { token, user } = response.data;

          if (!isTokenValid(token)) {
            throw new Error('Token inválido');
          }

          set({ 
            user,
            token,
            loading: false,
            error: null
          });

          // Configurar el token en los headers para futuras peticiones
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          return { success: true };
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Error al iniciar sesión',
            loading: false 
          });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        // Limpiar el token de los headers
        delete api.defaults.headers.common['Authorization'];
        set({ user: null, token: null });
      },

      changePassword: async (newPassword, tempToken) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/auth/change-password', 
            { newPassword },
            { headers: { Authorization: `Bearer ${tempToken}` }}
          );
          
          const { token, user } = response.data;
          
          set({ 
            user,
            token,
            loading: false,
            error: null
          });

          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          return { success: true };
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'Error al cambiar la contraseña',
            loading: false 
          });
          return { success: false, error: error.message };
        }
      },

      checkAuth: () => {
        const { token } = get();
        if (!token || !isTokenValid(token)) {
          get().logout();
          return false;
        }
        return true;
      }
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);

export { useAuth };