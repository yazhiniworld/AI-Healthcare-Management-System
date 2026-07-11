import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === 'DOCTOR' && user.approved === false && location.pathname !== '/verification') {
    return <Navigate to="/verification" replace />;
  }

  return children;
}
