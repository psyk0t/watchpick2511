// Configuration des liens d'affiliation pour chaque plateforme
const AMAZON_AFFILIATE_ID = 'lombardo0d-21';

export const AFFILIATE_LINKS = {
  'Amazon Prime Video': {
    baseUrl: 'https://www.primevideo.com/',
    affiliateParam: `tag=${AMAZON_AFFILIATE_ID}`,
    priority: 1
  },
  'Netflix': {
    baseUrl: 'https://www.netflix.com/title/',
    affiliateParam: 'aff=tmdb',
    priority: 2
  },
  'Disney+': {
    baseUrl: 'https://www.disneyplus.com/',
    affiliateParam: 'aff=tmdb',
    priority: 3
  },
  'Apple TV': {
    baseUrl: 'https://tv.apple.com/movie/',
    affiliateParam: 'at=1000l3V2',
    priority: 4
  },
  'Canal+': {
    baseUrl: 'https://www.canalplus.com/',
    affiliateParam: 'parrain=tmdb',
    priority: 5
  }
};

export function getAffiliateLink(provider: string, mediaId: string): string {
  const platform = AFFILIATE_LINKS[provider];
  if (!platform) return '';
  
  if (provider === 'Amazon Prime Video') {
    return `https://www.primevideo.com/?${platform.affiliateParam}`;
  }
  
  return `${platform.baseUrl}${mediaId}?${platform.affiliateParam}`;
}