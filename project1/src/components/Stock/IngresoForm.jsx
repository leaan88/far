import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';

function IngresoForm({ onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    medicamentoId: '',
    cantidad: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ medicamentoId: '', cantidad: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Medicamento"
            value={formData.medicamentoId}
            onChange={(e) =>
              setFormData({
                ...formData,
                medicamentoId: e.target.value,
              })
            }
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="number"
            label="Cantidad"
            value={formData.cantidad}
            onChange={(e) =>
              setFormData({
                ...formData,
                cantidad: e.target.value,
              })
            }
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Registrar Ingreso'
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default IngresoForm;