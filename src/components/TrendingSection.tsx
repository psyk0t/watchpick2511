import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { MediaGrid } from './MediaGrid';
import type { MovieResult, TvResult } from '../types/api';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2U2NDRhMTRkMTJmN2MyYzY5YTRjZTgwYjM4YTY4NiIsIm5iZiI6MTczMjQwNDM3NC4yNDcwNzU4LCJzdWIiOiI2NzQwNjQ4MmRhZTJlNmE5MzgyNTVkYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hx5n4Q2pNdGtiyDQolSY2bcIzC-y8p_K7_4DfL3NdhI';

export function TrendingSection() {
  const [trending, setTrending] = useState<(MovieResult | TvResult)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/trending/all/week?language=fr',
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch trending content');
        }

        const data = await response.json();
        setTrending(data.results);
      } catch (err) {
        setError('Erreur lors du chargement des tendances');
        console.error('Error fetching trending:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
    const interval = setInterval(fetchTrending, 3600000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  if (!trending.length && !loading) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-8 h-8 text-indigo-400" />
          <div>
            <h2 className="text-3xl font-bold text-white">Tendances de la semaine</h2>
            <p className="text-gray-400 mt-1">Les films et séries qui font parler d'eux</p>
          </div>
        </div>

        <MediaGrid
          media={trending}
          imageBaseUrl="https://image.tmdb.org/t/p/"
          loading={loading}
          error={error}
        />
      </div>
    </motion.section>
  );
}