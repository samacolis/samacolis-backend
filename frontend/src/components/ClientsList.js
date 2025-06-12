import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ClientsList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get('clients/')
      .then(res => setClients(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Liste des clients</h2>
      <ul>
        {clients.map(c => (
          <li key={c.id}>
            {c.nom} {c.prenom} — {c.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
