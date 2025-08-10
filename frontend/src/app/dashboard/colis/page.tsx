"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PackageService from '../../../services/package.service';
import useAuth from '../../../services/useAuth';

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

export default function MesColisPage() {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Carte de correspondance pour les statuts
  const statusDisplayMap: { [key: string]: string } = {
    'declare': 'Déclaré',
    'receptionne': 'Réceptionné',
    'en_attente': "En attente d'expédition",
    'expedie': 'Expédié',
    'livre': 'Livré',
    'probleme': 'Problème',
  };

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
    }
  }, [isAuthenticated]);

  if (isAuthLoading || loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Erreur: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Mes Colis</h1>
      {packages.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-lg shadow">
          <p className="text-gray-600 mb-4">Vous n'avez aucun colis pour le moment.</p>
          <Link href="/declarer-colis" className="bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500">
            Déclarer mon premier colis
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Colis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Boutique</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° Suivi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poids (kg)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensions (cm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valeur (€)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {packages.map(pkg => (
                <tr key={pkg.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{pkg.id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pkg.boutique}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pkg.numero_suivi}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pkg.poids_kg}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pkg.longueur_cm}x{pkg.largeur_cm}x{pkg.hauteur_cm}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pkg.valeur_declaree}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {statusDisplayMap[pkg.statut_courant] || pkg.statut_courant}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/dashboard/colis/${pkg.id}`} className="text-emerald-600 hover:text-emerald-900">Voir</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
