import React from 'react';

const Fonctionnement = () => {
  const steps = [
    {
      title: '1. Je commande en ligne',
      description: 'Faites vos achats sur vos sites européens préférés (Amazon, Shein, Vinted, LeBonCoin…).',
      icon: '🛒',
    },
    {
      title: '2. Je choisis SamaColis comme adresse de livraison',
      description: "Lors de votre commande, utilisez l'adresse de notre entrepôt en Europe comme adresse de livraison.",
      icon: '📍',
    },
    {
      title: '3. Nous réceptionnons et vérifions vos colis',
      description: 'Dès réception de vos colis, nous vous envoyons une notification avec photo et poids estimé. Nous vérifions également leur conformité.',
      icon: '📦',
    },
    {
      title: '4. Regroupement et reconditionnement',
      description: 'Optimisez vos frais de port ! Nous regroupons vos différents achats en un seul envoi et reconditionnons vos colis pour réduire leur volume et leur poids, si nécessaire.',
      icon: '📦',
    },
    {
      title: '5. Je demande mon devis personnalisé',
      description: "Depuis votre espace client, demandez votre devis personnalisé pour l'expédition de vos colis regroupés vers l'Afrique.",
      icon: '📊',
    },
    {
      title: '6. Nous expédions votre colis',
      description: 'Après validation du devis et paiement, nous préparons et expédions vos colis par voie maritime ou aérienne.',
      icon: '✈️',
    },
    {
      title: '7. Vous recevez votre colis en Afrique',
      description: 'Suivez votre envoi en temps réel et recevez votre colis en toute sécurité à destination.',
      icon: '🌍',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold text-center mb-12">Comment ça marche ?</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:justify-items-center">
        {steps.map((step, index) => (
          <div key={index} className={`bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center h-full justify-between transform transition-transform duration-300 hover:scale-105 ${index === steps.length - 1 && steps.length % 3 === 1 ? 'lg:col-span-3' : ''}`}>
            <div className="text-5xl mb-4">{step.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-emerald-700">{step.title}</h2>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-lg text-gray-700">Prêt à commencer ?</p>
        <a href="/inscription" className="mt-4 inline-block bg-yellow-400 text-black px-8 py-3 rounded-md font-semibold text-lg hover:bg-yellow-500 transition-colors">
          S'inscrire maintenant
        </a>
      </div>
    </div>
  );
};

export default Fonctionnement;
