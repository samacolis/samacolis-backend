"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PackageService from '../../../../services/package.service';
import useAuth from '../../../../services/useAuth';

interface PackageDetails {
  id: number;
  statut_courant: string;
  destination: string;
  date_depot: string;
  // Ajoutez d'autres propriétés détaillées du colis ici
}

export default function ColisDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [pkg, setPkg] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isAuthenticated && id) {
      PackageService.getPackageById(id as string)
        .then(response => {
          setPkg(response.data);
          setLoading(false);
        })
        .catch((err: Error) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [isAuthenticated, id]);

  if (!isAuthenticated) {
    return null; // Ou un loader
  }

  if (loading) {
    return <div className="text-center py-12">Chargement des détails du colis...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Erreur: {error.message}</div>;
  }

  if (!pkg) {
    return <div className="text-center py-12">Colis non trouvé.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Détails du Colis #{pkg.id}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <p><strong>Statut:</strong> {pkg.statut_courant}</p>
        <p><strong>Destination:</strong> {pkg.destination}</p>
        <p><strong>Date de dépôt:</strong> {new Date(pkg.date_depot).toLocaleDateString()}</p>
        {/* Affichez d'autres détails ici */}
      </div>
    </div>
  );
}
