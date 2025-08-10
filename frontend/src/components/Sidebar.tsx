"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '../services/useAuth';

const Sidebar = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        <Link href="/">SamaColis</Link>
      </div>
      <nav className="flex-grow">
        <ul className="py-4">
          <li className="px-6 py-3 hover:bg-gray-700">
            <Link href="/dashboard">Tableau de bord</Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-700">
            <Link href="/dashboard/colis">Mes Colis</Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-700">
            <Link href="/declarer-colis">Déclarer un Colis</Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-700">
            <Link href="/acheter-en-ligne">Acheter en ligne</Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-700">
            <Link href="/dashboard/profil">Mon Profil</Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-700">
            <Link href="/dashboard/facturation">Facturation</Link>
          </li>
        </ul>
      </nav>
      <div className="p-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
