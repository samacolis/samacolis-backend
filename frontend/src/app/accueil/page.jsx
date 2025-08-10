import React from 'react';
import Link from 'next/link';

export default function Accueil() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-emerald-700 text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">Votre Pont Logistique entre l'Europe et l'Afrique</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Faites livrer vos achats européens, regroupez vos colis et réexpédiez-les en Afrique en toute simplicité avec SamaColis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/declarer-colis" className="bg-yellow-400 text-emerald-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors shadow-lg">
              Déclarer un Colis
            </Link>
            <Link href="/devis" className="bg-white text-emerald-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Obtenir un Devis
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-emerald-800 mb-12">Nos Services Clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105">
              <div className="text-5xl mb-4 text-emerald-600">📦</div>
              <h3 className="text-2xl font-semibold mb-3 text-emerald-700">Regroupement de Colis</h3>
              <p className="text-gray-700">Optimisez vos frais de port en regroupant plusieurs achats en un seul envoi. Économisez sur chaque expédition !</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105">
              <div className="text-5xl mb-4 text-emerald-600">✂️</div>
              <h3 className="text-2xl font-semibold mb-3 text-emerald-700">Reconditionnement</h3>
              <p className="text-gray-700">Nous reconditionnons vos colis pour réduire leur volume et leur poids, garantissant ainsi des coûts d'expédition minimaux.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105">
              <div className="text-5xl mb-4 text-emerald-600">🌍</div>
              <h3 className="text-2xl font-semibold mb-3 text-emerald-700">Expédition Internationale</h3>
              <p className="text-gray-700">Expédition rapide et sécurisée de vos colis depuis l'Europe vers diverses destinations en Afrique, par voie maritime ou aérienne.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section (Simplified) */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-emerald-800 mb-12">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="text-5xl mb-4 text-yellow-600">1. 🛒</div>
              <h3 className="text-xl font-semibold mb-2 text-emerald-700">Commandez en Ligne</h3>
              <p className="text-gray-700">Faites vos achats sur vos sites européens préférés et utilisez notre adresse d'entrepôt.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="text-5xl mb-4 text-yellow-600">2. 📦</div>
              <h3 className="text-xl font-semibold mb-2 text-emerald-700">Nous Réceptionnons</h3>
              <p className="text-gray-700">Vos colis sont reçus, vérifiés, regroupés et reconditionnés si nécessaire.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="text-5xl mb-4 text-yellow-600">3. ✈️</div>
              <h3 className="text-xl font-semibold mb-2 text-emerald-700">Expédition & Suivi</h3>
              <p className="text-gray-700">Nous expédions vos colis et vous suivez leur parcours jusqu'à destination.</p>
            </div>
          </div>
          <Link href="/fonctionnement" className="mt-12 inline-block bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg">
            Voir toutes les étapes
          </Link>
        </div>
      </section>

      {/* Footer (simple) */}
      <footer className="py-8 px-4 text-center bg-emerald-900 text-white">
        <p>&copy; 2025 SamaColis. Tous droits réservés.</p>
        <p className="mt-2">
          <a href="http://localhost:8000/swagger/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">
            Documentation API (Swagger)
          </a>
        </p>
      </footer>
    </div>
  );
}