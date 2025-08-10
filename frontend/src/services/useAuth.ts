"use client";

import AuthService from './auth.service';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { jwtDecode } from "jwt-decode"; // Import de la librairie

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Le type de l'utilisateur correspond maintenant au contenu du token
  const [user, setUser] = useState<{ name: string; email: string; phone?: string; adresse?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      AuthService.getMe()
        .then(response => {
          setIsAuthenticated(true);
          setUser(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch user info:", error);
          localStorage.removeItem('userToken');
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/connexion');
  };

  const refreshUser = async () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const response = await AuthService.getMe();
        setUser(response.data);
      } catch (error) {
        console.error("Failed to refresh user info:", error);
        localStorage.removeItem('userToken');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  };

  return { isAuthenticated, user, logout, isLoading, refreshUser };
};

export default useAuth;
