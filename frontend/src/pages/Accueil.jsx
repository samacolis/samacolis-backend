import React from 'react';
import { Link } from 'react-router-dom';

export default function Accueil() {
  return (
    <div className="accueil-container" style={{ textAlign: 'center', marginTop: '2em' }}>
      <h1>Bienvenue sur SamaColis</h1>
      <p>Comment ça marche ?</p>
      <ol style={{ textAlign: 'left', maxWidth: '400px', margin: 'auto' }}>
        <li>Je commande en ligne (Amazon, Shein, Vinted…)</li>
        <li>Je choisis SamaColis comme adresse de livraison</li>
        <li>Ils réceptionnent mes colis et je reçois une notification</li>
        <li>Je planifie ma livraison</li>
        <li>Je reçois mon colis à domicile</li>
      </ol>
      <p style={{ marginTop: '2em' }}>© 2025 Samacolis</p>
    </div>
  );
}

