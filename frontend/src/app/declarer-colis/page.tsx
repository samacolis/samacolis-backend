"use client";

import React, { useState } from 'react';
import PackageService from '../../services/package.service';
import { useRouter } from 'next/navigation';

export default function DeclarerColisPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [description, setDescription] = useState('');
  const [valeur, setValeur] = useState('');
  const [boutique, setBoutique] = useState('');
  const [poids, setPoids] = useState('');
  const [longueur, setLongueur] = useState('');
  const [largeur, setLargeur] = useState('');
  const [hauteur, setHauteur] = useState('');
  const [isSelfPrepared, setIsSelfPrepared] = useState(false); // Nouveau state pour les colis préparés par soi-même
  const [message, setMessage] = useState({ type: '', content: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: '', content: '' });

    // Validation des champs numériques
    if (parseFloat(valeur) <= 0 || parseFloat(poids) <= 0 || parseInt(longueur) <= 0 || parseInt(largeur) <= 0 || parseInt(hauteur) <= 0) {
      setMessage({ type: 'error', content: 'Veuillez entrer des valeurs positives pour la valeur, le poids et les dimensions.' });
      return;
    }

    const colisData = {
      numero_suivi: isSelfPrepared ? null : trackingNumber,
      description,
      valeur_declaree: parseFloat(valeur),
      boutique: isSelfPrepared ? null : boutique,
      poids_kg: parseFloat(poids),
      longueur_cm: parseInt(longueur),
      largeur_cm: parseInt(largeur),
      hauteur_cm: parseInt(hauteur),
    };

    try {
      await PackageService.createPackage(colisData);
      setMessage({ type: 'success', content: 'Colis déclaré avec succès ! Vous allez être redirigé...' });
      setTimeout(() => {
        router.push('/dashboard/colis');
      }, 2000);
    } catch (error: any) {
      console.error(error);
      setMessage({ type: 'error', content: 'Erreur lors de la déclaration du colis. Veuillez réessayer.' });
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Déclarer un Nouveau Colis</h1>
      <form className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <p className="text-gray-600 mb-6">Veuillez remplir les informations ci-dessous concernant le colis que vous avez commandé et que vous attendez dans notre entrepôt.</p>
        
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isSelfPrepared"
            className="mr-2 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            checked={isSelfPrepared}
            onChange={(e) => setIsSelfPrepared(e.target.checked)}
          />
          <label htmlFor="isSelfPrepared" className="text-gray-700 font-bold">Je prépare mon propre colis (sans numéro de suivi)</label>
        </div>

        {!isSelfPrepared && (
          <div className="mb-4">
            <label htmlFor="boutique" className="block text-gray-700 font-bold mb-2">Boutique ou Vendeur</label>
            <input
              type="text"
              id="boutique"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={boutique}
              onChange={(e) => setBoutique(e.target.value)}
              placeholder="Ex: Amazon, Zalando, Vinted..."
              required={!isSelfPrepared} // Rendre facultatif si auto-préparé
            />
          </div>
        )}

        {!isSelfPrepared && (
          <div className="mb-4">
            <label htmlFor="trackingNumber" className="block text-gray-700 font-bold mb-2">Numéro de Suivi (Tracking Number)</label>
            <input
              type="text"
              id="trackingNumber"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              required={!isSelfPrepared}
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description du contenu</label>
          <textarea
            id="description"
            rows={4}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: 2 paires de chaussures en cuir, 1 livre de poche 'Le Petit Prince', 3 t-shirts en coton. Soyez précis pour la douane."
            required
          ></textarea>
          <p className="text-sm text-gray-500 mt-1">Soyez le plus précis possible (quantité, type, matière) pour faciliter le dédouanement.</p>
        </div>

        <div className="mb-4">
          <label htmlFor="valeur" className="block text-gray-700 font-bold mb-2">Valeur Déclarée (en €)</label>
          <input
            type="number"
            id="valeur"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="poids" className="block text-gray-700 font-bold mb-2">Poids (kg)</label>
          <input
            type="number"
            id="poids"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={poids}
            onChange={(e) => setPoids(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="longueur" className="block text-gray-700 font-bold mb-2">Dimensions (cm)</label>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              id="longueur"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={longueur}
              onChange={(e) => setLongueur(e.target.value)}
              placeholder="Longueur (cm)"
              required
            />
            <input
              type="number"
              id="largeur"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={largeur}
              onChange={(e) => setLargeur(e.target.value)}
              placeholder="Largeur (cm)"
              required
            />
            <input
              type="number"
              id="hauteur"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={hauteur}
              onChange={(e) => setHauteur(e.target.value)}
              placeholder="Hauteur (cm)"
              required
            />
          </div>
        </div>

        {message.content && (
          <div className={`p-4 mb-4 text-center rounded-md flex items-center justify-center ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.type === 'success' ? '✅' : '❌'} <span className="ml-2">{message.content}</span>
          </div>
        )}

        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-md hover:bg-emerald-700 transition-colors">
          Déclarer mon colis
        </button>
      </form>
    </div>
  );
}