"use client";
import React from 'react';

interface ButtonProps {
  children: React.ReactNode; // Le texte ou les éléments à l'intérieur du bouton
  onClick?: () => void; // Fonction appelée au clic
  type?: 'button' | 'submit' | 'reset'; // Type HTML du bouton
  variant?: 'primary' | 'secondary' | 'accent'; // Variante de style
  className?: string; // Classes Tailwind supplémentaires
  disabled?: boolean; // Ajout de la prop disabled
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled, // Ajout de la prop disabled
}) => {
  let baseStyles = 'px-6 py-3 rounded-md font-semibold transition-colors duration-200';

  switch (variant) {
    case 'primary':
      baseStyles += ' bg-emerald-600 text-white hover:bg-emerald-700';
      break;
    case 'secondary':
      baseStyles += ' bg-gray-200 text-gray-800 hover:bg-gray-300';
      break;
    case 'accent':
      baseStyles += ' bg-yellow-400 text-black hover:bg-yellow-500';
      break;
    default:
      baseStyles += ' bg-emerald-600 text-white hover:bg-emerald-700';
  }

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
