export interface MovieResult {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  backdrop_path: string | null;
  original_language: string;
  runtime?: number;
}

export interface TvResult {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  backdrop_path: string | null;
  original_language: string;
  episode_run_time?: number[];
}

export interface SearchParams {
  type: 'movie' | 'tv';
  query?: string;
  page?: string;
  include_adult?: string;
  language?: string;
  year?: string;
}

export interface MediaResponse {
  page: number;
  results: (MovieResult | TvResult)[];
  total_pages: number;
  total_results: number;
}

export interface TMDBConfiguration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

export interface AccountDetails {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}