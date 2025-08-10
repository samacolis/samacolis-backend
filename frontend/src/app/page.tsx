"use client";
import Button from '../components/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
            Votre Passerelle Colis vers l&apos;Afrique
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-up delay-200">
            Achetez en Europe, réexpédiez en toute simplicité au Sénégal, en Côte d&apos;Ivoire et au-delà.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-400">
            <Button variant="accent" onClick={() => window.location.href='/inscription'}>
              S&apos;inscrire Gratuitement
            </Button>
            <Button variant="secondary" onClick={() => window.location.href='/devis'}>
              Estimer un Colis
            </Button>
          </div>
        </div>
        {/* Placeholder for background image/illustration */}
        <div className="absolute inset-0 z-[-1] opacity-10" style={{ backgroundImage: 'url(/images/map-africa.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </section>

      {/* How It Works Section (Summary) */}
      <section className="w-full py-16 px-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-center">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-emerald-700 mb-12">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center border-t-4 border-emerald-600">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-emerald-600 mb-2">1. Achetez en ligne</h3>
              <p className="text-gray-700">Commandez sur vos sites européens préférés (Amazon, Shein, Vinted...).</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center border-t-4 border-emerald-600">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-emerald-600 mb-2">2. Livrez chez nous</h3>
              <p className="text-gray-700">Utilisez votre adresse SamaColis en Europe comme point de livraison.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center border-t-4 border-emerald-600">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-emerald-600 mb-2">3. Recevez en Afrique</h3>
              <p className="text-gray-700">Nous regroupons et réexpédions vos colis à votre porte.</p>
            </div>
          </div>
          <Link href="/fonctionnement" className="mt-12 inline-block text-emerald-600 hover:underline text-lg font-semibold">
            Voir toutes les étapes →
          </Link>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="w-full py-16 px-4 bg-white text-center">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-emerald-700 mb-12">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md text-left">
              <h3 className="text-2xl font-semibold text-emerald-600 mb-4">✈️ Envoi Aérien & Maritime</h3>
              <p className="text-gray-700 mb-4">Choisissez le mode d&apos;expédition qui vous convient : rapide par avion ou économique par bateau. Nous couvrons les principales destinations en Afrique.</p>
              <Link href="/tarifs" className="text-emerald-600 hover:underline font-semibold">Voir nos tarifs détaillés →</Link>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md text-left">
              <h3 className="text-2xl font-semibold text-emerald-600 mb-4">🛍️ Achats E-commerce Simplifiés</h3>
              <p className="text-gray-700 mb-4">Accédez aux plus grandes plateformes européennes (Amazon, Shein, Vinted...) sans contraintes. Nous réceptionnons, regroupons et réexpédions vos achats.</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Image src="/images/amazon.png" alt="Amazon" width={80} height={40} className="object-contain" />
                <Image src="/images/shein.png" alt="Shein" width={80} height={40} className="object-contain" />
                <Image src="/images/vinted.png" alt="Vinted" width={80} height={40} className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SamaColis Section */}
      <section className="w-full py-16 px-4 bg-gray-50 text-center">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-emerald-700 mb-12">Pourquoi choisir SamaColis ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-emerald-600 mb-2">Service Humain & Proche</h3>
              <p className="text-gray-700">Nous sommes une équipe dédiée, à votre écoute pour un accompagnement personnalisé.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-emerald-600 mb-2">Paiement Local Facilité</h3>
              <p className="text-gray-700">Payez vos expéditions via Orange Money, Wave et d'autres options locales.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-emerald-600 mb-2">Suivi Transparent</h3>
              <p className="text-gray-700">Gardez un œil sur vos colis à chaque étape, de l&apos;entrepôt à votre porte.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Figures Section */}
      <section className="w-full py-16 px-4 bg-gray-100 text-center">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-emerald-700 mb-12">SamaColis en Chiffres</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-5xl font-bold text-emerald-600 mb-2">1000+</div>
              <p className="text-gray-700">Colis Livrés</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-5xl font-bold text-emerald-600 mb-2">5+</div>
              <p className="text-gray-700">Pays Desservis</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-5xl font-bold text-emerald-600 mb-2">500+</div>
              <p className="text-gray-700">Clients Satisfaits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 px-4 bg-white text-center">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-emerald-700 mb-12">Ce que nos clients disent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-left">
              <p className="text-gray-700 italic mb-4">Test</p>
              <p className="font-semibold text-emerald-600">- Fatou D., Dakar</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-left">
              <p className="text-gray-700 italic mb-4">&quot;Je peux enfin commander sur Vinted et recevoir mes articles en Côte d&apos;Ivoire sans souci. Merci SamaColis !&quot;</p>
              <p className="font-semibold text-emerald-600">- Marc L., Abidjan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full py-16 px-4 bg-gray-100 text-center">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-emerald-700 mb-12">Nos Partenaires</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {/* Placeholder for partner logos */}
            <Image src="/images/dhl-logo.png" alt="DHL Logo" width={100} height={50} className="object-contain opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/images/fedex-logo.png" alt="FedEx Logo" width={100} height={50} className="object-contain opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/images/chronopost-logo.png" alt="Chronopost Logo" width={100} height={50} className="object-contain opacity-70 hover:opacity-100 transition-opacity" />
            {/* Add more partner logos as needed */}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full bg-emerald-700 text-white py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Prêt à simplifier vos envois ?</h2>
          <p className="text-xl mb-8">Rejoignez des milliers d&apos;utilisateurs satisfaits et commencez d&apos;aujourd&apos;hui !</p>
          <Button variant="accent" onClick={() => window.location.href='/inscription'}>
            Je m&apos;inscris maintenant
          </Button>
        </div>
      </section>
    </main>
  );
}