import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import UserList from '../../components/admin/Users/UserList';
import { useUsers } from '../../hooks/useUsers';

function UserManagement() {
  const { 
    users, 
    loading, 
    error,
    updateUser,
    createUser,
    deleteUser 
  } = useUsers();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>
      <Paper sx={{ p: 3 }}>
        <UserList
          users={users}
          loading={loading}
          error={error}
          onUpdateUser={updateUser}
          onCreateUser={createUser}
          onDeleteUser={deleteUser}
        />
      </Paper>
    </Container>
  );
}

export default UserManagement;