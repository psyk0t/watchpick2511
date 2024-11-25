import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Film, Star, Users, Clock, Bookmark, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ProfileSection } from './ProfileSection';
import { WatchedMediaSection } from './WatchedMediaSection';
import { WatchLaterSection } from './WatchLaterSection';
import { FavoritesSection } from './FavoritesSection';
import { FavoriteActorsSection } from './FavoriteActorsSection';
import { FavoriteDirectorsSection } from './FavoriteDirectorsSection';
import { useUserProfile } from '../../hooks/useUserProfile';
import type { UserProfile } from '../../types/user';

const tabs = [
  { id: 'profile', label: 'Profil', icon: Settings },
  { id: 'watched', label: 'Films vus', icon: Film },
  { id: 'favorites', label: 'Favoris', icon: Heart },
  { id: 'watchLater', label: 'À voir plus tard', icon: Bookmark },
  { id: 'actors', label: 'Acteurs favoris', icon: Star },
  { id: 'directors', label: 'Réalisateurs favoris', icon: Users }
] as const;

type TabId = typeof tabs[number]['id'];

export function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { profile, loading, error, updateProfile } = useUserProfile();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser || loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
        Une erreur est survenue lors du chargement de votre profil
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-6">
          {activeTab === 'profile' && (
            <ProfileSection profile={profile} onUpdate={updateProfile} />
          )}
          {activeTab === 'watched' && (
            <WatchedMediaSection watchedMedia={profile.watchedMovies} />
          )}
          {activeTab === 'favorites' && (
            <FavoritesSection />
          )}
          {activeTab === 'watchLater' && (
            <WatchLaterSection watchLater={profile.watchLater} />
          )}
          {activeTab === 'actors' && (
            <FavoriteActorsSection favoriteActors={profile.favoriteActors} />
          )}
          {activeTab === 'directors' && (
            <FavoriteDirectorsSection favoriteDirectors={profile.favoriteDirectors} />
          )}
        </div>
      </div>
    </motion.div>
  );
}