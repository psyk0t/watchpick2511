import { useState, useEffect } from 'react';
import type { MovieResult, TvResult } from '../types/api';
import type { SearchPreferences } from '../types/search';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2U2NDRhMTRkMTJmN2MyYzY5YTRjZTgwYjM4YTY4NiIsIm5iZiI6MTczMjQwNDM3NC4yNDcwNzU4LCJzdWIiOiI2NzQwNjQ4MmRhZTJlNmE5MzgyNTVkYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hx5n4Q2pNdGtiyDQolSY2bcIzC-y8p_K7_4DfL3NdhI';

const MOOD_TO_GENRES = {
  movie: {
    happy: ['35'], // Comedy
    action: ['28'], // Action
    adventure: ['12'], // Adventure
    romantic: ['10749'], // Romance
    mystery: ['9648', '53'], // Mystery, Thriller
    horror: ['27'] // Horror
  },
  tv: {
    happy: ['35'], // Comedy
    action: ['10759'], // Action & Adventure
    adventure: ['10759'], // Action & Adventure
    romantic: ['18', '10766'], // Drama, Soap (includes romantic series)
    mystery: ['9648', '80'], // Mystery, Crime
    horror: ['9648', '10765'] // Mystery, Sci-Fi & Fantasy (includes horror series)
  }
};

const ERA_TO_DATES = {
  classic: { before: '2000' },
  modern: { start: '2000', end: '2020' },
  recent: { after: '2020' }
};

// Map platforms to their TMDB provider IDs
const PLATFORM_TO_PROVIDER = {
  netflix: 8,
  prime: 119,
  disney: 337,
  apple: 350,
  anime: [283, 531] // Crunchyroll and ADN
};

export function useRecommendations(preferences: SearchPreferences) {
  const [recommendations, setRecommendations] = useState<(MovieResult | TvResult)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!preferences.mediaType || !preferences.platform) return;

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          language: preferences.language === 'all' ? 'fr-FR' : preferences.language || 'fr-FR',
          include_adult: 'false',
          sort_by: 'vote_average.desc',
          'vote_count.gte': '100',
          'vote_average.gte': '7',
          'watch_region': 'FR'
        });

        // Add platform filtering
        if (preferences.platform !== 'all') {
          const providerId = PLATFORM_TO_PROVIDER[preferences.platform];
          if (Array.isArray(providerId)) {
            params.append('with_watch_providers', providerId.join('|'));
          } else {
            params.append('with_watch_providers', providerId.toString());
          }
        }

        // Add genre filtering based on media type
        if (preferences.mood) {
          const genres = MOOD_TO_GENRES[preferences.mediaType][preferences.mood];
          if (genres) {
            params.append('with_genres', genres.join(','));
          }
        }

        // Add era filtering
        if (preferences.era) {
          const dates = ERA_TO_DATES[preferences.era];
          if (dates.before) {
            params.append(
              preferences.mediaType === 'movie' ? 'primary_release_date.lte' : 'first_air_date.lte',
              `${dates.before}-12-31`
            );
          }
          if (dates.after) {
            params.append(
              preferences.mediaType === 'movie' ? 'primary_release_date.gte' : 'first_air_date.gte',
              `${dates.after}-01-01`
            );
          }
          if (dates.start && dates.end) {
            params.append(
              preferences.mediaType === 'movie' ? 'primary_release_date.gte' : 'first_air_date.gte',
              `${dates.start}-01-01`
            );
            params.append(
              preferences.mediaType === 'movie' ? 'primary_release_date.lte' : 'first_air_date.lte',
              `${dates.end}-12-31`
            );
          }
        }

        // Add platform-specific filters if needed
        if (preferences.platform === 'anime') {
          params.append('with_original_language', 'ja');
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/${preferences.mediaType}?${params.toString()}`,
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        
        // Filter and sort results
        const filteredResults = data.results
          .filter((item: MovieResult | TvResult) => 
            item.overview &&
            (item.poster_path || item.backdrop_path)
          )
          .sort((a: MovieResult | TvResult, b: MovieResult | TvResult) => 
            b.vote_average - a.vote_average
          );

        setRecommendations(filteredResults.slice(0, 18)); // Limit to top 18 results
      } catch (err) {
        setError('Error fetching recommendations');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [preferences]);

  return { recommendations, loading, error };
}