
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Buildings from '../pages/Buildings';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/buildings" element={<Buildings />} />
        {/* Add other protected routes here */}
      </Route>
      {/* Add other public routes here */}
    </Routes>
  );
};

export default AppRoutes;
