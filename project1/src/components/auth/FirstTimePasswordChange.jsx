import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from '@mui/material';

function FirstTimePasswordChange({ open, onSubmit, onClose }) {
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (passwords.password !== passwords.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (passwords.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    onSubmit(passwords.password);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cambiar Contraseña</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          fullWidth
          type="password"
          label="Nueva Contraseña"
          margin="normal"
          value={passwords.password}
          onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
        />
        <TextField
          fullWidth
          type="password"
          label="Confirmar Contraseña"
          margin="normal"
          value={passwords.confirmPassword}
          onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained">
          Guardar Contraseña
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FirstTimePasswordChange;