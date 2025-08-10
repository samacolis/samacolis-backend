"use client";
import React from 'react';
import Link from 'next/link';
import Button from '../../components/Button';

export default function About() {
  return (
    <section className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-center text-emerald-800">À propos de SamaColis</h1>
      <p className="text-center text-lg text-gray-700 mb-12">Notre histoire, notre mission, notre vision et nos engagements.</p>

      {/* Introduction */}
      <div className="bg-white p-8 rounded-lg shadow-xl mb-12 border-t-4 border-emerald-600">
        <h2 className="text-3xl font-semibold mb-4 text-emerald-700 text-center">Notre Histoire</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          SamaColis est née d’un double constat : d’un côté, une diaspora africaine motivée à aider ses proches restés sur le continent ; de l’autre, des familles qui reçoivent des colis, mais sans pouvoir accéder elles-mêmes aux produits ou services des grandes plateformes e-commerce européennes.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Fort de l'expérience de mon père dans le groupage de conteneurs vers l’Afrique, j’ai pu observer de près les habitudes d’envoi et les manques dans l’expérience des bénéficiaires. Ces colis circulaient, oui — mais les Africains eux-mêmes n’avaient pas accès à Amazon, Shein, Vinted ou LeBonCoin.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-emerald-600">
          <h2 className="text-3xl font-semibold mb-4 text-emerald-700 text-center">Notre Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Avec SamaColis, nous voulons aller plus loin : offrir une solution simple, humaine et digitale qui permette à la fois à la diaspora d’envoyer plus facilement, et aux citoyens africains d’accéder à l’e-commerce européen via une interface accessible.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Nous rendons possible ce qui ne l’était pas : acheter sur les plus grandes plateformes même depuis l’Afrique, tout en garantissant une logistique fiable, transparente et maîtrisée.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-emerald-600">
          <h2 className="text-3xl font-semibold mb-4 text-emerald-700 text-center">Notre Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            Chez SamaColis, nous ne voyons pas notre service comme une simple entreprise de logistique. Nous construisons un <strong className="font-bold text-emerald-700">pont durable entre l’Afrique et le reste du monde</strong>.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
            <li><span className="font-bold">🌐 Rendre l’e-commerce mondial accessible depuis l’Afrique</span></li>
            <li><span className="font-bold">🏢 Créer des relais locaux dans plusieurs capitales africaines</span></li>
            <li><span className="font-bold">📱 Développer une plateforme numérique tout-en-un</span></li>
            <li><span className="font-bold">🤝 Soutenir les entrepreneurs locaux</span></li>
            <li><span className="font-bold">🚀 Devenir la référence du shipping de confiance</span></li>
          </ul>
        </div>
      </div>

      {/* Nos Engagements */}
      <div className="bg-white p-8 rounded-lg shadow-xl mb-12 border-t-4 border-emerald-600">
        <h2 className="text-3xl font-semibold mb-6 text-emerald-700 text-center">Nos Engagements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl mb-4 text-emerald-600">🤝</div>
            <h3 className="text-xl font-semibold mb-2 text-emerald-700">Un service humain</h3>
            <p className="text-gray-700">Nous accompagnons chaque client comme un membre de la famille.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl mb-4 text-emerald-600">💰</div>
            <h3 className="text-xl font-semibold mb-2 text-emerald-700">Des prix accessibles</h3>
            <p className="text-gray-700">Options maritimes ou aériennes adaptées à tous les budgets.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-5xl mb-4 text-emerald-600">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-emerald-700">Une transparence totale</h3>
            <p className="text-gray-700">Suivi, délais clairs, contact facile.</p>
          </div>
        </div>
      </div>

      {/* Le mot du fondateur */}
      <div className="bg-white p-8 rounded-lg shadow-xl mb-12 border-t-4 border-emerald-600">
        <h2 className="text-3xl font-semibold mb-4 text-emerald-700 text-center">Le mot du fondateur</h2>
        <p className="text-gray-700 mb-4 leading-relaxed italic text-center">
          « J’ai grandi entre la France et l’Afrique. J’ai vu les colis partir… et les attentes derrière. J’ai voulu créer une solution concrète, utile, avec une vision à long terme : ouvrir les portes de l’e-commerce à tous. SamaColis, c’est notre réponse. »
        </p>
        <p className="text-gray-600 text-right font-semibold">- Ibra, Fondateur de SamaColis</p>
      </div>

      {/* CTA Final */}
      <div className="text-center">
        <Button variant="accent" onClick={() => window.location.href='/contact'}>
          Contactez-nous
        </Button>
      </div>
    </section>
  );
}