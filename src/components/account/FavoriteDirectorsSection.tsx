import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trash2, Plus } from 'lucide-react';
import type { FavoriteDirector } from '../../types/user';

interface FavoriteDirectorsSectionProps {
  favoriteDirectors: FavoriteDirector[];
}

export function FavoriteDirectorsSection({ favoriteDirectors }: FavoriteDirectorsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Réalisateurs Favoris</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus size={20} />
          <span>Ajouter</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteDirectors.map((director) => (
          <motion.div
            key={director.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg overflow-hidden"
          >
            <div className="aspect-square relative">
              {director.profilePath ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${director.profilePath}`}
                  alt={director.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                {director.name}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>
                  {new Date(director.addedAt).toLocaleDateString('fr-FR')}
                </span>
                <button className="text-rose-500 hover:text-rose-400">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {favoriteDirectors.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          Vous n'avez pas encore de réalisateurs favoris
        </div>
      )}
    </div>
  );
}