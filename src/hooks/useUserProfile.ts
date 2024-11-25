import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import type { UserProfile } from '../types/user';

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchProfile() {
      if (!currentUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        } else {
          // Create new profile if it doesn't exist
          const newProfile: UserProfile = {
            id: currentUser.uid,
            email: currentUser.email!,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            watchedMovies: [],
            watchLater: [], // Initialize empty watchLater array
            favoriteActors: [],
            favoriteDirectors: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          await setDoc(userDocRef, newProfile);
          setProfile(newProfile);
        }
      } catch (err) {
        setError('Error fetching profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [currentUser]);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!currentUser || !profile) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });

      setProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  }, [currentUser, profile]);

  return { profile, loading, error, updateProfile };
}