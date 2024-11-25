import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, Calendar, Film, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2U2NDRhMTRkMTJmN2MyYzY5YTRjZTgwYjM4YTY4NiIsIm5iZiI6MTczMjI3MzUzMi44Mzk2MTEzLCJzdWIiOiI2NzQwNjQ4MmRhZTJlNmE5MzgyNTVkYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YqujyXmC5kIFRLdy1yx50HSC04RZmd2XX3Dobyx523Y';

interface NewsItem {
  id: string;
  title: string;
  overview: string;
  backdrop_path: string | null;
  release_date: string;
  media_type: string;
  vote_average: number;
}

interface TrailerData {
  id: string;
  title: string;
  overview: string;
  backdrop_path: string;
  trailer_key: string;
  vote_average: number;
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [trailer, setTrailer] = useState<TrailerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const [trendingMovies, trendingTv] = await Promise.all([
          fetch(
            'https://api.themoviedb.org/3/trending/movie/day?language=fr-FR',
            {
              headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          ).then(res => res.json()),
          fetch(
            'https://api.themoviedb.org/3/trending/tv/day?language=fr-FR',
            {
              headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          ).then(res => res.json())
        ]);

        const combinedNews = [...trendingMovies.results, ...trendingTv.results]
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((item: any) => ({
            id: item.id,
            title: item.title || item.name,
            overview: item.overview,
            backdrop_path: item.backdrop_path,
            release_date: item.release_date || item.first_air_date,
            media_type: item.media_type || (item.title ? 'movie' : 'tv'),
            vote_average: item.vote_average
          }));

        setNews(combinedNews);
      } catch (error) {
        console.error('Erreur lors du chargement des actualités:', error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchRandomTrailer() {
      try {
        // Récupérer les films populaires actuels
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&region=FR',
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();

        if (!data.results?.length) return;

        // Filtrer les films avec une note > 7
        const goodMovies = data.results.filter((movie: any) => movie.vote_average >= 7);
        if (!goodMovies.length) return;

        // Sélectionner un film aléatoire
        const randomMovie = goodMovies[Math.floor(Math.random() * goodMovies.length)];

        // Récupérer les vidéos du film
        const videos = await fetch(
          `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?language=fr-FR`,
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        ).then(res => res.json());

        // Chercher une bande-annonce en français d'abord, puis en anglais si non trouvée
        const trailer = videos.results?.find((video: any) => 
          video.type === 'Trailer' && 
          video.site === 'YouTube' &&
          video.iso_639_1 === 'fr'
        ) || videos.results?.find((video: any) => 
          video.type === 'Trailer' && 
          video.site === 'YouTube'
        );

        if (trailer && randomMovie.backdrop_path) {
          setTrailer({
            id: randomMovie.id,
            title: randomMovie.title,
            overview: randomMovie.overview,
            backdrop_path: randomMovie.backdrop_path,
            trailer_key: trailer.key,
            vote_average: randomMovie.vote_average
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la bande-annonce:', error);
      }
    }

    fetchNews();
    fetchRandomTrailer();
    
    const newsInterval = setInterval(fetchNews, 300000);
    const trailerInterval = setInterval(fetchRandomTrailer, 3600000);
    
    return () => {
      clearInterval(newsInterval);
      clearInterval(trailerInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-12 space-y-16"
    >
      {trailer && (
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Film className="w-8 h-8 text-indigo-400" />
            <h2 className="text-3xl font-bold text-white">Bande Annonce à voir</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
          >
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.trailer_key}?autoplay=0&controls=1&modestbranding=1`}
                title={`Bande-annonce de ${trailer.title}`}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold text-white">
                  {trailer.title}
                </h3>
                <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                  {trailer.vote_average.toFixed(1)} / 10
                </span>
              </div>
              <p className="text-gray-300 text-lg mb-4">
                {trailer.overview}
              </p>
              <Link
                to={`/movie/${trailer.id}`}
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <Play size={20} />
                <span>Plus d'informations</span>
              </Link>
            </div>
          </motion.div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Newspaper className="w-8 h-8 text-indigo-400" />
          <h2 className="text-3xl font-bold text-white">Trending aujourd'hui</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <motion.article
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
            >
              {item.backdrop_path && (
                <div className="aspect-video relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-sm capitalize">
                    {item.media_type === 'movie' ? 'Film' : 'Série'}
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
                  <Calendar size={16} />
                  <time dateTime={item.release_date}>
                    {new Date(item.release_date).toLocaleDateString('fr-FR')}
                  </time>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                
                <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                  {item.overview}
                </p>
                
                <Link
                  to={`/${item.media_type}/${item.id}`}
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>Voir plus</span>
                  <ExternalLink size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}