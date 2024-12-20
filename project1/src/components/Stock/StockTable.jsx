import React from 'react';
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
  Box
} from '@mui/material';

function StockTable({ stock, loading, error }) {
  if (loading) {
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Medicamento</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell>Último Ingreso</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stock.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.medicamentoId}</TableCell>
              <TableCell align="right">{item.cantidad}</TableCell>
              <TableCell>
                {new Date(item.fechaIngreso).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
          {stock.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No hay items en el stock
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StockTable;