"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AuthService from '../../../services/auth.service'; 

export default function SetNewPasswordPage() {
  const params = useParams();
  const resetToken = params.resetToken as string;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!resetToken) {
      setError('Jeton de réinitialisation manquant.');
    }
  }, [resetToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await AuthService.resetPassword(resetToken, password);
      setMessage('Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.');
      // Redirection vers la page de connexion
      // router.push('/connexion');
    } catch (err) {
      setError('Erreur lors de la réinitialisation. Le jeton est peut-être invalide ou expiré.');
      console.error(err);
    }
  };

  if (error && error.includes('Jeton')) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-8">Erreur</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Définir un nouveau mot de passe</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Nouveau mot de passe</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-3 py-2 border rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <button type="submit" className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500">
          Réinitialiser le mot de passe
        </button>
      </form>
    </div>
  );
}