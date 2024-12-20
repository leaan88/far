import { PASSWORD_REQUIREMENTS } from '../constants';

export const validateUserForm = (formData, isEditing = false) => {
  const errors = [];

  if (!formData.username) {
    errors.push('El nombre de usuario es requerido');
  }

  if (!isEditing && !formData.password) {
    errors.push('La contraseña es requerida');
  }

  if (formData.password && formData.password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    errors.push(PASSWORD_REQUIREMENTS.MESSAGES.MIN_LENGTH);
  }

  if (!formData.nombre) {
    errors.push('El nombre completo es requerido');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};