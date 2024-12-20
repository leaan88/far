import React from 'react';
import { Route } from 'react-router-dom';
import AdminRoute from '../components/AdminRoute';
import AdminDashboard from '../pages/admin/Dashboard';
import FileUploads from '../pages/admin/FileUploads';
import USStats from '../pages/admin/USStats';
import UserManagement from '../pages/admin/UserManagement';

export function AdminRoutes() {
  return (
    <Route element={<AdminRoute />}>
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="admin/uploads" element={<FileUploads />} />
      <Route path="admin/us-stats" element={<USStats />} />
      <Route path="admin/users" element={<UserManagement />} />
    </Route>
  );
}