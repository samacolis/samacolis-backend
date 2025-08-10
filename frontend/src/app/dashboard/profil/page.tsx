"use client";

import React, { useState, useEffect } from 'react';
import useAuth from '../../../services/useAuth';
import AuthService from '../../../services/auth.service';

export default function ProfilPage() {
  const { user, isAuthenticated, isLoading: isAuthLoading, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [adresse, setAdresse] = useState(user?.adresse || '');
  const [message, setMessage] = useState({ type: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAdresse(user.adresse || '');
    }
  }, [user?.name, user?.email, user?.phone, user?.adresse]); // Dépendances plus spécifiques

  useEffect(() => {
    if (message.content) {
      const timer = setTimeout(() => {
        setMessage({ type: '', content: '' });
      }, 5000); // Le message disparaît après 5 secondes
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });

    try {
      await AuthService.updateProfile({ name, email, phone, adresse });
      setMessage({ type: 'success', content: 'Profil mis à jour avec succès !' });
      setIsEditing(false);
      refreshUser();
    } catch (error: any) {
      console.error(error);
      setMessage({ type: 'error', content: 'Erreur lors de la mise à jour du profil. Veuillez réessayer.' });
    }
  };

  if (isAuthLoading) {
    return <div className="text-center py-12">Chargement du profil...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center py-12">Veuillez vous connecter pour accéder à votre profil.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Mon Profil</h1>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {message.content && (
          <div className={`p-4 mb-4 text-center rounded-md flex items-center justify-center ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.type === 'success' ? '✅' : '❌'} <span className="ml-2">{message.content}</span>
          </div>
        )}
        {!isEditing ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Nom Complet:</label>
              <p className="px-3 py-2 border rounded-md bg-gray-100">{user?.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Adresse Email:</label>
              <p className="px-3 py-2 border rounded-md bg-gray-100">{user?.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Téléphone:</label>
              <p className="px-3 py-2 border rounded-md bg-gray-100">{user?.phone}</p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Adresse:</label>
              <p className="px-3 py-2 border rounded-md bg-gray-100">{user?.adresse}</p>
            </div>
            <button
              onClick={() => { setIsEditing(true); setMessage({ type: '', content: '' }); }}
              className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-md hover:bg-emerald-700 transition-colors"
            >
              Modifier mon Profil
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nom Complet</label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Adresse Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Téléphone</label>
              <input
                type="tel"
                id="phone"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="adresse" className="block text-gray-700 font-bold mb-2">Adresse</label>
              <textarea
                id="adresse"
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
              ></textarea>
            </div>
            {message.content && (
              <div className={`p-4 mb-4 text-center rounded-md flex items-center justify-center ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message.type === 'success' ? '✅' : '❌'} <span className="ml-2">{message.content}</span>
              </div>
            )}
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-emerald-600 text-white font-bold py-3 px-4 rounded-md hover:bg-emerald-700 transition-colors w-1/2 mr-2"
              >
                Enregistrer les modifications
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-md hover:bg-gray-400 transition-colors w-1/2 ml-2"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
