import { MovieResult, TvResult, SearchParams, MediaResponse, PreferenceState } from '../types/api';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2U2NDRhMTRkMTJmN2MyYzY5YTRjZTgwYjM4YTY4NiIsIm5iZiI6MTczMjQwNDM3NC4yNDcwNzU4LCJzdWIiOiI2NzQwNjQ4MmRhZTJlNmE5MzgyNTVkYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hx5n4Q2pNdGtiyDQolSY2bcIzC-y8p_K7_4DfL3NdhI';

export class MediaAPI {
  private static async fetchTMDB(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`https://api.themoviedb.org/3${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async getRandomHighlyRated() {
    try {
      // Get random movie (excluding anime)
      const movieResponse = await this.fetchTMDB('/discover/movie', {
        'language': 'fr-FR',
        'sort_by': 'vote_average.desc',
        'vote_count.gte': '1000',
        'vote_average.gte': '8',
        'with_original_language': 'en|fr',
        'page': Math.floor(Math.random() * 5 + 1).toString()
      });

      // Get random TV show (excluding anime)
      const tvResponse = await this.fetchTMDB('/discover/tv', {
        'language': 'fr-FR',
        'sort_by': 'vote_average.desc',
        'vote_count.gte': '1000',
        'vote_average.gte': '8',
        'with_original_language': 'en|fr',
        'page': Math.floor(Math.random() * 5 + 1).toString()
      });

      // Get random anime
      const animeResponse = await this.fetchTMDB('/discover/tv', {
        'language': 'fr-FR',
        'sort_by': 'vote_average.desc',
        'vote_count.gte': '500',
        'vote_average.gte': '8',
        'with_original_language': 'ja',
        'with_genres': '16', // Animation genre
        'page': Math.floor(Math.random() * 5 + 1).toString()
      });

      const randomMovie = movieResponse.results[Math.floor(Math.random() * movieResponse.results.length)];
      const randomTv = tvResponse.results[Math.floor(Math.random() * tvResponse.results.length)];
      const randomAnime = animeResponse.results[Math.floor(Math.random() * animeResponse.results.length)];

      return [
        { ...randomMovie, media_type: 'movie' },
        { ...randomTv, media_type: 'tv' },
        { ...randomAnime, media_type: 'tv', is_anime: true }
      ];
    } catch (error) {
      console.error('Error fetching random highly rated:', error);
      throw error;
    }
  }

  // Rest of the API class methods...
  static async getPopularMovies() {
    try {
      const data = await this.fetchTMDB('/discover/movie', {
        'include_adult': 'false',
        'include_video': 'false',
        'language': 'fr-FR',
        'page': '1',
        'sort_by': 'popularity.desc',
        'vote_average.gte': '7'
      });
      return data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }

  static async getPopularTVShows() {
    try {
      const data = await this.fetchTMDB('/discover/tv', {
        'include_adult': 'false',
        'include_null_first_air_dates': 'false',
        'language': 'fr-FR',
        'page': '1',
        'sort_by': 'popularity.desc',
        'vote_average.gte': '7'
      });
      return data.results;
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
      throw error;
    }
  }

  static async getTrending() {
    try {
      const data = await this.fetchTMDB('/trending/all/week', { language: 'fr' });
      return data.results;
    } catch (error) {
      console.error('Error fetching trending:', error);
      throw error;
    }
  }

  static async getRecommendations(preferences: PreferenceState) {
    const { mediaType } = preferences;
    const params: Record<string, string> = {
      'language': 'fr-FR',
      'sort_by': 'vote_average.desc,popularity.desc',
      'include_adult': 'false',
      'vote_average.gte': '6.5',
      'vote_count.gte': '100',
      'page': '1'
    };

    if (mediaType === 'movie' && preferences.era?.primary_release_date) {
      const { gte, lte } = preferences.era.primary_release_date;
      if (gte) params['primary_release_date.gte'] = gte;
      if (lte) params['primary_release_date.lte'] = lte;
    } else if (mediaType === 'tv' && preferences.era?.first_air_date) {
      const { gte, lte } = preferences.era.first_air_date;
      if (gte) params['first_air_date.gte'] = gte;
      if (lte) params['first_air_date.lte'] = lte;
    }

    if (preferences.mood?.genres) {
      params.with_genres = preferences.mood.genres.join(',');
    }

    if (preferences.language?.language) {
      params.with_original_language = preferences.language.language;
    }

    if (preferences.rating?.vote_average_gte) {
      params['vote_average.gte'] = preferences.rating.vote_average_gte.toString();
    }
    if (preferences.rating?.vote_count_gte) {
      params['vote_count.gte'] = preferences.rating.vote_count_gte.toString();
    }
    if (preferences.rating?.vote_count_lte) {
      params['vote_count.lte'] = preferences.rating.vote_count_lte.toString();
    }

    const endpoint = `/discover/${mediaType}`;
    try {
      const data = await this.fetchTMDB(endpoint, params);
      
      const sortedResults = data.results.sort((a: MovieResult | TvResult, b: MovieResult | TvResult) => {
        const ratingDiff = b.vote_average - a.vote_average;
        return ratingDiff !== 0 ? ratingDiff : b.popularity - a.popularity;
      });

      return {
        ...data,
        results: sortedResults.filter((item: MovieResult | TvResult) => 
          item.vote_average >= 6.5 &&
          item.overview &&
          (item.poster_path || item.backdrop_path)
        )
      };
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  }
}