import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { WatchedMedia } from '../../types/user';

interface WatchedMediaSectionProps {
  watchedMedia: WatchedMedia[];
}

export function WatchedMediaSection({ watchedMedia }: WatchedMediaSectionProps) {
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');

  const sortedMedia = [...watchedMedia].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime();
    }
    return (b.rating || 0) - (a.rating || 0);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Films et Séries Vus</h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'rating')}
          className="bg-white/10 text-white border border-gray-600 rounded-lg px-3 py-2"
        >
          <option value="date">Trier par date</option>
          <option value="rating">Trier par note</option>
        </select>
      </div>

      <div className="bg-indigo-600/20 backdrop-blur-sm rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-2 text-sm">
          <p className="text-white">
            Gardez une trace de tous les films et séries que vous avez regardés 📝
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Construisez votre historique de visionnage</li>
            <li>Notez et donnez votre avis sur chaque contenu</li>
            <li>Évitez de regarder deux fois le même film par erreur</li>
            <li>Obtenez des statistiques sur vos habitudes de visionnage</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {sortedMedia.map((media) => (
          <motion.div
            key={`${media.mediaType}-${media.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg overflow-hidden"
          >
            <Link to={`/${media.mediaType}/${media.id}`}>
              <div className="aspect-[2/3] relative">
                {media.posterPath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${media.posterPath}`}
                    alt={media.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-4xl">🎬</span>
                  </div>
                )}
                {media.rating && (
                  <div className="absolute top-2 right-2 bg-yellow-500/90 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                    <Star size={12} className="fill-current" />
                    <span>{media.rating}/10</span>
                  </div>
                )}
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium text-white mb-2">
                  {media.title}
                </h3>
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar size={12} className="mr-1" />
                  <span>
                    {new Date(media.watchedAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                {media.review && (
                  <p className="mt-2 text-xs text-gray-400 line-clamp-2">{media.review}</p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {watchedMedia.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          <p className="text-lg">Vous n'avez pas encore marqué de films ou séries comme vus</p>
          <p className="text-sm mt-2">Marquez-les comme vus depuis leur page respective</p>
        </div>
      )}
    </div>
  );
}