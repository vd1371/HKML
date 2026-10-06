export interface Speaker {
  name: string;
  talkTitle?: string;
  summary?: string;
  bio?: string;
  photo?: string;
  photoAlt?: string;
  slides?: string;
}

export interface Episode {
  id: string;
  name: string;
  slug: string;
  sourceUrl?: string;
  status: 'Draft' | 'Published';
  season: number;
  episode: number;
  start: string;
  end?: string;
  venue: string;
  address?: string;
  meetupUrl?: string;
  organizer?: string;
  sponsor?: string;
  cover?: string;
  coverAlt?: string;
  excerpt?: string;
  introduction?: string;
  tags?: string[];
  speakers: Speaker[];
}

export interface EpisodeValidation {
  valid: boolean;
  warnings: string[];
}
