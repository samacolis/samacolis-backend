"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import useAuth from '../../services/useAuth';
import PackageService from '../../services/package.service';

interface Package {
  id: string; // UUID
  statut_courant: string;
  destination: string;
  date_depot: string | null; // Peut être null
  boutique: string;
  numero_suivi: string;
  poids_kg: number;
  longueur_cm: number;
  largeur_cm: number;
  hauteur_cm: number;
  valeur_declaree: number;
  description: string;
}

export default function DashboardPage() {
  const { isAuthenticated, user, isLoading: isAuthLoading } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      PackageService.getPackages()
        .then(response => {
          setPackages(response.data);
          setLoading(false);
        })
        .catch((err: Error) => {
          setError(err);
          setLoading(false);
        });
    } else if (!isAuthLoading) {
      setLoading(false);
    }
  }, [isAuthenticated, isAuthLoading]);

  if (isAuthLoading) {
    return <div className="text-center py-12">Vérification de l'authentification...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center py-12">Veuillez vous connecter pour accéder à votre tableau de bord.</div>;
  }

  if (loading) {
    return <div className="text-center py-12">Chargement des données...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Erreur lors du chargement des données: {error.message}</div>;
  }

  // Calcul des statistiques
  const totalColis = packages.length;
  const colisEnAttente = packages.filter(pkg => pkg.statut_courant === 'en_attente' || pkg.statut_courant === 'receptionne').length;
  const colisExpedies = packages.filter(pkg => pkg.statut_courant === 'expedie').length;
  const colisLivres = packages.filter(pkg => pkg.statut_courant === 'livre').length;

  // Carte de correspondance pour les statuts
  const statusDisplayMap: { [key: string]: string } = {
    'declare': 'Déclaré',
    'receptionne': 'Réceptionné',
    'en_attente': "En attente d'expédition",
    'expedie': 'Expédié',
    'livre': 'Livré',
    'probleme': 'Problème',
  };

  // Les 3 derniers colis
  const lastThreePackages = packages.slice(0, 3);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-emerald-700">Tableau de bord utilisateur</h1>
      <p className="text-center text-lg mb-8 text-gray-700">Bienvenue sur votre tableau de bord, {user?.name || user?.email || 'Utilisateur SamaColis'} !</p>

      {/* Bouton Déclarer un nouveau colis */}
      <div className="text-center mb-12">
        <Link href="/declarer-colis" className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-md hover:bg-emerald-700 transition-colors text-lg shadow-lg">
          + Déclarer un Nouveau Colis
        </Link>
      </div>

      {/* Résumé des colis */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-emerald-600">
          <h3 className="text-xl font-semibold text-gray-700">Total Colis</h3>
          <p className="text-4xl font-bold text-emerald-600">{totalColis}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-yellow-500">
          <h3 className="text-xl font-semibold text-gray-700">En Attente</h3>
          <p className="text-4xl font-bold text-yellow-500">{colisEnAttente}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-blue-500">
          <h3 className="text-xl font-semibold text-gray-700">Expédiés</h3>
          <p className="text-4xl font-bold text-blue-500">{colisExpedies}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-green-500">
          <h3 className="text-xl font-semibold text-gray-700">Livrés</h3>
          <p className="text-4xl font-bold text-green-500">{colisLivres}</p>
        </div>
      </div>

      {/* Derniers colis */}
      <h2 className="text-2xl font-bold mt-12 mb-6 text-emerald-700">Mes 3 Derniers Colis</h2>
      {lastThreePackages.length === 0 ? (
        <p className="text-center text-gray-600">Aucun colis récent à afficher.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lastThreePackages.map(pkg => (
            <Link href={`/dashboard/colis/${pkg.id}`} key={pkg.id}>
              <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-emerald-600">
                <h3 className="text-xl font-semibold mb-2 text-emerald-600">Colis #{pkg.id.substring(0, 8)}...</h3>
                <p className="text-gray-700"><strong>Statut:</strong> {statusDisplayMap[pkg.statut_courant] || pkg.statut_courant}</p>
                <p className="text-gray-700"><strong>Boutique:</strong> {pkg.boutique}</p>
                <p className="text-gray-700"><strong>N° Suivi:</strong> {pkg.numero_suivi}</p>
                <p className="text-gray-700"><strong>Valeur:</strong> {pkg.valeur_declaree} €</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Lien vers tous les colis */}
      {packages.length > 0 && (
        <div className="text-center mt-8">
          <Link href="/dashboard/colis" className="text-emerald-600 hover:underline font-semibold text-lg">
            Voir tous mes colis
          </Link>
        </div>
      )}
    </div>
  );
}
