import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowLeft, Brain, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MediaGrid } from './MediaGrid';
import { MediaAPI } from '../services/api';
import type { MovieResult, TvResult } from '../types/api';

type SearchMode = 'landing' | 'random';

export function SearchModule() {
  const [searchMode, setSearchMode] = useState<SearchMode>('landing');
  const [results, setResults] = useState<(MovieResult | TvResult)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetSearch = () => {
    setSearchMode('landing');
    setResults([]);
    setError(null);
  };

  const handleRandomPicks = async () => {
    setLoading(true);
    try {
      const picks = await MediaAPI.getRandomHighlyRated();
      setResults(picks);
    } catch (err) {
      setError("Une erreur est survenue lors de la recherche");
    } finally {
      setLoading(false);
    }
  };

  if (searchMode === 'landing') {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-center text-white mb-16"
        >
          Fini le Scroll Infini : trouve ton film ou ta série en 10 secondes grâce à l'IA
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            to="/ai-search"
            className="block"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-2xl h-full"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1965&ixlib=rb-4.0.3')",
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

              <div className="relative h-full flex flex-col items-center justify-end p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-full p-4 transition-all duration-300 group-hover:bg-white/20">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">
                  Recherche IA
                </h3>
                <p className="text-gray-300 text-sm max-w-sm">
                  Notre intelligence artificielle trouve le contenu parfait pour vous
                </p>
              </div>
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setSearchMode('random');
              handleRandomPicks();
            }}
            className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-2xl h-full"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
              style={{ 
                backgroundImage: "url('https://ici.artv.ca/upload/site/post/picture/2241/6580ab73164a5.1724780152.jpg')",
              }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

            <div className="relative h-full flex flex-col items-center justify-end p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-full p-4 transition-all duration-300 group-hover:bg-white/20">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">
                Recherche Coups de cœur
              </h3>
              <p className="text-gray-300 text-sm max-w-sm">
                1 Super Film & 1 Super Série & 1 Super Anime
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex justify-center"
        >
          <motion.button
            onClick={resetSearch}
            className="group relative overflow-hidden rounded-xl px-8 py-4 bg-white/10 backdrop-blur-sm text-white shadow-xl hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative flex items-center gap-3">
              <Brain className="w-6 h-6" />
              <span className="text-lg font-medium">Nouvelle recherche</span>
            </div>
          </motion.button>
        </motion.div>
      )}

      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 p-4 bg-red-900/50 backdrop-blur-sm rounded-lg">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <MediaGrid
          media={results}
          imageBaseUrl="https://image.tmdb.org/t/p/"
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}