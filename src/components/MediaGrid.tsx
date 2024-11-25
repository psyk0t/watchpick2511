import React from 'react';
import { MovieResult, TvResult } from '../types/api';
import { MediaCard } from './MediaCard';
import { Loader2 } from 'lucide-react';

interface MediaGridProps {
  media: (MovieResult | TvResult)[];
  imageBaseUrl: string;
  loading?: boolean;
  error?: string | null;
}

export function MediaGrid({ media, imageBaseUrl, loading, error }: MediaGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  if (!media.length) {
    return (
      <div className="text-center text-gray-300 p-4">
        Aucune recommandation trouvée. Essaie d'ajuster tes préférences.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {media.map((item, index) => (
        <MediaCard
          key={`${item.id}-${index}`}
          media={item}
          imageBaseUrl={imageBaseUrl}
        />
      ))}
    </div>
  );
}