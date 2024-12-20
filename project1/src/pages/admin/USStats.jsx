import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { useUS } from '../../hooks/useUS';
import { useStock } from '../../hooks/useStock';

function USStats() {
  const [selectedUS, setSelectedUS] = useState('');
  const { unidadesSanitarias, loading: loadingUS } = useUS();
  const { stock, loading: loadingStock } = useStock(selectedUS);

  const handleUSChange = (event) => {
    setSelectedUS(event.target.value);
  };

  const getLowStockItems = () => {
    return stock?.filter(item => item.cantidad < 10) || [];
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Estadísticas por Unidad Sanitaria
      </Typography>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Seleccionar Unidad Sanitaria</InputLabel>
        <Select
          value={selectedUS}
          label="Seleccionar Unidad Sanitaria"
          onChange={handleUSChange}
        >
          {unidadesSanitarias?.map((us) => (
            <MenuItem key={us.id} value={us.id}>
              {us.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedUS && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Información General
              </Typography>
              <Typography>
                Actor a cargo: {unidadesSanitarias.find(us => us.id === selectedUS)?.actorNombre || 'Sin asignar'}
              </Typography>
              <Typography>
                Cantidad de detenidos: {unidadesSanitarias.find(us => us.id === selectedUS)?.detenidosCount || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Alertas de Stock
              </Typography>
              {getLowStockItems().map(item => (
                <Alert severity="warning" key={item.id} sx={{ mb: 1 }}>
                  Stock bajo: {item.medicamentoNombre} - Quedan {item.cantidad} unidades
                </Alert>
              ))}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default USStats;