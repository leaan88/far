import React from 'react';
import { Container, Grid, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Administración
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/admin/uploads')}
          >
            <UploadFileIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6">Gestión de Archivos</Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Cargar archivos de actores y detenidos
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/admin/us-stats')}
          >
            <AssessmentIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6">Estadísticas US</Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Ver estadísticas por Unidad Sanitaria
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/admin/users')}
          >
            <PeopleIcon sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6">Gestión de Usuarios</Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Administrar usuarios y permisos
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;