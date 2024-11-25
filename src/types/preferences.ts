export type MediaType = 'movie' | 'tv';

export interface Question {
  id: string;
  text: string;
  options: {
    label: string;
    value: any;
    highlight?: boolean;
  }[];
  multiSelect?: boolean;
  weight?: number;
}