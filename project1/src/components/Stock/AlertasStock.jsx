import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useAlertasStock } from '../../hooks/useStock';
import { useMedicamentos } from '../../hooks/useMedicamentos';

function AlertasStock({ unidadSanitariaId }) {
  const { stockBajo, proximosVencer, loading, error, totalAlertas } =
    useAlertasStock(unidadSanitariaId);
  const { medicamentos } = useMedicamentos();

  // Mapeo de medicamentos
  const medicamentosMap = React.useMemo(() => {
    const map = {};
    medicamentos.forEach((med) => {
      map[med.id] = med;
    });
    return map;
  }, [medicamentos]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Error al cargar alertas: {error}
      </Alert>
    );
  }

  if (totalAlertas === 0) {
    return (
      <Alert severity="success" sx={{ mb: 2 }}>
        <AlertTitle>Stock en buen estado</AlertTitle>
        No hay alertas de stock bajo o medicamentos próximos a vencer.
      </Alert>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      {/* Resumen de alertas */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: '#fff3e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="warning" />
          <Typography variant="h6" color="warning.dark">
            {totalAlertas} Alerta{totalAlertas !== 1 ? 's' : ''} de Stock
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {stockBajo.length > 0 &&
            `${stockBajo.length} medicamento${
              stockBajo.length !== 1 ? 's' : ''
            } con stock bajo`}
          {stockBajo.length > 0 && proximosVencer.length > 0 && ' • '}
          {proximosVencer.length > 0 &&
            `${proximosVencer.length} medicamento${
              proximosVencer.length !== 1 ? 's' : ''
            } próximo${proximosVencer.length !== 1 ? 's' : ''} a vencer`}
        </Typography>
      </Paper>

      {/* Stock Bajo */}
      {stockBajo.length > 0 && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ErrorIcon color="error" />
              <Typography fontWeight="bold">
                Stock Bajo o Agotado ({stockBajo.length})
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {stockBajo.map((item) => {
                const medicamento = medicamentosMap[item.medicamentoId];
                const stockMinimo = medicamento?.stockMinimo || 0;
                const porcentaje =
                  stockMinimo > 0
                    ? Math.round((item.cantidad / stockMinimo) * 100)
                    : 0;

                return (
                  <ListItem
                    key={item.id}
                    sx={{
                      backgroundColor:
                        item.cantidad === 0 ? '#ffebee' : '#fff3e0',
                      mb: 1,
                      borderRadius: 1,
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          {medicamento?.nombreComercial ||
                            `ID: ${item.medicamentoId}`}
                          <Chip
                            label={
                              item.cantidad === 0
                                ? 'AGOTADO'
                                : `${porcentaje}% del mínimo`
                            }
                            color={item.cantidad === 0 ? 'error' : 'warning'}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          Lote: {item.lote} | Stock actual: {item.cantidad} |
                          Mínimo requerido: {stockMinimo}
                          <br />
                          {medicamento?.presentacion}
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Próximos a Vencer */}
      {proximosVencer.length > 0 && (
        <Accordion defaultExpanded sx={{ mt: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WarningIcon color="warning" />
              <Typography fontWeight="bold">
                Próximos a Vencer ({proximosVencer.length})
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {proximosVencer.map((item) => {
                const medicamento = medicamentosMap[item.medicamentoId];
                const hoy = new Date();
                const vencimiento = new Date(item.fechaVencimiento);
                const diasRestantes = Math.ceil(
                  (vencimiento - hoy) / (1000 * 60 * 60 * 24)
                );
                const vencido = diasRestantes < 0;

                return (
                  <ListItem
                    key={item.id}
                    sx={{
                      backgroundColor: vencido ? '#ffebee' : '#fff9c4',
                      mb: 1,
                      borderRadius: 1,
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          {medicamento?.nombreComercial ||
                            `ID: ${item.medicamentoId}`}
                          <Chip
                            label={
                              vencido
                                ? 'VENCIDO'
                                : `${diasRestantes} día${
                                    diasRestantes !== 1 ? 's' : ''
                                  }`
                            }
                            color={vencido ? 'error' : 'warning'}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          Lote: {item.lote} | Vencimiento:{' '}
                          {vencimiento.toLocaleDateString()} | Cantidad:{' '}
                          {item.cantidad}
                          <br />
                          {medicamento?.presentacion}
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}

export default AlertasStock;
