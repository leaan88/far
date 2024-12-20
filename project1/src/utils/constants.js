export const FILE_TYPES = {
  EXCEL: ['.xlsx', '.xls'],
  CSV: ['.csv'],
  ALL: ['.xlsx', '.xls', '.csv']
};

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  MESSAGES: {
    MIN_LENGTH: 'La contraseña debe tener al menos 8 caracteres',
    MISMATCH: 'Las contraseñas no coinciden'
  }
};