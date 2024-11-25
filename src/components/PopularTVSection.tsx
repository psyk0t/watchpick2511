import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tv } from 'lucide-react';
import { MediaGrid } from './MediaGrid';
import { MediaAPI } from '../services/api';
import type { TvResult } from '../types/api';

export function PopularTVSection() {
  const [shows, setShows] = useState<TvResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPopularShows() {
      try {
        const data = await MediaAPI.getPopularTVShows();
        setShows(data);
      } catch (err) {
        setError('Erreur lors du chargement des séries populaires');
        console.error('Error fetching popular TV shows:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularShows();
    const interval = setInterval(fetchPopularShows, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  if (!shows.length && !loading) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Tv className="w-8 h-8 text-indigo-400" />
          <div>
            <h2 className="text-3xl font-bold text-white">Séries Populaires</h2>
            <p className="text-gray-400 mt-1">Les séries les plus regardées du moment</p>
          </div>
        </div>

        <MediaGrid
          media={shows}
          imageBaseUrl="https://image.tmdb.org/t/p/"
          loading={loading}
          error={error}
        />
      </div>
    </motion.section>
  );
}