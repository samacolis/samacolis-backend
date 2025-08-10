import React from 'react';
import Link from 'next/link'; // Importez le composant Link

export default function AcheterEnLignePage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-emerald-700">Acheter en Ligne avec SamaColis</h1>
      <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
        Découvrez les meilleures plateformes pour vos achats en Europe. Nous nous occupons de la réexpédition de vos colis vers l'Afrique, en toute simplicité.
      </p>

      <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-emerald-600 text-center">Nos Partenaires Recommandés</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
          <a href="https://www.amazon.fr" target="_blank" rel="noopener noreferrer" className="group block p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center bg-white">
            <img src="/images/amazon.png" alt="Amazon" className="h-16 mb-4 object-contain" />
            <span className="font-semibold text-lg text-gray-800 group-hover:text-emerald-600">Amazon</span>
          </a>
          <a href="https://www.zalando.fr" target="_blank" rel="noopener noreferrer" className="group block p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center bg-white">
            <img src="/images/zalando_logo.png" alt="Zalando" className="h-16 mb-4 object-contain" />
            <span className="font-semibold text-lg text-gray-800 group-hover:text-emerald-600">Zalando</span>
          </a>
          <a href="https://www.shein.com" target="_blank" rel="noopener noreferrer" className="group block p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center bg-white">
            <img src="/images/shein.png" alt="Shein" className="h-16 mb-4 object-contain" />
            <span className="font-semibold text-lg text-gray-800 group-hover:text-emerald-600">Shein</span>
          </a>
          <a href="https://www.vinted.fr" target="_blank" rel="noopener noreferrer" className="group block p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center bg-white">
            <img src="/images/vinted.png" alt="Vinted" className="h-16 mb-4 object-contain" />
            <span className="font-semibold text-lg text-gray-800 group-hover:text-emerald-600">Vinted</span>
          </a>
          {/* Ajoutez d'autres partenaires ici */}
        </div>

        <h2 className="text-3xl font-bold mt-16 mb-8 text-emerald-600 text-center">Comment ça marche ?</h2>
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-1">Choisissez un site et faites vos achats.</h3>
              <p className="text-gray-700">Explorez vos boutiques en ligne préférées en Europe et remplissez votre panier.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-1">Utilisez votre adresse SamaColis pour la livraison.</h3>
              <p className="text-gray-700">Nous vous fournirons une adresse unique et sécurisée à utiliser comme adresse de livraison.</p>
              <Link href="/dashboard/profil" className="inline-block mt-3 text-sm bg-emerald-100 text-emerald-800 px-4 py-2 rounded-md hover:bg-emerald-200 transition-colors duration-200">
                Obtenir mon adresse de livraison
              </Link>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-1">Déclarez votre colis sur notre plateforme.</h3>
              <p className="text-gray-700">Une fois votre commande passée, revenez sur notre site et remplissez le formulaire de déclaration de colis.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
              4
            </div>
            <div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-1">Nous réceptionnons et vérifions votre colis.</h3>
              <p className="text-gray-700">Dès réception dans notre entrepôt, nous vous notifierons et vérifierons l'état de votre colis.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
              5
            </div>
            <div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-1">Planifiez votre réexpédition vers l'Afrique.</h3>
              <p className="text-gray-700">Choisissez votre mode d'expédition et nous nous occupons du reste, avec un suivi détaillé.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-emerald-600 mb-4">Prêt à commencer ?</h3>
          <Link href="/declarer-colis" className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-500 transition-colors duration-300 shadow-lg text-lg mb-8">
            Déclarer mon premier colis
          </Link>
          <div className="mt-8">
            <Link href="/dashboard/profil" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition-colors duration-300 shadow-lg text-lg">
              Obtenir mon adresse de livraison
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
