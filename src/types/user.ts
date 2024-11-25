export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  watchedMovies: WatchedMedia[];
  watchLater: WatchLaterMedia[];
  favoriteActors: FavoriteActor[];
  favoriteDirectors: FavoriteDirector[];
  createdAt: string;
  updatedAt: string;
}

export interface WatchedMedia {
  id: number;
  title: string;
  mediaType: 'movie' | 'tv';
  posterPath: string | null;
  watchedAt: string;
  rating?: number;
  review?: string;
}

export interface WatchLaterMedia {
  id: number;
  title: string;
  mediaType: 'movie' | 'tv';
  posterPath: string | null;
  addedAt: string;
}

export interface FavoriteActor {
  id: number;
  name: string;
  profilePath: string | null;
  addedAt: string;
}

export interface FavoriteDirector {
  id: number;
  name: string;
  profilePath: string | null;
  addedAt: string;
}