"use client";

import { useState } from 'react';
import AuthService from '../../services/auth.service';
import { useRouter } from 'next/navigation'; // <-- AJOUTEZ CETTE LIGNE

export default function InscriptionPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // <-- AJOUTEZ CETTE LIGNE

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      await AuthService.register(name, email, password, confirmPassword, phone);
      setMessage('Inscription réussie ! Un email de vérification a été envoyé à votre adresse.');
      // Rediriger l'utilisateur vers une page de confirmation ou de connexion
      router.push('/connexion');
    } catch (error: any) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Créer un compte</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Nom complet</label>
          <input type="text" id="name" className="w-full px-3 py-2 border rounded-md" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Adresse Email</label>
          <input type="email" id="email" className="w-full px-3 py-2 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 mb-2">Numéro de téléphone</label>
          <input type="tel" id="phone" className="w-full px-3 py-2 border rounded-md" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Mot de passe</label>
          <input type="password" id="password" className="w-full px-3 py-2 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirmer le mot de passe</label>
          <input type="password" id="confirmPassword" className="w-full px-3 py-2 border rounded-md" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}
        <button type="submit" className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500">
          S&apos;inscrire
        </button>
      </form>
    </div>
  );
}
