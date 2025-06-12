
import { useState } from 'react';
import api from '../services/api';

export default function Tracking() {
  const [id, setId] = useState('');
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setInfo(null);
    try {
      const res = await api.get(`track/${id}/`);
      setInfo(res.data);
    } catch {
      setError('Colis introuvable');
    }
  };

  return (
    <div>
      <h2>Suivi de colis</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Entrez l’ID du colis"
          value={id}
          onChange={e => setId(e.target.value)}
          required
        />
        <button type="submit" style={{ marginLeft: '0.5em' }}>
          Rechercher
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {info && (
        <div style={{ marginTop: '1em' }}>
          <p><strong>Statut :</strong> {info.statut}</p>
          <p><strong>Date de dépôt :</strong> {info.date_depot}</p>
          <p><strong>Destination :</strong> {info.destination}</p>
        </div>
      )}
    </div>
  );
}
