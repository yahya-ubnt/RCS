
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Buildings from '../pages/Buildings';
import Agents from '../pages/Agents';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/buildings" element={<Buildings />} />
      <Route path="/agents" element={<Agents />} />
      {/* Add other routes here */}
    </Routes>
  );
};

export default AppRoutes;
