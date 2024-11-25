import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function FloatingSearchButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Ne pas afficher le bouton sur la page d'accueil
  if (location.pathname === '/') return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/')}
      className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
    >
      <Search size={24} />
      <span className="sr-only">Nouvelle recherche</span>
    </motion.button>
  );
}