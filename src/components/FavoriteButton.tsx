import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';
import type { MovieResult, TvResult } from '../types/api';

interface FavoriteButtonProps {
  media: MovieResult | TvResult;
  className?: string;
}

export function FavoriteButton({ media, className = '' }: FavoriteButtonProps) {
  const { currentUser } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);
  const navigate = useNavigate();

  const mediaType = 'title' in media ? 'movie' : 'tv';

  useEffect(() => {
    setIsInFavorites(isFavorite(media.id));
  }, [media.id, isFavorite]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    try {
      setIsLoading(true);
      setShowAnimation(true);

      if (isInFavorites) {
        await removeFromFavorites(media.id, mediaType);
        setIsInFavorites(false);
      } else {
        await addToFavorites(media);
        setIsInFavorites(true);
      }

      setTimeout(() => {
        setShowAnimation(false);
      }, 500);
    } catch (error) {
      console.error('Error managing favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`relative p-2 rounded-full transition-all duration-300 ${
          isInFavorites 
            ? 'bg-rose-500 text-white hover:bg-rose-600' 
            : 'bg-gray-100/10 backdrop-blur-sm text-white hover:bg-gray-100/20'
        } ${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        <Heart 
          size={20} 
          className={`transition-all duration-300 transform ${
            isInFavorites ? 'fill-current' : ''
          } ${showAnimation ? 'scale-125' : 'scale-100'}`}
        />
        
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`absolute inset-0 rounded-full ${
                isInFavorites 
                  ? 'bg-rose-400/50' 
                  : 'bg-white/30'
              }`}
            />
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg text-center z-50"
          >
            Connectez-vous pour ajouter aux favoris
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}