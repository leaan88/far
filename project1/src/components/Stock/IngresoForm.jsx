import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Autocomplete,
  MenuItem,
} from '@mui/material';
import { useMedicamentos } from '../../hooks/useMedicamentos';

function IngresoForm({ onSubmit, loading, error }) {
  const { medicamentos, loading: loadingMedicamentos } = useMedicamentos();

  const [formData, setFormData] = useState({
    medicamentoId: null,
    lote: '',
    fechaVencimiento: '',
    cantidad: '',
    precioUnitario: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      medicamentoId: formData.medicamentoId?.id || '',
      cantidad: parseInt(formData.cantidad),
      precioUnitario: parseFloat(formData.precioUnitario) || 0,
    });
    setFormData({
      medicamentoId: null,
      lote: '',
      fechaVencimiento: '',
      cantidad: '',
      precioUnitario: '',
    });
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
          <Autocomplete
            value={formData.medicamentoId}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                medicamentoId: newValue,
              });
            }}
            options={medicamentos}
            getOptionLabel={(option) =>
              `${option.nombreComercial} - ${option.presentacion}`
            }
            loading={loadingMedicamentos}
            disabled={loading || loadingMedicamentos}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Medicamento"
                required
                helperText="Seleccione el medicamento del catálogo"
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <div>
                  <strong>{option.nombreComercial}</strong>
                  <br />
                  <small>
                    {option.principioActivo} - {option.presentacion} (
                    {option.codigoInterno})
                  </small>
                </div>
              </li>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Número de Lote"
            value={formData.lote}
            onChange={(e) =>
              setFormData({
                ...formData,
                lote: e.target.value,
              })
            }
            required
            disabled={loading}
            helperText="Ej: LOT-2024-001"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Fecha de Vencimiento"
            value={formData.fechaVencimiento}
            onChange={(e) =>
              setFormData({
                ...formData,
                fechaVencimiento: e.target.value,
              })
            }
            InputLabelProps={{
              shrink: true,
            }}
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
            inputProps={{ min: 1 }}
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Precio Unitario"
            value={formData.precioUnitario}
            onChange={(e) =>
              setFormData({
                ...formData,
                precioUnitario: e.target.value,
              })
            }
            inputProps={{ min: 0, step: 0.01 }}
            disabled={loading}
            helperText="Opcional"
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