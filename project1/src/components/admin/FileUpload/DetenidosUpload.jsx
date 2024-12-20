import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Alert,
  LinearProgress,
  Box
} from '@mui/material';
import FileUploadZone from '../../DragDrop/FileUploadZone';
import { useFileUpload } from '../../../hooks/useFileUpload';

const ACCEPTED_FILES = ['.xlsx', '.xls'];

function DetenidosUpload({ onSuccess }) {
  const [file, setFile] = useState(null);
  const { uploadFile, loading, error, success } = useFileUpload();

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    try {
      await uploadFile('detenidos', selectedFile);
      onSuccess?.();
    } catch (err) {
      console.error('Error uploading detenidos:', err);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Cargar Archivo de Detenidos
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Archivo de detenidos procesado exitosamente
        </Alert>
      )}
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          El archivo debe ser Excel (.xlsx, .xls) con la siguiente estructura:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          - Nombre del detenido
          - Unidad Sanitaria asignada
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

export default DetenidosUpload;