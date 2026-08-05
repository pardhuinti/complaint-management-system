import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const [loading, setLoading] = useState(false);

  // Student Login
  const loginStudent = async (email, password) => {
    setLoading(true);
    try {
      const response = await API.post('/auth/login', { email, password });
      const { data } = response.data;
      
      setUser(data);
      setToken(data.token);
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      
      setLoading(false);
      return { success: true, user: data };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  // Student Registration
  const registerStudent = async (userData) => {
    setLoading(true);
    try {
      const response = await API.post('/auth/register', userData);
      const { data } = response.data;
      
      setUser(data);
      setToken(data.token);
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      
      setLoading(false);
      return { success: true, user: data };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  // Admin Login
  const loginAdmin = async (email, password) => {
    setLoading(true);
    try {
      const response = await API.post('/auth/admin-login', { email, password });
      const { data } = response.data;
      
      setUser(data);
      setToken(data.token);
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      
      setLoading(false);
      return { success: true, user: data };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: error.response?.data?.message || 'Admin authorization failed',
      };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
  };

  // Update Profile session
  const updateUserData = (updatedData) => {
    const newSession = { ...user, ...updatedData };
    setUser(newSession);
    localStorage.setItem('userInfo', JSON.stringify(newSession));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        loginStudent,
        registerStudent,
        loginAdmin,
        logout,
        updateUserData,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'admin',
        isStudent: user?.role === 'student',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
