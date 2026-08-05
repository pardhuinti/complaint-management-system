import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedStudentRoute = ({ children }) => {
  const { isAuthenticated, isStudent } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/student-login" replace />;
  }

  if (!isStudent) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

export default ProtectedStudentRoute;
