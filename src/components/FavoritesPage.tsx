import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { MediaGrid } from './MediaGrid';
import { useAuth } from '../contexts/AuthContext';

const LoadingPlaceholder = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div 
        key={i}
        className="bg-white/5 rounded-xl overflow-hidden animate-pulse"
      >
        <div className="aspect-[2/3] bg-white/10" />
        <div className="p-4 space-y-3">
          <div className="h-6 bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-white/10 rounded w-1/2" />
          <div className="h-4 bg-white/10 rounded w-full" />
        </div>
      </div>
    ))}
  </div>
);

export function FavoritesPage() {
  const { favorites, loading, refreshFavorites } = useFavorites();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          Connectez-vous pour voir vos favoris
        </h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
        >
          <ArrowLeft size={20} />
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-indigo-300 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          <span>Retour</span>
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Search size={20} />
          <span>Rechercher des films</span>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-rose-500" />
        <h1 className="text-3xl font-bold text-white">Mes favoris</h1>
      </div>

      {loading ? (
        <LoadingPlaceholder />
      ) : favorites.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-xl text-gray-300 mb-4">
            Vous n'avez pas encore de favoris
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
          >
            Découvrir des films et séries
          </Link>
        </motion.div>
      ) : (
        <MediaGrid
          media={favorites}
          imageBaseUrl="https://image.tmdb.org/t/p/"
          loading={loading}
        />
      )}
    </motion.div>
  );
}