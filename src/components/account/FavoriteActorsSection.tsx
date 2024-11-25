import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trash2, Plus } from 'lucide-react';
import type { FavoriteActor } from '../../types/user';

interface FavoriteActorsSectionProps {
  favoriteActors: FavoriteActor[];
}

export function FavoriteActorsSection({ favoriteActors }: FavoriteActorsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Acteurs Favoris</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus size={20} />
          <span>Ajouter</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteActors.map((actor) => (
          <motion.div
            key={actor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg overflow-hidden"
          >
            <div className="aspect-square relative">
              {actor.profilePath ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${actor.profilePath}`}
                  alt={actor.name}
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
                {actor.name}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>
                  {new Date(actor.addedAt).toLocaleDateString('fr-FR')}
                </span>
                <button className="text-rose-500 hover:text-rose-400">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {favoriteActors.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          Vous n'avez pas encore d'acteurs favoris
        </div>
      )}
    </div>
  );
}