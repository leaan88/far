import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  Box,
  Badge,
} from '@mui/material';
import {
  AddCircle as AddIcon,
  RemoveCircle as RemoveIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { useStock, useAlertasStock } from '../hooks/useStock';
import { useAuth } from '../hooks/useAuth';
import StockTable from '../components/Stock/StockTable';
import IngresoForm from '../components/Stock/IngresoForm';
import EgresoForm from '../components/Stock/EgresoForm';
import AlertasStock from '../components/Stock/AlertasStock';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

function Almacen() {
  const { user } = useAuth();
  const {
    stock,
    loading,
    error,
    registrarIngreso,
    isRegistering,
    ingresoError,
    registrarEgreso,
    isRegistrandoEgreso,
    egresoError,
  } = useStock(user?.unidadSanitariaId);

  const { totalAlertas } = useAlertasStock(user?.unidadSanitariaId);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleIngresoSubmit = (formData) => {
    registrarIngreso({
      ...formData,
      unidadSanitariaId: user.unidadSanitariaId,
    });
  };

  const handleEgresoSubmit = (formData) => {
    registrarEgreso({
      ...formData,
      unidadSanitariaId: user.unidadSanitariaId,
    });
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Almacén
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Control de ingresos, egresos y stock de medicamentos
        </Typography>
      </Box>

      {/* Panel de Alertas */}
      <AlertasStock unidadSanitariaId={user?.unidadSanitariaId} />

      <Grid container spacing={3}>
        {/* Panel de formularios (Izquierda) */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 2 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
            >
              <Tab icon={<AddIcon />} label="Ingreso" iconPosition="start" />
              <Tab icon={<RemoveIcon />} label="Egreso" iconPosition="start" />
            </Tabs>

            <TabPanel value={activeTab} index={0}>
              <Typography variant="h6" gutterBottom>
                Registrar Ingreso de Medicamentos
              </Typography>
              <IngresoForm
                onSubmit={handleIngresoSubmit}
                loading={isRegistering}
                error={ingresoError}
              />
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <Typography variant="h6" gutterBottom>
                Registrar Egreso de Medicamentos
              </Typography>
              <EgresoForm
                stock={stock}
                onSubmit={handleEgresoSubmit}
                loading={isRegistrandoEgreso}
                error={egresoError}
              />
            </TabPanel>
          </Paper>
        </Grid>

        {/* Panel de stock (Derecha) */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InventoryIcon />
                <Typography variant="h6">Stock Actual</Typography>
              </Box>
              {totalAlertas > 0 && (
                <Badge badgeContent={totalAlertas} color="error">
                  <Typography variant="caption" color="error">
                    Alertas
                  </Typography>
                </Badge>
              )}
            </Box>
            <StockTable stock={stock} loading={loading} error={error} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Almacen;