import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { useDetenidos } from '../hooks/useDetenidos';
import { useAuth } from '../hooks/useAuth';
import MedicadosTable from '../components/Medicados/MedicadosTable';
import DateSelector from '../components/Medicados/DateSelector';

function TablaMedicados() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useAuth();
  const { 
    detenidos, 
    loading, 
    error, 
    registrarMedicacion,
    isRegistering 
  } = useDetenidos(user?.unidadSanitariaId);

  const handleEntregaMedicamento = (detenidoId, medicamentoId, cantidad) => {
    registrarMedicacion({
      detenidoId,
      medicamentoId,
      fecha: selectedDate.toISOString(),
      cantidadEntregada: Number(cantidad),
    });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Tabla de Medicados
      </Typography>
      <Box sx={{ mb: 3 }}>
        <DateSelector
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </Box>
      <Paper sx={{ p: 2 }}>
        <MedicadosTable
          detenidos={detenidos}
          onEntregaMedicamento={handleEntregaMedicamento}
          loading={loading || isRegistering}
          error={error}
        />
      </Paper>
    </Container>
  );
}

export default TablaMedicados;