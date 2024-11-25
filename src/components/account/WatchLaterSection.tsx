import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { WatchLaterMedia } from '../../types/user';

interface WatchLaterSectionProps {
  watchLater: WatchLaterMedia[];
}

export function WatchLaterSection({ watchLater = [] }: WatchLaterSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">À voir plus tard</h2>
      </div>

      <div className="bg-indigo-600/20 backdrop-blur-sm rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-2 text-sm">
          <p className="text-white">
            Créez votre liste de films et séries à regarder plus tard 🎬
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Ne perdez plus les contenus qui vous intéressent</li>
            <li>Organisez vos futures soirées cinéma</li>
            <li>Recevez des recommandations similaires</li>
            <li>Une fois regardé, marquez-le comme "vu" pour le retrouver dans votre historique</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {watchLater.map((media) => (
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
              </div>

              <div className="p-4">
                <h3 className="text-sm font-medium text-white mb-2">
                  {media.title}
                </h3>
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar size={12} className="mr-1" />
                  <span>
                    Ajouté le {new Date(media.addedAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {watchLater.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          <p className="text-lg">Vous n'avez pas encore de films ou séries à voir plus tard</p>
          <p className="text-sm mt-2">Ajoutez-en depuis la page d'un film ou d'une série</p>
        </div>
      )}
    </div>
  );
}