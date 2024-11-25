import { MediaType, Question } from '../types/preferences';

const MOVIE_QUESTIONS: Question[] = [
  {
    id: 'platforms',
    text: 'Quelle(s) plateforme(s) utilises-tu ?',
    options: [
      { label: '✨ Toutes les plateformes (cinema inclus)', value: { platforms: ['amazon', 'netflix', 'disney', 'apple'] }, highlight: true },
      { label: '🎬 Amazon Prime Video', value: { platforms: ['amazon'] } },
      { label: '📺 Netflix', value: { platforms: ['netflix'] } },
      { label: '🏰 Disney+', value: { platforms: ['disney'] } },
      { label: '🍎 Apple TV+', value: { platforms: ['apple'] } }
    ],
    multiSelect: true
  },
  {
    id: 'mood',
    text: 'Dans quel état d\'esprit es-tu ?',
    options: [
      { label: '😂 Envie de rire', value: { genres: ['35'] } },
      { label: '💥 Besoin d\'action', value: { genres: ['28', '12'] } },
      { label: '💝 Moment romantique', value: { genres: ['10749'] } },
      { label: '🗺️ Soif d\'aventure', value: { genres: ['12', '14'] } },
      { label: '🔍 Ambiance mystérieuse', value: { genres: ['9648', '53'] } },
      { label: '👻 Frissons garantis', value: { genres: ['27', '53'] } },
      { label: '🎭 Drame intense', value: { genres: ['18'] } },
      { label: '🎨 Film d\'auteur', value: { genres: ['37', '36'] } },
      { label: '🚀 Science-fiction', value: { genres: ['878'] } }
    ]
  },
  {
    id: 'language',
    text: 'Quel nationalité de film ?',
    options: [
      { label: '✨ Peu importe', value: { language: null }, highlight: true },
      { label: '🇫🇷 Films français', value: { language: 'fr', origin_country: 'FR' } },
      { label: '🇺🇸 Films américains', value: { language: 'en', origin_country: 'US' } },
      { label: '🇯🇵 Films japonais', value: { language: 'ja', origin_country: 'JP' } },
      { label: '🇮🇳 Films indiens', value: { language: 'hi', origin_country: 'IN' } },
      { label: '🌍 Autres régions', value: { exclude_languages: ['fr', 'en', 'ja', 'hi'] } }
    ]
  },
  {
    id: 'era',
    text: 'Quelle époque te tente ?',
    options: [
      { label: '✨ Peu importe', value: { primary_release_date: {} }, highlight: true },
      { 
        label: '🌟 Films récents (2020+)', 
        value: { 
          primary_release_date: { 
            gte: '2020-01-01',
            lte: '2024-12-31'
          }
        } 
      },
      { 
        label: '📱 Années 2010', 
        value: { 
          primary_release_date: { 
            gte: '2010-01-01',
            lte: '2019-12-31'
          }
        } 
      },
      { 
        label: '💿 Classiques modernes (2000s)', 
        value: { 
          primary_release_date: { 
            gte: '2000-01-01',
            lte: '2009-12-31'
          }
        } 
      },
      { 
        label: '📼 Films cultes (avant 2000)', 
        value: { 
          primary_release_date: { 
            gte: '1970-01-01',
            lte: '1999-12-31'
          }
        } 
      },
      { 
        label: '🎞️ Films d\'époque (avant 1970)', 
        value: { 
          primary_release_date: { 
            gte: '1920-01-01',
            lte: '1969-12-31'
          }
        } 
      }
    ]
  },
  {
    id: 'rating',
    text: 'Quel type de film recherches-tu ?',
    options: [
      { label: '✨ Peu importe', value: {}, highlight: true },
      { label: '💎 Pépites', value: { vote_count_lte: 1000, vote_average_gte: 7 } },
      { label: '🎬 Films grand public', value: { vote_count_gte: 5000 } },
      { label: '🎯 Films indépendants', value: { with_companies: '14,28,59' } }
    ]
  }
];

const TV_QUESTIONS: Question[] = [
  {
    id: 'platforms',
    text: 'Quelle(s) plateforme(s) utilises-tu ?',
    options: [
      { label: '✨ Toutes les plateformes', value: { platforms: ['amazon', 'netflix', 'disney', 'apple'] }, highlight: true },
      { label: '🎬 Amazon Prime Video', value: { platforms: ['amazon'] } },
      { label: '📺 Netflix', value: { platforms: ['netflix'] } },
      { label: '🏰 Disney+', value: { platforms: ['disney'] } },
      { label: '🍎 Apple TV+', value: { platforms: ['apple'] } }
    ],
    multiSelect: true
  },
  {
    id: 'mood',
    text: 'Quel genre de série recherches-tu ?',
    options: [
      { label: '😂 Comédie', value: { genres: ['35'] } },
      { label: '🎭 Drame intense', value: { genres: ['18'] } },
      { label: '💥 Action & Aventure', value: { genres: ['10759'] } },
      { label: '🚀 Science-fiction & Fantastique', value: { genres: ['10765'] } },
      { label: '🔍 Crime & Mystère', value: { genres: ['80', '9648'] } },
      { label: '🎨 Animation', value: { genres: ['16'] } },
      { label: '💝 Romance', value: { genres: ['10749'] } },
      { label: '👻 Horreur & Thriller', value: { genres: ['9648', '53'] } }
    ]
  },
  {
    id: 'language',
    text: 'Quel nationalité de série ?',
    options: [
      { label: '✨ Peu importe', value: { language: null }, highlight: true },
      { label: '🇫🇷 Séries françaises', value: { language: 'fr', origin_country: 'FR' } },
      { label: '🇺🇸 Séries américaines', value: { language: 'en', origin_country: 'US' } },
      { label: '🇯🇵 Séries japonaises', value: { language: 'ja', origin_country: 'JP' } },
      { label: '🇮🇳 Séries indiennes', value: { language: 'hi', origin_country: 'IN' } },
      { label: '🌍 Autres régions', value: { exclude_languages: ['fr', 'en', 'ja', 'hi'] } }
    ]
  },
  {
    id: 'era',
    text: 'Quelle époque te tente ?',
    options: [
      { label: '✨ Peu importe', value: { first_air_date: {} }, highlight: true },
      { 
        label: '🌟 Séries récentes (2020+)', 
        value: { 
          first_air_date: { 
            gte: '2020-01-01',
            lte: '2024-12-31'
          }
        } 
      },
      { 
        label: '📱 Années 2010', 
        value: { 
          first_air_date: { 
            gte: '2010-01-01',
            lte: '2019-12-31'
          }
        } 
      },
      { 
        label: '💿 Séries des années 2000', 
        value: { 
          first_air_date: { 
            gte: '2000-01-01',
            lte: '2009-12-31'
          }
        } 
      },
      { 
        label: '📼 Séries cultes (avant 2000)', 
        value: { 
          first_air_date: { 
            gte: '1970-01-01',
            lte: '1999-12-31'
          }
        } 
      },
      { 
        label: '🎞️ Séries vintage (avant 1970)', 
        value: { 
          first_air_date: { 
            gte: '1920-01-01',
            lte: '1969-12-31'
          }
        } 
      }
    ]
  },
  {
    id: 'rating',
    text: 'Quel type de série recherches-tu ?',
    options: [
      { label: '✨ Peu importe', value: {}, highlight: true },
      { label: '💎 Pépites', value: { vote_count_lte: 1000, vote_average_gte: 7 } },
      { label: '📺 Séries populaires', value: { vote_count_gte: 5000 } }
    ]
  }
];

export const INITIAL_QUESTION: Question = {
  id: 'mediaType',
  text: 'Que souhaites-tu regarder ?',
  options: [
    { label: '🎬 Un film', value: 'movie' },
    { label: '📺 Une série', value: 'tv' }
  ]
};

export function getQuestions(mediaType: MediaType): Question[] {
  return mediaType === 'movie' ? MOVIE_QUESTIONS : TV_QUESTIONS;
}

export function getNextQuestion(currentState: PreferenceState): Question | null {
  if (!currentState.mediaType) {
    return INITIAL_QUESTION;
  }

  const questions = getQuestions(currentState.mediaType);
  const currentIndex = questions.findIndex(q => !currentState[q.id]);
  return currentIndex === -1 ? null : questions[currentIndex];
}