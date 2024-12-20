import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Aquí podrías enviar el error a un servicio de logging
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 3,
            textAlign: 'center',
          }}
        >
          <Alert severity="error" sx={{ mb: 2, maxWidth: 600 }}>
            <Typography variant="h6" component="div" gutterBottom>
              Algo salió mal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {this.state.error?.message || 'Ha ocurrido un error inesperado'}
            </Typography>
          </Alert>

          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Recargar página
          </Button>

          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
            <Box sx={{ mt: 4, textAlign: 'left', maxWidth: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Detalles del error (solo desarrollo):
              </Typography>
              <pre style={{ 
                overflow: 'auto', 
                padding: '1rem',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px'
              }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </Box>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;