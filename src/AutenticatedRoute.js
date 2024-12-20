import React from 'react';
import { Navigate } from 'react-router-dom';

const AutenticatedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default AutenticatedRoute;
