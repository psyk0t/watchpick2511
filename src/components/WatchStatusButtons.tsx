import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Plus, BookmarkPlus, BookmarkCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';

interface WatchStatusButtonsProps {
  mediaId: number;
  mediaType: 'movie' | 'tv';
  title: string;
  posterPath: string | null;
  onAuthClick: () => void;
}

export function WatchStatusButtons({ mediaId, mediaType, title, posterPath, onAuthClick }: WatchStatusButtonsProps) {
  const { currentUser } = useAuth();
  const { profile, loading, updateProfile } = useUserProfile();

  const isWatched = profile?.watchedMovies?.some(m => m.id === mediaId) || false;
  const isWatchLater = profile?.watchLater?.some(m => m.id === mediaId) || false;

  const handleAddToWatched = async () => {
    if (!currentUser) {
      onAuthClick();
      return;
    }

    if (!profile) return;

    try {
      const newWatchedMedia = {
        id: mediaId,
        title,
        mediaType,
        posterPath,
        watchedAt: new Date().toISOString()
      };

      const updatedWatchedMovies = [...(profile.watchedMovies || [])];

      if (isWatched) {
        const index = updatedWatchedMovies.findIndex(m => m.id === mediaId);
        if (index !== -1) {
          updatedWatchedMovies.splice(index, 1);
        }
      } else {
        updatedWatchedMovies.push(newWatchedMedia);
        if (isWatchLater) {
          const updatedWatchLater = profile.watchLater.filter(m => m.id !== mediaId);
          await updateProfile({ watchLater: updatedWatchLater });
        }
      }

      await updateProfile({
        watchedMovies: updatedWatchedMovies
      });
    } catch (error) {
      console.error('Error updating watch status:', error);
    }
  };

  const handleAddToWatchLater = async () => {
    if (!currentUser) {
      onAuthClick();
      return;
    }

    if (!profile) return;

    try {
      const updatedWatchLater = [...(profile.watchLater || [])];

      if (isWatchLater) {
        const index = updatedWatchLater.findIndex(m => m.id === mediaId);
        if (index !== -1) {
          updatedWatchLater.splice(index, 1);
        }
      } else {
        updatedWatchLater.push({
          id: mediaId,
          title,
          mediaType,
          posterPath,
          addedAt: new Date().toISOString()
        });
      }

      await updateProfile({
        watchLater: updatedWatchLater
      });
    } catch (error) {
      console.error('Error updating watch later status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Chargement...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAuthClick}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          <span>Se connecter pour gérer</span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToWatched}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isWatched
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        {isWatched ? (
          <>
            <CheckCircle size={20} className="fill-current" />
            <span>Déjà vu</span>
          </>
        ) : (
          <>
            <Plus size={20} />
            <span>Marquer comme vu</span>
          </>
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToWatchLater}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isWatchLater
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        {isWatchLater ? (
          <>
            <BookmarkCheck size={20} className="fill-current" />
            <span>Dans la liste</span>
          </>
        ) : (
          <>
            <BookmarkPlus size={20} />
            <span>À voir plus tard</span>
          </>
        )}
      </motion.button>
    </div>
  );
}