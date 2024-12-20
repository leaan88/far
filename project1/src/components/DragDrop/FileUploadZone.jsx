import React, { useCallback } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function FileUploadZone({ onFileSelect, acceptedFiles, file }) {
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const fileExtension = droppedFile.name.split('.').pop().toLowerCase();
      if (acceptedFiles.includes(`.${fileExtension}`)) {
        onFileSelect(droppedFile);
      }
    }
  }, [onFileSelect, acceptedFiles]);

  const onClick = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptedFiles.join(',');
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        onFileSelect(file);
      }
    };
    input.click();
  }, [onFileSelect, acceptedFiles]);

  return (
    <Paper
      sx={{
        border: '2px dashed #ccc',
        borderRadius: 2,
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        bgcolor: 'background.default',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
    >
      <Box sx={{ mb: 2 }}>
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
      </Box>
      {file ? (
        <Box>
          <Typography variant="subtitle1" color="primary">
            Archivo seleccionado:
          </Typography>
          <Typography>{file.name}</Typography>
        </Box>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Arrastra y suelta un archivo aquí
          </Typography>
          <Typography variant="body2" color="text.secondary">
            o haz clic para seleccionar
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Formatos aceptados: {acceptedFiles.join(', ')}
          </Typography>
        </>
      )}
    </Paper>
  );
}

export default FileUploadZone;