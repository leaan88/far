import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
  Box,
  Chip,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useMedicamentos } from '../../hooks/useMedicamentos';

function StockTable({ stock, loading, error }) {
  const { medicamentos, loading: loadingMedicamentos } = useMedicamentos();

  // Mapeo de medicamentos para búsqueda rápida
  const medicamentosMap = useMemo(() => {
    const map = {};
    medicamentos.forEach((med) => {
      map[med.id] = med;
    });
    return map;
  }, [medicamentos]);

  // Función para determinar el estado del stock
  const getStockStatus = (item, medicamento) => {
    if (!medicamento) return 'ok';

    const cantidad = item.cantidad;
    const stockMinimo = medicamento.stockMinimo || 0;

    if (cantidad === 0) return 'agotado';
    if (cantidad < stockMinimo) return 'bajo';
    if (cantidad < stockMinimo * 2) return 'advertencia';
    return 'ok';
  };

  // Función para determinar el estado del vencimiento
  const getVencimientoStatus = (fechaVencimiento) => {
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diasRestantes = Math.ceil(
      (vencimiento - hoy) / (1000 * 60 * 60 * 24)
    );

    if (diasRestantes < 0) return 'vencido';
    if (diasRestantes <= 30) return 'proximo';
    if (diasRestantes <= 90) return 'advertencia';
    return 'ok';
  };

  // Función para obtener el color de la fila según los estados
  const getRowColor = (stockStatus, vencimientoStatus) => {
    if (stockStatus === 'agotado' || vencimientoStatus === 'vencido')
      return '#ffebee';
    if (stockStatus === 'bajo' || vencimientoStatus === 'proximo')
      return '#fff3e0';
    if (stockStatus === 'advertencia' || vencimientoStatus === 'advertencia')
      return '#fff9c4';
    return 'transparent';
  };

  if (loading || loadingMedicamentos) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Medicamento</strong>
            </TableCell>
            <TableCell>
              <strong>Lote</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Cantidad</strong>
            </TableCell>
            <TableCell>
              <strong>Vencimiento</strong>
            </TableCell>
            <TableCell>
              <strong>Último Ingreso</strong>
            </TableCell>
            <TableCell align="center">
              <strong>Estado</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stock.map((item) => {
            const medicamento = medicamentosMap[item.medicamentoId];
            const stockStatus = getStockStatus(item, medicamento);
            const vencimientoStatus = getVencimientoStatus(
              item.fechaVencimiento
            );
            const rowColor = getRowColor(stockStatus, vencimientoStatus);

            return (
              <TableRow
                key={item.id}
                sx={{
                  backgroundColor: rowColor,
                  '&:hover': {
                    backgroundColor:
                      rowColor !== 'transparent'
                        ? rowColor
                        : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <TableCell>
                  {medicamento ? (
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {medicamento.nombreComercial}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {medicamento.presentacion}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      ID: {item.medicamentoId}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{item.lote}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body1"
                    fontWeight={stockStatus !== 'ok' ? 'bold' : 'normal'}
                    color={
                      stockStatus === 'agotado'
                        ? 'error'
                        : stockStatus === 'bajo'
                        ? 'warning.dark'
                        : 'inherit'
                    }
                  >
                    {item.cantidad}
                  </Typography>
                  {medicamento && (
                    <Typography variant="caption" color="text.secondary">
                      Min: {medicamento.stockMinimo}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color={
                      vencimientoStatus === 'vencido'
                        ? 'error'
                        : vencimientoStatus === 'proximo'
                        ? 'warning.dark'
                        : 'inherit'
                    }
                  >
                    {new Date(item.fechaVencimiento).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(item.fechaIngreso).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    {/* Alerta de stock */}
                    {stockStatus === 'agotado' && (
                      <Tooltip title="Stock agotado">
                        <ErrorIcon color="error" fontSize="small" />
                      </Tooltip>
                    )}
                    {stockStatus === 'bajo' && (
                      <Tooltip title="Stock bajo mínimo">
                        <WarningIcon color="warning" fontSize="small" />
                      </Tooltip>
                    )}
                    {stockStatus === 'advertencia' && (
                      <Tooltip title="Stock cercano al mínimo">
                        <WarningIcon color="action" fontSize="small" />
                      </Tooltip>
                    )}

                    {/* Alerta de vencimiento */}
                    {vencimientoStatus === 'vencido' && (
                      <Tooltip title="Medicamento vencido">
                        <ErrorIcon color="error" fontSize="small" />
                      </Tooltip>
                    )}
                    {vencimientoStatus === 'proximo' && (
                      <Tooltip title="Vence en menos de 30 días">
                        <WarningIcon color="warning" fontSize="small" />
                      </Tooltip>
                    )}
                    {vencimientoStatus === 'advertencia' && (
                      <Tooltip title="Vence en menos de 90 días">
                        <WarningIcon color="action" fontSize="small" />
                      </Tooltip>
                    )}

                    {/* Ícono de OK si todo está bien */}
                    {stockStatus === 'ok' && vencimientoStatus === 'ok' && (
                      <Tooltip title="Stock OK">
                        <CheckCircleIcon color="success" fontSize="small" />
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
          {stock.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography variant="body2" color="text.secondary" py={3}>
                  No hay items en el stock
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StockTable;