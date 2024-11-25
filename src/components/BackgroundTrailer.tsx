import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2U2NDRhMTRkMTJmN2MyYzY5YTRjZTgwYjM4YTY4NiIsIm5iZiI6MTczMjI3MzUzMi44Mzk2MTEzLCJzdWIiOiI2NzQwNjQ4MmRhZTJlNmE5MzgyNTVkYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YqujyXmC5kIFRLdy1yx50HSC04RZmd2XX3Dobyx523Y';

export function BackgroundTrailer() {
  const [randomBackdrop, setRandomBackdrop] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      async function fetchRandomMovie() {
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
          const movies = data.results.filter((movie: any) => movie.backdrop_path);
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          setRandomBackdrop(`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`);
        } catch (error) {
          console.error('Failed to fetch random movie:', error);
        }
      }

      fetchRandomMovie();
      const interval = setInterval(fetchRandomMovie, 30000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="fixed inset-0 -z-10">
        {randomBackdrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{ backgroundImage: `url(${randomBackdrop})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10" />

      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/xBasQG_6p40?si=-E-fTWTFSedMLhg2&controls=0&start=5&autoplay=1&mute=1&loop=1&playlist=xBasQG_6p40&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute w-full h-full"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '100vh',
              transform: 'translate(-50%, -50%) scale(1.5)',
              objectFit: 'cover',
              pointerEvents: 'none',
              border: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}