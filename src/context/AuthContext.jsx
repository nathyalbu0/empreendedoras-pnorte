import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem('@PNorte:token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      localStorage.removeItem('@PNorte:token');
      localStorage.removeItem('@PNorte:user');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setError('');
      const response = await api.post('/auth/register', userData);
      
      const { token, user } = response.data;
      
      localStorage.setItem('@PNorte:token', token);
      localStorage.setItem('@PNorte:user', JSON.stringify(user));
      
      setUser(user);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao registrar';
      setError(message);
      return { success: false, error: message };
    }
  };

  const login = async (email, password) => {
    try {
      setError('');
      const response = await api.post('/auth/login', { email, password });
      
      const { token, user } = response.data;
      
      localStorage.setItem('@PNorte:token', token);
      localStorage.setItem('@PNorte:user', JSON.stringify(user));
      
      setUser(user);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao fazer login';
      setError(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('@PNorte:token');
    localStorage.removeItem('@PNorte:user');
    setUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      setError('');
      const response = await api.put('/auth/update', userData);
      
      const updatedUser = response.data.user;
      setUser(updatedUser);
      localStorage.setItem('@PNorte:user', JSON.stringify(updatedUser));
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao atualizar perfil';
      setError(message);
      return { success: false, error: message };
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};