// frontend/src/components/NewColis.js

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
// ─────────────── Ajout pour toast
import { toast } from 'react-toastify';

export default function NewColis() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    client: '',
    poids_kg: '',
    longueur_cm: '',
    largeur_cm: '',
    hauteur_cm: '',
    description: '',
    valeur_declaree: '',
    destination: '',
    date_depot: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('clients/')
      .then(res => setClients(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Exemple de validation minimale
    if (Number(form.poids_kg) <= 0) {
      toast.error('Le poids doit être supérieur à 0');
      return;
    }

    try {
      await api.post('colis/', form);
      // ─────────────── Remplace alert success par toast
      toast.success('Colis créé avec succès !');
      navigate('/colis');
    } catch (err) {
      console.error(err);
      // ─────────────── Remplace alert erreur par toast
      toast.error('Erreur lors de la création du colis');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nouveau Colis</h2>

      <div>
        <label>Client</label>
        <select name="client" value={form.client} onChange={handleChange} required>
          <option value="">— Choisissez un client —</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>
              {c.nom} {c.prenom}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Poids (kg)</label>
        <input
          type="number"
          step="0.01"
          name="poids_kg"
          value={form.poids_kg}
          onChange={handleChange}
          min="0.01"
          required
        />
      </div>

      <div>
        <label>Longueur (cm)</label>
        <input
          type="number"
          name="longueur_cm"
          value={form.longueur_cm}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div>
        <label>Largeur (cm)</label>
        <input
          type="number"
          name="largeur_cm"
          value={form.largeur_cm}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div>
        <label>Hauteur (cm)</label>
        <input
          type="number"
          name="hauteur_cm"
          value={form.hauteur_cm}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Valeur déclarée</label>
        <input
          type="number"
          step="0.01"
          name="valeur_declaree"
          value={form.valeur_declaree}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div>
        <label>Destination</label>
        <input
          type="text"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Date de dépôt</label>
        <input
          type="date"
          name="date_depot"
          value={form.date_depot}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Créer le colis</button>
    </form>
  );
}
