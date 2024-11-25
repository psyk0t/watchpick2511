import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QuestionFlow } from './QuestionFlow';
import { MediaGrid } from '../MediaGrid';
import { useRecommendations } from '../../hooks/useRecommendations';
import type { SearchPreferences } from '../../types/search';

export function AISearchPage() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<SearchPreferences>({
    mediaType: null,
    platform: null,
    mood: null,
    genre: null,
    era: null,
    rating: null,
    language: null
  });

  const { recommendations, loading, error } = useRecommendations(preferences);

  const handlePreferencesUpdate = (newPreferences: Partial<SearchPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white hover:text-indigo-300 transition-colors mb-6 sm:mb-8"
      >
        <ArrowLeft size={20} />
        <span>Retour</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <Brain className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-400" />
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Recherche Intelligente
          </h1>
        </div>
        <p className="text-base sm:text-xl text-gray-300">
          Laissez-vous guider pour trouver le film ou la série parfait
        </p>
      </motion.div>

      <QuestionFlow
        preferences={preferences}
        onUpdate={handlePreferencesUpdate}
      />

      <AnimatePresence mode="wait">
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 sm:mt-12"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
              Recommandations pour vous
            </h2>
            <MediaGrid
              media={recommendations}
              imageBaseUrl="https://image.tmdb.org/t/p/"
              loading={loading}
              error={error}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}