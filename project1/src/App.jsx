// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import ErrorBoundary from './components/ErrorBoundary';
import { theme } from './theme'; // Tu archivo de tema

// Lazy load de componentes/páginas principales
const Layout = lazy(() => import('./components/Layout'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const DestinosUS = lazy(() => import('./pages/DestinosUS'));
const ActoresSA = lazy(() => import('./pages/ActoresSA'));
const TablaMedicados = lazy(() => import('./pages/TablaMedicados'));
const Almacen = lazy(() => import('./pages/Almacen'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const FileUploads = lazy(() => import('./pages/admin/FileUploads'));
const USStats = lazy(() => import('./pages/admin/USStats'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));

const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const AdminRoute = lazy(() => import('./components/AdminRoute'));

// Ejemplo de página para rutas 404 (si no la tienes, créala en `pages/NotFound.jsx`)
const NotFound = lazy(() => import('./pages/NotFound'));

// Configuración de React Query
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
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="destinos-us" element={<DestinosUS />} />
                  <Route path="actores-sa" element={<ActoresSA />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="tabla-medicados" element={<TablaMedicados />} />
                    <Route path="almacen" element={<Almacen />} />
                  </Route>
                  
                  <Route element={<AdminRoute />}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/uploads" element={<FileUploads />} />
                    <Route path="admin/us-stats" element={<USStats />} />
                    <Route path="admin/users" element={<UserManagement />} />
                  </Route>

                  {/* Ruta 404 */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
