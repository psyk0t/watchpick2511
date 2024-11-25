import { useState, useEffect, useCallback } from 'react';
import { doc, setDoc, deleteDoc, collection, query, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import type { MovieResult, TvResult } from '../types/api';

export function useFavorites() {
  const [favorites, setFavorites] = useState<(MovieResult | TvResult)[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  const fetchFavorites = useCallback(async () => {
    if (!currentUser) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: currentUser.email,
          createdAt: new Date().toISOString()
        });
      }

      const favoritesRef = collection(db, `users/${currentUser.uid}/favorites`);
      const favoritesSnapshot = await getDocs(query(favoritesRef));
      const favoritesData = favoritesSnapshot.docs.map(doc => doc.data() as MovieResult | TvResult);
      
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addToFavorites = async (media: MovieResult | TvResult) => {
    if (!currentUser) return;

    try {
      const mediaType = 'title' in media ? 'movie' : 'tv';
      const favoriteRef = doc(db, `users/${currentUser.uid}/favorites/${mediaType}_${media.id}`);
      await setDoc(favoriteRef, {
        ...media,
        addedAt: new Date().toISOString(),
        mediaType
      });

      setFavorites(prev => [...prev, media]);
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  };

  const removeFromFavorites = async (mediaId: number, mediaType: 'movie' | 'tv') => {
    if (!currentUser) return;

    try {
      const favoriteRef = doc(db, `users/${currentUser.uid}/favorites/${mediaType}_${mediaId}`);
      await deleteDoc(favoriteRef);

      setFavorites(prev => prev.filter(item => item.id !== mediaId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  };

  const isFavorite = (mediaId: number) => {
    return favorites.some(item => item.id === mediaId);
  };

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refreshFavorites: fetchFavorites
  };
}