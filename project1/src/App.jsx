import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import DestinosUS from './pages/DestinosUS';
import ActoresSA from './pages/ActoresSA';
import TablaMedicados from './pages/TablaMedicados';
import Almacen from './pages/Almacen';
import AdminDashboard from './pages/admin/Dashboard';
import FileUploads from './pages/admin/FileUploads';
import USStats from './pages/admin/USStats';
import UserManagement from './pages/admin/UserManagement';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="destinos-us" element={<DestinosUS />} />
                <Route path="actores-sa" element={<ActoresSA />} />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="tabla-medicados" element={<TablaMedicados />} />
                  <Route path="almacen" element={<Almacen />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="admin/uploads" element={<FileUploads />} />
                  <Route path="admin/us-stats" element={<USStats />} />
                  <Route path="admin/users" element={<UserManagement />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;