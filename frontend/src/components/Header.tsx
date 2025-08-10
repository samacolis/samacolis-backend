"use client";
import Link from 'next/link';
import useAuth from '../services/useAuth';
import React, { useState } from 'react'; // Import useState

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État pour le menu déroulant

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex items-center">
        <Link href="/" className="text-2xl font-bold text-emerald-600">
          SamaColis
        </Link>
        <div className="flex-grow flex justify-center items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-emerald-600">Accueil</Link>
          
          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none flex items-center"
            >
              Services
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <Link href="/fonctionnement" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Comment ça marche ?</Link>
                <Link href="/tarifs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tarifs</Link>
                <Link href="/devis" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Devis</Link>
                <Link href="/track-colis" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Suivre un colis</Link>
              </div>
            )}
          </div>

          <Link href="/contact" className="text-gray-700 hover:text-emerald-600">Contact</Link>
          <Link href="/a-propos" className="text-gray-700 hover:text-emerald-600">À Propos</Link>
          {isAuthenticated && (
            <Link href="/dashboard" className="text-gray-700 hover:text-emerald-600">Tableau de bord</Link>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="px-4 py-2 text-gray-700 hover:text-emerald-600 rounded-md border border-gray-300 hover:border-emerald-600"
            >
              Déconnexion
            </button>
          ) : (
            <>
              <Link href="/connexion" className="px-4 py-2 text-gray-700 hover:text-emerald-600">
                Connexion
              </Link>
              <Link href="/inscription" className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500">
                Inscription
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
