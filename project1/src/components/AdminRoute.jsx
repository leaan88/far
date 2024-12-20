import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ADMIN_CREDENTIALS } from '../constants/admin';

function AdminRoute() {
  const { user } = useAuth();

  if (!user || user.username !== ADMIN_CREDENTIALS.username) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;