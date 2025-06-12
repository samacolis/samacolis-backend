// frontend/src/components/TransporteurColis.js

import { useEffect, useState } from 'react';
import api from '../services/api';
// ─────────────── Ajout pour toast
import { toast } from 'react-toastify';

// Liste des statuts possibles
const STATUTS = [
  { value: 'receptionne', label: 'Réceptionné' },
  { value: 'en_attente', label: 'En attente d’expédition' },
  { value: 'expedie',    label: 'Expédié' },
  { value: 'livre',      label: 'Livré' },
  { value: 'probleme',   label: 'Problème' },
];

export default function TransporteurColis() {
  const [colis, setColis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Récupère les colis assignés
  useEffect(() => {
    api.get('colis/')
      .then(res => setColis(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Handler pour changer le statut
  const handleUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await api.patch(`colis/${id}/`, { statut_courant: newStatus });
      // Met à jour localement sans recharger
      setColis(colis.map(c => c.id === id ? { ...c, statut_courant: newStatus } : c));
      // ─────────────── Remplace alert par toast
      toast.success('Statut mis à jour !');
    } catch (err) {
      console.error(err);
      // ─────────────── Remplace alert par toast
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p>Chargement des colis…</p>;
  if (colis.length === 0) return <p>Aucun colis assigné pour vous.</p>;

  return (
    <div>
      <h2>Mes Colis à Livrer</h2>
      <ul>
        {colis.map(c => (
          <li key={c.id} style={{ marginBottom: '1em' }}>
            <div>
              <strong>ID :</strong> {c.id}<br/>
              <strong>Déposé le :</strong> {c.date_depot}<br/>
              <strong>Statut actuel :</strong> {STATUTS.find(s => s.value === c.statut_courant)?.label}
            </div>
            <div style={{ marginTop: '0.5em' }}>
              <select
                value={c.statut_courant}
                onChange={e => handleUpdate(c.id, e.target.value)}
                disabled={updatingId === c.id}
              >
                {STATUTS.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <button
                onClick={() => handleUpdate(c.id, c.statut_courant)}
                disabled={updatingId === c.id}
                style={{ marginLeft: '0.5em' }}
              >
                {updatingId === c.id ? 'Mise à jour…' : 'Mettre à jour'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
