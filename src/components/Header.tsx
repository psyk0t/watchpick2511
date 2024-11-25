import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, UserCircle, Menu, X, Home, Settings, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { StarWarsText } from './StarWarsText';

interface HeaderProps {
  onAuthClick: () => void;
}

export function Header({ onAuthClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logOut } = useAuth();

  const handleAuthClick = async () => {
    if (currentUser) {
      try {
        await logOut();
        setIsMobileMenuOpen(false);
      } catch (error) {
        console.error('Error logging out:', error);
      }
    } else {
      onAuthClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-50"
    >
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Film className="w-6 h-6 text-indigo-400 transform transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 bg-indigo-400/20 blur-lg -z-10"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-tight bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
              Watch<span className="text-indigo-400">Pick</span>
            </span>
            <span className="text-[10px] text-indigo-300/80 font-medium tracking-wide">
              Propulsé par Claude AI 3.5
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-3 py-1.5 text-sm text-white hover:text-indigo-300 transition-colors"
          >
            <Home size={18} className="inline-block mr-1" />
            <span>Accueil</span>
          </Link>

          <Link
            to="/ai-search"
            className="px-3 py-1.5 text-sm bg-indigo-600/30 hover:bg-indigo-600/50 text-white rounded-lg backdrop-blur-sm border border-indigo-500/30 transition-all duration-300 shadow-lg shadow-indigo-500/20 flex items-center gap-1.5 group"
          >
            <Brain size={18} className="text-indigo-300 group-hover:text-indigo-200 transition-colors" />
            <span>Recherche IA</span>
            <div className="absolute inset-0 bg-indigo-400/10 rounded-lg blur-xl -z-10"></div>
          </Link>

          {currentUser && (
            <Link
              to="/compte"
              className="px-3 py-1.5 text-sm text-white hover:text-indigo-300 transition-colors"
            >
              <Settings size={18} className="inline-block mr-1" />
              <span>Mon Compte</span>
            </Link>
          )}
          
          <button
            onClick={handleAuthClick}
            className="px-3 py-1.5 text-sm text-white hover:text-indigo-300 transition-colors"
          >
            <UserCircle size={18} className="inline-block mr-1" />
            <span>{currentUser ? 'Déconnexion' : 'Connexion'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Film className="w-6 h-6 text-indigo-400 transform transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 bg-indigo-400/20 blur-lg -z-10"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-white tracking-tight bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
              Watch<span className="text-indigo-400">Pick</span>
            </span>
            <span className="text-[8px] text-indigo-300/80 font-medium tracking-wide">
              Propulsé par Claude AI 3.5
            </span>
          </div>
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg"
          >
            <div className="p-4 space-y-2">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home size={20} />
                <span>Accueil</span>
              </Link>

              <Link
                to="/ai-search"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600/30 text-white hover:bg-indigo-600/50 rounded-lg border border-indigo-500/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Brain size={20} className="text-indigo-300" />
                <span>Recherche IA</span>
              </Link>

              {currentUser && (
                <Link
                  to="/compte"
                  className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings size={20} />
                  <span>Mon Compte</span>
                </Link>
              )}
              
              <button
                onClick={handleAuthClick}
                className="w-full flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg"
              >
                <UserCircle size={20} />
                <span>{currentUser ? 'Déconnexion' : 'Connexion'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full">
        <StarWarsText />
      </div>
    </motion.div>
  );
}