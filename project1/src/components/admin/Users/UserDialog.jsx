import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { useUS } from '../../../hooks/useUS';
import { validateUserForm } from '../../../utils/validation/userValidation';

function UserDialog({ open, user, onClose, onSave }) {
  const { unidadesSanitarias } = useUS();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nombre: '',
    unidadSanitariaId: '',
    rol: 'actor',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        password: '',
        nombre: user.nombre,
        unidadSanitariaId: user.unidadSanitariaId || '',
        rol: user.rol,
      });
    } else {
      setFormData({
        username: '',
        password: '',
        nombre: '',
        unidadSanitariaId: '',
        rol: 'actor',
      });
    }
  }, [user]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    setError(''); // Clear error when user makes changes
  };

  const handleSubmit = () => {
    const validation = validateUserForm(formData, !!user);
    
    if (!validation.isValid) {
      setError(validation.errors[0]); // Show first error
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {user ? 'Editar Usuario' : 'Nuevo Usuario'}
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <TextField
          fullWidth
          label="Usuario"
          value={formData.username}
          onChange={handleChange('username')}
          margin="normal"
          required
        />
        
        <TextField
          fullWidth
          type="password"
          label={user ? 'Nueva Contraseña (dejar vacío para mantener)' : 'Contraseña'}
          value={formData.password}
          onChange={handleChange('password')}
          margin="normal"
          required={!user}
        />
        
        <TextField
          fullWidth
          label="Nombre Completo"
          value={formData.nombre}
          onChange={handleChange('nombre')}
          margin="normal"
          required
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Unidad Sanitaria</InputLabel>
          <Select
            value={formData.unidadSanitariaId}
            onChange={handleChange('unidadSanitariaId')}
            label="Unidad Sanitaria"
          >
            <MenuItem value="">Ninguna</MenuItem>
            {unidadesSanitarias.map((us) => (
              <MenuItem key={us.id} value={us.id}>
                {us.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Rol</InputLabel>
          <Select
            value={formData.rol}
            onChange={handleChange('rol')}
            label="Rol"
          >
            <MenuItem value="actor">Actor</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDialog;