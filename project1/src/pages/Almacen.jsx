import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import { useStock } from '../hooks/useStock';
import { useAuth } from '../hooks/useAuth';
import StockTable from '../components/Stock/StockTable';
import IngresoForm from '../components/Stock/IngresoForm';

function Almacen() {
  const { user } = useAuth();
  const { 
    stock, 
    loading, 
    error, 
    registrarIngreso, 
    isRegistering 
  } = useStock(user?.unidadSanitariaId);

  const handleIngresoSubmit = (formData) => {
    registrarIngreso({
      ...formData,
      unidadSanitariaId: user.unidadSanitariaId,
      fechaIngreso: new Date().toISOString(),
    });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Almacén
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Registrar Ingreso de Medicamentos
            </Typography>
            <IngresoForm
              onSubmit={handleIngresoSubmit}
              loading={isRegistering}
              error={error}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Stock Actual
            </Typography>
            <StockTable 
              stock={stock}
              loading={loading}
              error={error}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Almacen;