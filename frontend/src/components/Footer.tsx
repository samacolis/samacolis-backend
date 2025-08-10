import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-200 border-t">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-700 text-sm">© 2025 SamaColis. Tous droits réservés.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link href="/mentions-legales" className="text-gray-700 hover:text-emerald-600 text-sm">Mentions Légales</Link>
          <Link href="/confidentialite" className="text-gray-700 hover:text-emerald-600 text-sm">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
