import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film, Tv, Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2U2NDRhMTRkMTJmN2MyYzY5YTRjZTgwYjM4YTY4NiIsIm5iZiI6MTczMjI3MzUzMi44Mzk2MTEzLCJzdWIiOiI2NzQwNjQ4MmRhZTJlNmE5MzgyNTVkYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YqujyXmC5kIFRLdy1yx50HSC04RZmd2XX3Dobyx523Y';

interface Credit {
  id: number;
  title?: string;
  name?: string;
  media_type: string;
  character: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  poster_path: string | null;
}

interface ActorFilmographyProps {
  actorId: number;
  actorName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ActorFilmography({ actorId, actorName, isOpen, onClose }: ActorFilmographyProps) {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCredits() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}/combined_credits?language=fr-FR`,
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        
        // Filtrer et trier les crédits
        const sortedCredits = data.cast
          .filter((credit: Credit) => credit.vote_average >= 5)
          .sort((a: Credit, b: Credit) => {
            const dateA = a.release_date || a.first_air_date || '';
            const dateB = b.release_date || b.first_air_date || '';
            return dateB.localeCompare(dateA);
          });

        setCredits(sortedCredits);
      } catch (err) {
        setError('Erreur lors du chargement de la filmographie');
      } finally {
        setLoading(false);
      }
    }

    if (isOpen) {
      fetchCredits();
    }
  }, [actorId, isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Filmographie de {actorName}
            </h2>

            {loading && (
              <div className="flex justify-center items-center h-32">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {error && (
              <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {credits.map((credit) => {
                  const date = credit.release_date || credit.first_air_date;
                  const year = date ? new Date(date).getFullYear() : null;
                  const title = credit.title || credit.name;
                  const mediaType = credit.media_type === 'movie' ? 'film' : 'série';

                  return (
                    <Link
                      key={`${credit.id}-${credit.character}`}
                      to={`/${credit.media_type}/${credit.id}`}
                      onClick={onClose}
                      className="flex bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors"
                    >
                      {credit.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${credit.poster_path}`}
                          alt={title}
                          className="w-16 h-24 object-cover"
                        />
                      ) : (
                        <div className="w-16 h-24 bg-gray-200 flex items-center justify-center">
                          {credit.media_type === 'movie' ? (
                            <Film className="w-8 h-8 text-gray-400" />
                          ) : (
                            <Tv className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                      )}
                      
                      <div className="flex-1 p-3">
                        <h3 className="font-medium text-gray-800 mb-1">
                          {title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                          {year && (
                            <>
                              <Calendar size={14} />
                              <span>{year}</span>
                            </>
                          )}
                          <Star size={14} className="text-yellow-500" />
                          <span>{credit.vote_average.toFixed(1)}</span>
                        </div>
                        <p className="text-sm text-gray-600 italic">
                          {credit.character || `Rôle dans ce ${mediaType}`}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}