import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MovieResult, TvResult } from '../types/api';
import { FavoriteButton } from './FavoriteButton';

interface MediaCardProps {
  media: MovieResult | TvResult;
  imageBaseUrl: string;
}

export function MediaCard({ media, imageBaseUrl }: MediaCardProps) {
  const isMovie = 'title' in media;
  const title = isMovie ? media.title : media.name;
  const releaseDate = isMovie ? media.release_date : media.first_air_date;
  const year = new Date(releaseDate).getFullYear();
  const posterUrl = `${imageBaseUrl}w500${media.poster_path}`;
  const mediaType = isMovie ? 'movie' : 'tv';

  const getRatingBadge = () => {
    if (media.vote_average >= 8) {
      return {
        text: 'À voir absolument',
        className: 'bg-rose-500'
      };
    }
    if (media.vote_average >= 7.5) {
      return {
        text: 'Coup de cœur',
        className: 'bg-amber-500'
      };
    }
    return null;
  };

  const ratingBadge = getRatingBadge();

  return (
    <Link to={`/${mediaType}/${media.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden transition-shadow hover:shadow-xl relative h-full flex flex-col"
      >
        <div className="aspect-[2/3] relative">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {ratingBadge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`absolute top-2 right-2 z-10 ${ratingBadge.className} text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs shadow-lg`}
            >
              <Star size={12} className="fill-current" />
              <span className="font-medium line-clamp-1">{ratingBadge.text}</span>
            </motion.div>
          )}
        </div>
        
        <div className="p-3 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-sm font-medium text-white flex-1 line-clamp-2">
              {title} <span className="text-gray-400">({year})</span>
            </h3>
            <FavoriteButton media={media} className="scale-75" />
          </div>
          
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
            <div className="flex items-center gap-1">
              <Star size={12} className={`${media.vote_average >= 7.5 ? 'text-amber-500' : 'text-yellow-500'}`} />
              <span>{media.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-gray-500" />
              <span>{isMovie ? '2h 15m' : '45m'}</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-400 line-clamp-2 mt-auto">
            {media.overview}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}