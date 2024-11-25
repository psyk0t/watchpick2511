import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { MediaGrid } from './MediaGrid';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2U2NDRhMTRkMTJmN2MyYzY5YTRjZTgwYjM4YTY4NiIsIm5iZiI6MTczMjQwNDM3NC4yNDcwNzU4LCJzdWIiOiI2NzQwNjQ4MmRhZTJlNmE5MzgyNTVkYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hx5n4Q2pNdGtiyDQolSY2bcIzC-y8p_K7_4DfL3NdhI';

interface WatchLaterRecommendationsProps {
  watchLaterItems: Array<{ id: number; mediaType: string }>;
}

export function WatchLaterRecommendations({ watchLaterItems }: WatchLaterRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!watchLaterItems.length) return;

      setLoading(true);
      try {
        const allRecommendations = await Promise.all(
          watchLaterItems.map(async (item) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/${item.mediaType}/${item.id}/recommendations?language=fr-FR`,
              {
                headers: {
                  'Authorization': `Bearer ${API_KEY}`,
                  'Content-Type': 'application/json',
                },
              }
            );
            const data = await response.json();
            return data.results || [];
          })
        );

        const flatRecommendations = allRecommendations.flat();
        const uniqueRecommendations = Array.from(
          new Map(flatRecommendations.map(item => [item.id, item])).values()
        );

        const topRecommendations = uniqueRecommendations
          .filter(item => 
            item.vote_average >= 7 && 
            item.overview && 
            (item.poster_path || item.backdrop_path)
          )
          .sort((a, b) => b.vote_average - a.vote_average)
          .slice(0, 6);

        setRecommendations(topRecommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [watchLaterItems]);

  if (!watchLaterItems.length || !recommendations.length) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 mt-16"
    >
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-8 h-8 text-indigo-400" />
        <div>
          <h2 className="text-3xl font-bold text-white">Tu vas adorer</h2>
          <p className="text-base text-indigo-300 mt-1 font-medium">
            Basé sur tes Favoris et "À voir plus tard"
          </p>
        </div>
      </div>

      <MediaGrid
        media={recommendations}
        imageBaseUrl="https://image.tmdb.org/t/p/"
        loading={loading}
      />
    </motion.section>
  );
}