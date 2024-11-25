import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Calendar, Globe, PlayCircle, Film, Tv, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { WatchStatusButtons } from './WatchStatusButtons';
import { AuthModal } from './auth/AuthModal';
import { ActorFilmography } from './ActorFilmography';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2U2NDRhMTRkMTJmN2MyYzY5YTRjZTgwYjM4YTY4NiIsIm5iZiI6MTczMjQwNDM3NC4yNDcwNzU4LCJzdWIiOiI2NzQwNjQ4MmRhZTJlNmE5MzgyNTVkYzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hx5n4Q2pNdGtiyDQolSY2bcIzC-y8p_K7_4DfL3NdhI';

interface Genre {
  id: number;
  name: string;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface WatchProviders {
  flatrate?: Provider[];
  free?: Provider[];
  ads?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
}

interface MediaDetailsData {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  episode_run_time?: number[];
  genres: Genre[];
  original_language: string;
  production_countries: { iso_3166_1: string; name: string; }[];
  status: string;
  tagline: string;
  credits?: {
    cast: Cast[];
  };
  videos?: {
    results: {
      key: string;
      name: string;
      type: string;
      site: string;
    }[];
  };
  watchProviders?: {
    [key: string]: WatchProviders;
  };
}

export function MediaDetails() {
  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<MediaDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedActor, setSelectedActor] = useState<{ id: number; name: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      if (!mediaType || !id) return;

      setLoading(true);
      try {
        const [detailsResponse, creditsResponse, providersResponse, videosResponse] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/${mediaType}/${id}?language=fr-FR`,
            {
              headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          ),
          fetch(
            `https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=fr-FR`,
            {
              headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          ),
          fetch(
            `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers`,
            {
              headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          ),
          fetch(
            `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=fr-FR`,
            {
              headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          )
        ]);

        const [detailsData, creditsData, providersData, videosData] = await Promise.all([
          detailsResponse.json(),
          creditsResponse.json(),
          providersResponse.json(),
          videosResponse.json()
        ]);

        setDetails({
          ...detailsData,
          credits: creditsData,
          watchProviders: providersData.results,
          videos: videosData
        });
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des détails');
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [mediaType, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
        {error || 'Impossible de charger les détails'}
      </div>
    );
  }

  const title = details.title || details.name;
  const releaseDate = details.release_date || details.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const runtime = details.runtime || (details.episode_run_time && details.episode_run_time[0]);
  const frenchProviders = details.watchProviders?.FR;
  const metaTitle = `${title}${year ? ` (${year})` : ''} - WatchPick`;
  const metaDescription = details.overview || `Découvrez ${title} sur WatchPick`;

  const trailer = details.videos?.results.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const isInTheaters = mediaType === 'movie' && 
    releaseDate && 
    new Date(releaseDate) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        {details.backdrop_path && (
          <meta property="og:image" content={`https://image.tmdb.org/t/p/original${details.backdrop_path}`} />
        )}
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-indigo-300 transition-colors"
        >
          <span>Retour</span>
        </button>

        <div className="relative">
          {details.backdrop_path && (
            <div className="absolute inset-0 -z-10">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
                  opacity: 0.3
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40" />
            </div>
          )}

          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                  alt={title}
                  className="w-full rounded-xl shadow-xl"
                />
              </div>

              <div className="w-full md:w-2/3 text-white space-y-6">
                <h1 className="text-4xl font-bold mb-2">
                  {title} {year && <span className="text-gray-400">({year})</span>}
                </h1>

                {details.tagline && (
                  <p className="text-xl text-gray-300 italic">{details.tagline}</p>
                )}

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-500" size={20} />
                    <span>{details.vote_average.toFixed(1)}</span>
                  </div>
                  {runtime && (
                    <div className="flex items-center gap-2">
                      <Clock size={20} />
                      <span>{runtime}min</span>
                    </div>
                  )}
                  {releaseDate && (
                    <div className="flex items-center gap-2">
                      <Calendar size={20} />
                      <span>{new Date(releaseDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Globe size={20} />
                    <span>{details.original_language.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {details.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <WatchStatusButtons
                  mediaId={details.id}
                  mediaType={mediaType as 'movie' | 'tv'}
                  title={title}
                  posterPath={details.poster_path}
                  onAuthClick={() => setShowAuthModal(true)}
                />

                <div>
                  <h2 className="text-2xl font-semibold mb-3">Synopsis</h2>
                  <p className="text-gray-300 leading-relaxed">{details.overview}</p>
                </div>

                {isInTheaters && (
                  <div className="bg-green-600/20 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Film className="text-green-400" />
                      <span>Actuellement au cinéma</span>
                    </h3>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(title + ' cinema')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 flex items-center gap-2"
                    >
                      <span>Voir les séances</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )}

                {trailer && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Bande-annonce</h2>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title={`Bande-annonce de ${title}`}
                        className="w-full h-full"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                {frenchProviders && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Où regarder</h2>
                    <div className="space-y-4">
                      {Object.entries(frenchProviders).map(([key, providers]) => {
                        if (!Array.isArray(providers)) return null;
                        const sectionTitle = {
                          flatrate: 'Streaming',
                          free: 'Gratuit',
                          ads: 'Avec publicité',
                          rent: 'Location',
                          buy: 'Achat'
                        }[key];
                        if (!sectionTitle) return null;

                        return (
                          <div key={key}>
                            <h3 className="text-lg font-medium mb-2">{sectionTitle}</h3>
                            <div className="flex flex-wrap gap-4">
                              {providers.map((provider) => (
                                <div
                                  key={provider.provider_id}
                                  className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2"
                                >
                                  <img
                                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                    alt={provider.provider_name}
                                    className="w-8 h-8 rounded"
                                  />
                                  <span>{provider.provider_name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {details.credits?.cast && details.credits.cast.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Distribution principale</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {details.credits.cast.slice(0, 4).map((actor) => (
                        <motion.div
                          key={actor.id}
                          className="text-center cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setSelectedActor({ id: actor.id, name: actor.name })}
                        >
                          <div className="aspect-[2/3] mb-2">
                            {actor.profile_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                alt={actor.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                                <span className="text-4xl">👤</span>
                              </div>
                            )}
                          </div>
                          <p className="font-medium">{actor.name}</p>
                          <p className="text-sm text-gray-400">{actor.character}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {selectedActor && (
        <ActorFilmography
          actorId={selectedActor.id}
          actorName={selectedActor.name}
          isOpen={!!selectedActor}
          onClose={() => setSelectedActor(null)}
        />
      )}
    </>
  );
}