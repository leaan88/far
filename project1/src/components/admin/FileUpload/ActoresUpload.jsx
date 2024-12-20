import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Alert,
  LinearProgress,
  Box
} from '@mui/material';
import FileUploadZone from '../../DragDrop/FileUploadZone';
import { processActoresExcel } from '../../../utils/excelProcessing';
import { uploadActores } from '../../../services/adminService';

const ACCEPTED_FILES = ['.xlsx', '.xls'];

function ActoresUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setError(null);
    setSuccess(false);
    
    try {
      setLoading(true);
      const actores = await processActoresExcel(selectedFile);
      await uploadActores(actores);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Cargar Archivo de Actores
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Archivo de actores procesado exitosamente
        </Alert>
      )}
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          El archivo debe ser Excel (.xlsx, .xls) con la siguiente estructura:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          - Columna A: Unidad Sanitaria (desde fila 2)
          - Columna J: Nombre completo del actor (desde fila 2)
        </Typography>
      </Box>

      <FileUploadZone
        onFileSelect={handleFileSelect}
        acceptedFiles={ACCEPTED_FILES}
        file={file}
      />
      
      {loading && <LinearProgress sx={{ mt: 2 }} />}
    </Paper>
  );
}

export default ActoresUpload;