import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import FirstTimePasswordChange from '../components/auth/FirstTimePasswordChange';

function Login() {
  const navigate = useNavigate();
  const { login, changePassword, error, loading } = useAuth();
  const [showPasswordChange, setShowPasswordChange] = React.useState(false);
  const [tempToken, setTempToken] = React.useState('');

  const handleLogin = async (values) => {
    const result = await login(values);
    
    if (result.success) {
      if (result.requirePasswordChange) {
        setTempToken(result.tempToken);
        setShowPasswordChange(true);
      } else {
        navigate(values.username === 'Admin' ? '/admin' : '/');
      }
    }
  };

  const handlePasswordChange = async (values) => {
    const result = await changePassword(values.password, tempToken);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Iniciar Sesión
          </Typography>
          
          <LoginForm 
            onSubmit={handleLogin}
            error={error}
          />
        </Paper>
      </Box>

      <FirstTimePasswordChange
        open={showPasswordChange}
        onSubmit={handlePasswordChange}
        onClose={() => setShowPasswordChange(false)}
      />
    </Container>
  );
}

export default Login;