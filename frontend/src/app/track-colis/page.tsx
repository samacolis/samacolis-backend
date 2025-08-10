"use client";

import React, { useState } from 'react';
import PackageService from '../../services/package.service';
import Button from '../../components/Button';

interface HistoriqueSuivi {
  id: number;
  colis: string; // UUID du colis
  statut: string;
  emplacement: string;
  date_heure: string;
  description: string;
}

export default function TrackColisPage() {
  const [colisId, setColisId] = useState('');
  const [trackingHistory, setTrackingHistory] = useState<HistoriqueSuivi[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTrackingHistory(null);

    try {
      // Assuming PackageService has a method to get tracking history by colis ID
      const response = await PackageService.getTrackingHistory(colisId);
      setTrackingHistory(response.data);
    } catch (err: any) {
      console.error("Erreur lors de la récupération de l'historique de suivi:", err.response || err);
      setError(err.response?.data?.detail || err.message || 'Erreur lors de la récupération de l&apos;historique de suivi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Suivre un colis</h1>
      <form className="bg-white p-8 rounded-lg shadow-md space-y-6" onSubmit={handleTrack}>
        <div>
          <label htmlFor="colisId" className="block text-gray-700 text-sm font-bold mb-2">ID du colis :</label>
          <input
            type="text"
            id="colisId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={colisId}
            onChange={(e) => setColisId(e.target.value)}
            placeholder="Entrez l'ID du colis (UUID)"
            required
          />
        </div>
        
        <Button type="submit" variant="accent" disabled={loading}>
          {loading ? 'Chargement...' : 'Suivre le colis'}
        </Button>
      </form>

      {error && (
        <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {trackingHistory && trackingHistory.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Historique de suivi :</h2>
          <div className="space-y-4">
            {trackingHistory.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
                <p><strong>Statut:</strong> {item.statut}</p>
                <p><strong>Emplacement:</strong> {item.emplacement}</p>
                <p><strong>Date/Heure:</strong> {new Date(item.date_heure).toLocaleString()}</p>
                {item.description && <p><strong>Description:</strong> {item.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {trackingHistory && trackingHistory.length === 0 && !loading && !error && (
        <div className="mt-8 p-4 bg-blue-100 text-blue-700 rounded-lg">
          <p>Aucun historique de suivi trouvé pour cet ID de colis.</p>
        </div>
      )}
    </div>
  );
}
