import React, { useState, useMemo } from 'react';
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

function EgresoForm({ stock, onSubmit, loading, error }) {
  const { medicamentos, loading: loadingMedicamentos } = useMedicamentos();

  const [formData, setFormData] = useState({
    stockItem: null,
    cantidad: '',
    motivo: '',
    observaciones: '',
  });

  // Crear opciones de stock disponible combinando con info del catálogo
  const stockOptions = useMemo(() => {
    const medicamentosMap = {};
    medicamentos.forEach((med) => {
      medicamentosMap[med.id] = med;
    });

    return stock
      .filter((item) => item.cantidad > 0)
      .map((item) => {
        const medicamento = medicamentosMap[item.medicamentoId];
        return {
          ...item,
          medicamento,
          label: medicamento
            ? `${medicamento.nombreComercial} - Lote: ${item.lote} (${item.cantidad} disponibles)`
            : `ID: ${item.medicamentoId} - Lote: ${item.lote} (${item.cantidad} disponibles)`,
        };
      });
  }, [stock, medicamentos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que la cantidad no supere el stock disponible
    if (
      formData.stockItem &&
      parseInt(formData.cantidad) > formData.stockItem.cantidad
    ) {
      alert(
        `La cantidad no puede ser mayor al stock disponible (${formData.stockItem.cantidad})`
      );
      return;
    }

    onSubmit({
      stockId: formData.stockItem.id,
      medicamentoId: formData.stockItem.medicamentoId,
      lote: formData.stockItem.lote,
      cantidad: parseInt(formData.cantidad),
      motivo: formData.motivo,
      observaciones: formData.observaciones,
    });

    setFormData({
      stockItem: null,
      cantidad: '',
      motivo: '',
      observaciones: '',
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
            value={formData.stockItem}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                stockItem: newValue,
                cantidad: '',
              });
            }}
            options={stockOptions}
            getOptionLabel={(option) => option.label}
            loading={loadingMedicamentos}
            disabled={loading || loadingMedicamentos}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Medicamento y Lote"
                required
                helperText="Seleccione el medicamento y lote del stock"
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <div>
                  {option.medicamento && (
                    <>
                      <strong>{option.medicamento.nombreComercial}</strong>
                      <br />
                    </>
                  )}
                  <small>
                    Lote: {option.lote} | Disponible: {option.cantidad} |
                    Vence: {new Date(option.fechaVencimiento).toLocaleDateString()}
                  </small>
                </div>
              </li>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Cantidad a Retirar"
            value={formData.cantidad}
            onChange={(e) =>
              setFormData({
                ...formData,
                cantidad: e.target.value,
              })
            }
            inputProps={{
              min: 1,
              max: formData.stockItem?.cantidad || 999999,
            }}
            required
            disabled={loading || !formData.stockItem}
            helperText={
              formData.stockItem
                ? `Disponible: ${formData.stockItem.cantidad}`
                : 'Primero seleccione un medicamento'
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Motivo del Egreso"
            value={formData.motivo}
            onChange={(e) =>
              setFormData({
                ...formData,
                motivo: e.target.value,
              })
            }
            required
            disabled={loading}
          >
            <MenuItem value="entrega_paciente">Entrega a Paciente</MenuItem>
            <MenuItem value="transferencia">Transferencia</MenuItem>
            <MenuItem value="vencimiento">Vencimiento</MenuItem>
            <MenuItem value="deterioro">Deterioro/Daño</MenuItem>
            <MenuItem value="ajuste">Ajuste de Inventario</MenuItem>
            <MenuItem value="otro">Otro</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Observaciones"
            value={formData.observaciones}
            onChange={(e) =>
              setFormData({
                ...formData,
                observaciones: e.target.value,
              })
            }
            disabled={loading}
            helperText="Opcional - Agregar detalles adicionales"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Registrar Egreso'
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default EgresoForm;
