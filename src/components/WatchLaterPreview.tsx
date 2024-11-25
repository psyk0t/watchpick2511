import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { MediaGrid } from './MediaGrid';
import { WatchLaterRecommendations } from './WatchLaterRecommendations';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2U2NDRhMTRkMTJmN2MyYzY5YTRjZTgwYjM4YTY4NiIsIm5iZiI6MTczMjQwNDM3NC4yNDcwNzU4LCJzdWIiOiI2NzQwNjQ4MmRhZTJlNmE5MzgyNTVkYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hx5n4Q2pNdGtiyDQolSY2bcIzC-y8p_K7_4DfL3NdhI';

export function WatchLaterPreview() {
  const { currentUser } = useAuth();
  const { profile, loading } = useUserProfile();
  const [mediaDetails, setMediaDetails] = useState<any[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    async function fetchMediaDetails() {
      if (!profile?.watchLater?.length) return;

      setLoadingDetails(true);
      try {
        const previewItems = profile.watchLater.slice(0, 6);
        const detailsPromises = previewItems.map(async (item) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/${item.mediaType}/${item.id}?language=fr-FR`,
            {
              headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          );
          const data = await response.json();
          return {
            id: data.id,
            title: data.title || data.name,
            name: data.title || data.name,
            poster_path: data.poster_path,
            media_type: item.mediaType,
            vote_average: data.vote_average,
            overview: data.overview,
            release_date: data.release_date || data.first_air_date
          };
        });

        const details = await Promise.all(detailsPromises);
        setMediaDetails(details);
      } catch (error) {
        console.error('Error fetching media details:', error);
      } finally {
        setLoadingDetails(false);
      }
    }

    fetchMediaDetails();
  }, [profile?.watchLater]);

  if (!currentUser || loading || !profile?.watchLater?.length) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 mt-16"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-indigo-400" />
          <h2 className="text-3xl font-bold text-white">Ma liste d'envies</h2>
        </div>
        
        <Link 
          to="/compte?tab=watchLater"
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <span>Voir tout</span>
          <ArrowRight size={20} />
        </Link>
      </div>

      <MediaGrid
        media={mediaDetails}
        imageBaseUrl="https://image.tmdb.org/t/p/"
        loading={loadingDetails}
      />

      {/* Recommendations based on watch later items */}
      <WatchLaterRecommendations watchLaterItems={profile.watchLater} />
    </motion.section>
  );
}