import React, { useEffect, useState } from 'react';
import { MovieResult } from '../types/api';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2U2NDRhMTRkMTJmN2MyYzY5YTRjZTgwYjM4YTY4NiIsIm5iZiI6MTczMjI3MzUzMi44Mzk2MTEzLCJzdWIiOiI2NzQwNjQ4MmRhZTJlNmE5MzgyNTVkYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YqujyXmC5kIFRLdy1yx50HSC04RZmd2XX3Dobyx523Y';

export function BackdropSlider() {
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?language=fr-FR',
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        setMovies(data.results.filter((movie: MovieResult) => movie.backdrop_path));
      } catch (err) {
        console.error('Failed to fetch popular movies:', err);
      }
    }

    fetchPopularMovies();
    const interval = setInterval(fetchPopularMovies, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((current) => (current + 1) % movies.length);
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [movies.length]);

  if (!movies.length) return null;

  const currentMovie = movies[currentIndex];
  const backdropUrl = `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`;

  return (
    <div className="absolute inset-0 -z-10">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${backdropUrl})`,
          opacity: 0.65
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
    </div>
  );
}