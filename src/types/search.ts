export type MediaType = 'movie' | 'tv';
export type Platform = 'netflix' | 'prime' | 'disney' | 'apple' | 'anime' | 'all';
export type Mood = 'happy' | 'action' | 'romantic' | 'adventure' | 'mystery' | 'horror';
export type Era = 'classic' | 'modern' | 'recent';
export type Rating = 'high' | 'medium' | 'low';
export type Language = 'fr' | 'en' | 'ja' | 'ko' | 'all';

export interface SearchPreferences {
  mediaType: MediaType | null;
  platform: Platform | null;
  mood: Mood | null;
  genre: string | null;
  era: Era | null;
  rating: Rating | null;
  language: Language | null;
}

export interface Question {
  id: keyof SearchPreferences;
  text: string;
  options: {
    label: string;
    value: any;
    icon?: string;
  }[];
  required?: boolean;
}

export const QUESTIONS: Question[] = [
  {
    id: 'mediaType',
    text: 'Que souhaitez-vous regarder ?',
    options: [
      { label: 'Un film', value: 'movie', icon: '🎬' },
      { label: 'Une série', value: 'tv', icon: '📺' }
    ],
    required: true
  },
  {
    id: 'platform',
    text: 'Sur quelle plateforme ?',
    options: [
      { label: 'Toutes les plateformes', value: 'all', icon: '✨' },
      { label: 'Netflix', value: 'netflix', icon: '🎬' },
      { label: 'Amazon Prime', value: 'prime', icon: '📦' },
      { label: 'Disney+', value: 'disney', icon: '🏰' },
      { label: 'Apple TV+', value: 'apple', icon: '🍎' },
      { label: 'Anime (ADN/Crunchyroll)', value: 'anime', icon: '🎌' }
    ],
    required: true
  },
  {
    id: 'mood',
    text: 'Dans quel état d\'esprit êtes-vous ?',
    options: [
      { label: 'Envie de rire', value: 'happy', icon: '😂' },
      { label: 'Besoin d\'action', value: 'action', icon: '💥' },
      { label: 'Moment romantique', value: 'romantic', icon: '💝' },
      { label: 'Soif d\'aventure', value: 'adventure', icon: '🗺️' },
      { label: 'Ambiance mystérieuse', value: 'mystery', icon: '🔍' },
      { label: 'Frissons garantis', value: 'horror', icon: '👻' }
    ]
  },
  {
    id: 'era',
    text: 'Quelle époque vous tente ?',
    options: [
      { label: 'Classiques (avant 2000)', value: 'classic', icon: '🎞️' },
      { label: 'Années 2000-2020', value: 'modern', icon: '📀' },
      { label: 'Récents (2020+)', value: 'recent', icon: '🌟' }
    ]
  },
  {
    id: 'language',
    text: 'Dans quelle langue tu veux regarder ?',
    options: [
      { label: 'Toutes les langues', value: 'all', icon: '🌍' },
      { label: 'Français', value: 'fr', icon: '🇫🇷' },
      { label: 'Anglais', value: 'en', icon: '🇬🇧' },
      { label: 'Japonais', value: 'ja', icon: '🇯🇵' },
      { label: 'Coréen', value: 'ko', icon: '🇰🇷' }
    ]
  }
];