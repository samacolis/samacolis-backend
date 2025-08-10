"use client";

import React, { useState } from 'react';
import Button from '../../components/Button';

export default function DevisPage() {
  const [weight, setWeight] = useState('');
  const [destination, setDestination] = useState('');
  const [shippingMode, setShippingMode] = useState('maritime');
  const [longueur_cm, setLongueurCm] = useState('');
  const [largeur_cm, setLargeurCm] = useState('');
  const [hauteur_cm, setHauteurCm] = useState('');
  const [valeur_declaree, setValeurDeclaree] = useState('');
  const [type_marchandise, setTypeMarchandise] = useState('');
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [message, setMessage] = useState({ type: '', content: '' }); // Ajout du state pour les messages

  const calculateEstimate = () => {
    let cost = 0;
    const parsedWeight = parseFloat(weight);
    const parsedLongueur = parseFloat(longueur_cm);
    const parsedLargeur = parseFloat(largeur_cm);
    const parsedHauteur = parseFloat(hauteur_cm);
    const parsedValeurDeclaree = parseFloat(valeur_declaree);

    // Réinitialiser l'estimation et le message d'erreur
    setEstimatedCost(null);
    setMessage({ type: '', content: '' });

    // Validation des champs numériques
    if (isNaN(parsedWeight) || parsedWeight <= 0 ||
        isNaN(parsedLongueur) || parsedLongueur <= 0 ||
        isNaN(parsedLargeur) || parsedLargeur <= 0 ||
        isNaN(parsedHauteur) || parsedHauteur <= 0 ||
        isNaN(parsedValeurDeclaree) || parsedValeurDeclaree <= 0) {
      setMessage({ type: 'error', content: 'Veuillez entrer des valeurs numériques positives pour tous les champs requis.' });
      return;
    }

    // Logique de calcul simplifiée pour l'exemple
    if (shippingMode === 'maritime') {
      cost = parsedWeight * 2.5 + 10; // Exemple: 2.5€/kg + 10€ frais fixes
    } else if (shippingMode === 'aerien') {
      cost = parsedWeight * 12 + 15; // Exemple: 12€/kg + 15€ frais fixes
    }

    // Ajouter un coût basé sur les dimensions et la valeur déclarée
    const volume = (parsedLongueur * parsedLargeur * parsedHauteur) / 5000; // Exemple de calcul de volume (divisé par 5000 pour un facteur de conversion)
    cost += volume * 0.5; // Coût par volume
    cost += parsedValeurDeclaree * 0.01; // 1% de la valeur déclarée

    setEstimatedCost(cost);
    setMessage({ type: 'success', content: 'Estimation calculée avec succès.' });
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Estimer vos frais d&apos;expédition</h1>
      <form className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="weight" className="block text-gray-700 text-sm font-bold mb-2">Poids total (kg) :</label>
          <input
            type="number"
            id="weight"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Ex: 5.5"
            step="0.1"
            required
          />
        </div>

        <div>
          <label htmlFor="longueur_cm" className="block text-gray-700 text-sm font-bold mb-2">Longueur (cm) :</label>
          <input type="number" id="longueur_cm" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={longueur_cm} onChange={(e) => setLongueurCm(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="largeur_cm" className="block text-gray-700 text-sm font-bold mb-2">Largeur (cm) :</label>
          <input type="number" id="largeur_cm" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={largeur_cm} onChange={(e) => setLargeurCm(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="hauteur_cm" className="block text-gray-700 text-sm font-bold mb-2">Hauteur (cm) :</label>
          <input type="number" id="hauteur_cm" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={hauteur_cm} onChange={(e) => setHauteurCm(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="valeur_declaree" className="block text-gray-700 text-sm font-bold mb-2">Valeur déclarée (€) :</label>
          <input type="number" id="valeur_declaree" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={valeur_declaree} onChange={(e) => setValeurDeclaree(e.target.value)} step="0.01" required />
        </div>

        <div>
          <label htmlFor="type_marchandise" className="block text-gray-700 text-sm font-bold mb-2">Type de marchandise :</label>
          <input type="text" id="type_marchandise" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" value={type_marchandise} onChange={(e) => setTypeMarchandise(e.target.value)} placeholder="Ex: Vêtements, Électronique" />
        </div>

        <div>
          <label htmlFor="destination" className="block text-gray-700 text-sm font-bold mb-2">Destination :</label>
          <select
            id="destination"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            <option value="">Sélectionnez une destination</option>
            <option value="senegal">Sénégal</option>
            <option value="cotedivoire">Côte d&apos;Ivoire</option>
            {/* Ajoutez d'autres destinations ici */}
          </select>
        </div>

        <div>
          <label htmlFor="shippingMode" className="block text-gray-700 text-sm font-bold mb-2">Mode d&apos;envoi :</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-emerald-600"
                name="shippingMode"
                value="maritime"
                checked={shippingMode === 'maritime'}
                onChange={() => setShippingMode('maritime')}
              />
              <span className="ml-2 text-gray-700">Maritime (économique)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-emerald-600"
                name="shippingMode"
                value="aerien"
                checked={shippingMode === 'aerien'}
                onChange={() => setShippingMode('aerien')}
              />
              <span className="ml-2 text-gray-700">Aérien (rapide)</span>
            </label>
          </div>
        </div>

        <Button type="button" variant="accent" onClick={calculateEstimate}>
          Calculer l&apos;estimation
        </Button>
      </form>

      {message.content && (
        <div className={`p-4 mt-6 text-center rounded-md flex items-center justify-center ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.type === 'success' ? '✅' : '❌'} <span className="ml-2">{message.content}</span>
        </div>
      )}

      {estimatedCost !== null && (
        <div className="mt-8 p-6 bg-emerald-50 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">Coût estimé :</h2>
          <p className="text-4xl font-extrabold text-emerald-600">{estimatedCost.toFixed(2)} €</p>
          <p className="text-sm text-gray-600 mt-2">Ce co&ucirc;t est une estimation et peut varier.</p>
        </div>
      )}
    </div>
  );
}
