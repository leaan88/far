import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import DestinosUS from '../pages/DestinosUS';
import ActoresSA from '../pages/ActoresSA';
import TablaMedicados from '../pages/TablaMedicados';
import Almacen from '../pages/Almacen';
import { AdminRoutes } from './AdminRoutes';
import ProtectedRoute from '../components/ProtectedRoute';

export function AppRoutes() {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route index element={<Home />} />
      <Route path="destinos-us" element={<DestinosUS />} />
      <Route path="actores-sa" element={<ActoresSA />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="tabla-medicados" element={<TablaMedicados />} />
        <Route path="almacen" element={<Almacen />} />
      </Route>

      {/* Admin Routes */}
      <AdminRoutes />
    </>
  );
}