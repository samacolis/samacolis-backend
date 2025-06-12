import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1️⃣ IMPORTER ton client Axios centralisé (au lieu de axios directement)
import api from '../services/api';
import { toast } from 'react-toastify';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 2️⃣ UTILISER api.post et non axios.post avec une URL en dur
      const response = await api.post('/token/', { username, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      toast.success('Connecté !');
      navigate('/clients');
    } catch (err) {
      toast.error('Identifiants invalides');
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom d’utilisateur
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
