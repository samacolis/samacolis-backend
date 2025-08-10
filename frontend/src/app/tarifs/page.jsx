import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../../components/Button'; // Import du composant Button

export default function Tarifs() {
  return (
    <section className="container mx-auto px-8 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-center text-emerald-800">Nos Tarifs</h1>
      <p className="text-center text-lg text-gray-700 mb-12">Comparez nos offres selon le mode d'envoi et la plateforme utilisée.</p>

      {/* Section Envoi Maritime */}
      <div className="bg-white p-8 rounded-lg shadow-xl mb-16 border-t-4 border-emerald-600">
        <h2 className="text-3xl font-semibold mb-6 text-emerald-700 flex items-center justify-center">🚢 Envoi Maritime</h2>
        <p className="text-gray-700 mb-6 text-center">Pour vos envois volumineux à prix économique.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Destination</th>
                <th className="py-3 px-4 text-left">Prix / kg</th>
                <th className="py-3 px-4 text-left">Frais fixes</th>
                <th className="py-3 px-4 text-left">Délai estimé</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50 even:bg-gray-50">
                <td className="py-3 px-4">Sénégal</td>
                <td className="py-3 px-4 font-bold text-yellow-600">2,50 €</td>
                <td className="py-3 px-4">10 €</td>
                <td className="py-3 px-4">20–25 jours</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50 even:bg-gray-50">
                <td className="py-3 px-4">Côte d’Ivoire</td>
                <td className="py-3 px-4 font-bold text-yellow-600">2,80 €</td>
                <td className="py-3 px-4">12 €</td>
                <td className="py-3 px-4">20–25 jours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section Envoi Aérien */}
      <div className="bg-white p-8 rounded-lg shadow-xl mb-16 border-t-4 border-emerald-600">
        <h2 className="text-3xl font-semibold mb-6 text-emerald-700 flex items-center justify-center">✈️ Envoi Aérien</h2>
        <p className="text-gray-700 mb-6 text-center">Pour un envoi rapide et sécurisé.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Destination</th>
                <th className="py-3 px-4 text-left">Prix / kg</th>
                <th className="py-3 px-4 text-left">Frais fixes</th>
                <th className="py-3 px-4 text-left">Délai estimé</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50 even:bg-gray-50">
                <td className="py-3 px-4">Sénégal</td>
                <td className="py-3 px-4 font-bold text-yellow-600">12,00 €</td>
                <td className="py-3 px-4">15 €</td>
                <td className="py-3 px-4">7–10 jours</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50 even:bg-gray-50">
                <td className="py-3 px-4">Côte d’Ivoire</td>
                <td className="py-3 px-4 font-bold text-yellow-600">13,00 €</td>
                <td className="py-3 px-4">15 €</td>
                <td className="py-3 px-4">7–10 jours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section Achats E-commerce */}
      <div className="bg-white p-8 rounded-lg shadow-xl mb-16 border-t-4 border-emerald-600">
        <h2 className="text-3xl font-semibold mb-6 text-emerald-700 flex items-center justify-center">🛍️ Réexpédition d'Achats en Ligne</h2>
        <p className="text-gray-700 mb-6 text-center">Commandez sur vos sites européens préférés et faites livrer vos colis à notre entrepôt. Nous réceptionnons, vérifions, regroupons et reconditionnons vos achats pour optimiser vos frais d'envoi vers l'Afrique.</p>

        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          <a href="https://www.amazon.fr" target="_blank" rel="noopener noreferrer">
            <Image src="/images/amazon.png" alt="Amazon" width={120} height={60} className="object-contain" />
          </a>
          <a href="https://www.leboncoin.fr" target="_blank" rel="noopener noreferrer">
            <Image src="/images/leboncoin.jpg" alt="LeBonCoin" width={120} height={60} className="object-contain" />
          </a>
          <a href="https://www.vinted.fr" target="_blank" rel="noopener noreferrer">
            <Image src="/images/vinted.png" alt="Vinted" width={120} height={60} className="object-contain" />
          </a>
          <a href="https://www.shein.com" target="_blank" rel="noopener noreferrer">
            <Image src="/images/shein.png" alt="Shein" width={120} height={60} className="object-contain" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Plateforme d'Achat</th>
                <th className="py-3 px-4 text-left">Réception & Vérification</th>
                <th className="py-3 px-4 text-left">Regroupement & Stockage</th>
                <th className="py-3 px-4 text-left">Tarif d'Expédition</th>
                <th className="py-3 px-4 text-left">Délai Total Estimé</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50 even:bg-gray-50">
                <td className="py-3 px-4">Toutes</td>
                <td className="py-3 px-4 font-bold text-yellow-600">Gratuite*</td>
                <td className="py-3 px-4">Inclus (7 jours gratuits)</td>
                <td className="py-3 px-4">Selon mode (Maritime/Aérien)</td>
                <td className="py-3 px-4">7 à 45 jours</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-4 text-center">*Réception gratuite si réexpédition dans les 7 jours suivant la livraison à l'entrepôt.</p>
      </div>

      {/* Section Exemples de colis */}
      <div className="bg-white p-8 rounded-lg shadow-xl mb-16 border-t-4 border-emerald-600">
        <h2 className="text-3xl font-semibold mb-6 text-emerald-700 flex items-center justify-center">📦 Exemples de colis et estimation</h2>
        <p className="text-gray-700 mb-6 text-center">Voici quelques exemples de colis pour vous aider à estimer vos coûts d’envoi :</p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Type de colis</th>
                <th className="py-3 px-4 text-left">Poids estimé</th>
                <th className="py-3 px-4 text-left">Mode</th>
                <th className="py-3 px-4 text-left">Prix estimé</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-50 even:bg-gray-50">
                <td className="py-3 px-4">1 paire de baskets + vêtements</td>
                <td className="py-3 px-4">3 kg</td>
                <td className="py-3 px-4">🚢</td>
                <td className="py-3 px-4 font-bold text-yellow-600">17,50 €</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50 even:bg-gray-50">
                <td className="py-3 px-4">Ordinateur portable</td>
                <td className="py-3 px-4">2,5 kg</td>
                <td className="py-3 px-4">✈️</td>
                <td className="py-3 px-4 font-bold text-yellow-600">45 €</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50 even:bg-gray-50">
                <td className="py-3 px-4">Téléphone + accessoires</td>
                <td className="py-3 px-4">1 kg</td>
                <td className="py-3 px-4">✈️</td>
                <td className="py-3 px-4 font-bold text-yellow-600">27 €</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50 even:bg-gray-50">
                <td className="py-3 px-4">Petits colis Vinted x3</td>
                <td className="py-3 px-4">6 kg</td>
                <td className="py-3 px-4">🚢</td>
                <td className="py-3 px-4 font-bold text-yellow-600">25 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Infos complémentaires et CTA */}
      <div className="bg-white p-8 rounded-lg shadow-xl mb-16 border-t-4 border-emerald-600 text-center">
        <p className="mb-4 text-gray-700">📌 Les frais fixes incluent la réception, la vérification et la consolidation des colis.</p>
        <p className="mb-6 text-gray-700">📏 Pour les objets volumineux ou spécifiques (meubles, électroménagers…), <Link href="/contact" className="text-emerald-600 hover:underline font-semibold">demandez un devis personnalisé</Link>.</p>
        <Button variant="accent" href="/devis" className="w-full md:w-auto">Demander un devis</Button>
      </div>
    </section>
  );
}