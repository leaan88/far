import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import ActoresUpload from '../../components/admin/FileUpload/ActoresUpload';
import DetenidosUpload from '../../components/admin/FileUpload/DetenidosUpload';

function FileUploads() {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carga de Archivos
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ActoresUpload onSuccess={() => showNotification('Archivo de actores procesado exitosamente')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetenidosUpload onSuccess={() => showNotification('Archivo de detenidos procesado exitosamente')} />
        </Grid>
      </Grid>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={handleClose}
      >
        <Alert 
          onClose={handleClose} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default FileUploads;