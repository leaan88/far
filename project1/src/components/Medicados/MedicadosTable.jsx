import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Paper,
  Alert,
  CircularProgress,
  Box
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function MedicadosTable({ detenidos, onEntregaMedicamento, loading, error }) {
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
            <TableCell>Detenido</TableCell>
            <TableCell>Medicamento</TableCell>
            <TableCell>Dosis Diaria</TableCell>
            <TableCell>Cantidad Entregada</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detenidos.map((detenido) =>
            detenido.medicamentos.map((medicamento) => (
              <TableRow key={`${detenido.id}-${medicamento.id}`}>
                <TableCell>{detenido.nombre}</TableCell>
                <TableCell>{medicamento.nombre}</TableCell>
                <TableCell>{medicamento.cantidadDiaria}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    inputProps={{ 
                      min: 0, 
                      max: medicamento.cantidadDiaria 
                    }}
                    onChange={(e) =>
                      onEntregaMedicamento(
                        detenido.id,
                        medicamento.id,
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <SaveIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
          {detenidos.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No hay detenidos registrados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MedicadosTable;