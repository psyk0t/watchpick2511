import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Info } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import { MediaGrid } from '../MediaGrid';

const LoadingPlaceholder = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
    {[...Array(12)].map((_, i) => (
      <div 
        key={i}
        className="bg-white/5 rounded-lg overflow-hidden animate-pulse"
      >
        <div className="aspect-[2/3] bg-white/10" />
        <div className="p-3 space-y-2">
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-3 bg-white/10 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export function FavoritesSection() {
  const { favorites, loading, refreshFavorites } = useFavorites();

  React.useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart className="w-8 h-8 text-rose-500" />
          <h2 className="text-2xl font-bold text-white">Mes Favoris</h2>
        </div>
      </div>

      <div className="bg-indigo-600/20 backdrop-blur-sm rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-2 text-sm">
          <p className="text-white">
            Ajoutez vos films et séries préférés à vos favoris en cliquant sur le cœur ❤️
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Gardez une trace de vos coups de cœur</li>
            <li>Partagez facilement vos recommandations</li>
            <li>Retrouvez rapidement vos contenus préférés</li>
          </ul>
        </div>
      </div>

      {loading ? (
        <LoadingPlaceholder />
      ) : favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-400">
            Vous n'avez pas encore de favoris
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Cliquez sur le cœur d'un film ou d'une série pour l'ajouter à vos favoris
          </p>
        </div>
      ) : (
        <MediaGrid
          media={favorites}
          imageBaseUrl="https://image.tmdb.org/t/p/"
          loading={loading}
        />
      )}
    </div>
  );
}