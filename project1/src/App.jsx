import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Importa tu tema MUI
import { theme } from './theme';

// Lazy load de todas las páginas y componentes “pesados”
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

// Rutas protegidas y de admin
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Página 404 (crea un archivo NotFound.jsx dentro de pages)
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000,  // 5 min
      cacheTime: 10 * 60 * 1000, // 10 min
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
            {/* Suspense para manejar cargas diferidas */}
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/login" element={<Login />} />
                
                {/* Layout principal */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="destinos-us" element={<DestinosUS />} />
                  <Route path="actores-sa" element={<ActoresSA />} />
                  
                  {/* Rutas protegidas */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="tabla-medicados" element={<TablaMedicados />} />
                    <Route path="almacen" element={<Almacen />} />
                  </Route>

                  {/* Rutas de administrador */}
                  <Route element={<AdminRoute />}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/uploads" element={<FileUploads />} />
                    <Route path="admin/us-stats" element={<USStats />} />
                    <Route path="admin/users" element={<UserManagement />} />
                  </Route>

                  {/* Ruta para 404: cualquier path no definido llega aquí */}
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
