import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function ColisList() {
  const [colis, setColis] = useState([]);

  useEffect(() => {
    api.get('colis/')
      .then(res => setColis(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Liste des colis</h2>
      <ul>
        {colis.map(c => (
          <li key={c.id}>
            {c.id} – {c.client ? `${c.client.nom} ${c.client.prenom}` : '—'} : {c.statut_courant}
          </li>
        ))}
      </ul>
    </div>
  );
}
