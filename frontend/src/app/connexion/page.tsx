"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importez useRouter
import Link from 'next/link'; // <-- AJOUTEZ CETTE LIGNE
import AuthService from '../../services/auth.service';

export default function ConnexionPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // Initialisez useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await AuthService.login(email, password);
      console.log('Connexion réussie:', response.data);
      setMessage('Connexion réussie !');
      router.push('/dashboard'); // Redirigez vers le tableau de bord
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
      <h1 className="text-3xl font-bold text-center mb-8">Connexion</h1>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Adresse Email</label>
          <input type="email" id="email" className="w-full px-3 py-2 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">Mot de passe</label>
          <input type="password" id="password" className="w-full px-3 py-2 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}
        <button type="submit" className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500">
          Se connecter
        </button>
        <p className="text-center mt-4">
          <Link href="/reinitialiser-mot-de-passe" className="text-emerald-600 hover:underline">Mot de passe oublié ?</Link>
        </p>
      </form>
    </div>
  );
}
