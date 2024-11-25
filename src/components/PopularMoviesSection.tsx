import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';
import { MediaGrid } from './MediaGrid';
import { MediaAPI } from '../services/api';
import type { MovieResult } from '../types/api';

export function PopularMoviesSection() {
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const data = await MediaAPI.getPopularMovies();
        setMovies(data);
      } catch (err) {
        setError('Erreur lors du chargement des films populaires');
        console.error('Error fetching popular movies:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularMovies();
    const interval = setInterval(fetchPopularMovies, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  if (!movies.length && !loading) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Film className="w-8 h-8 text-indigo-400" />
          <div>
            <h2 className="text-3xl font-bold text-white">Films Populaires</h2>
            <p className="text-gray-400 mt-1">Les films les plus regardés du moment</p>
          </div>
        </div>

        <MediaGrid
          media={movies}
          imageBaseUrl="https://image.tmdb.org/t/p/"
          loading={loading}
          error={error}
        />
      </div>
    </motion.section>
  );
}