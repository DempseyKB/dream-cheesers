// Auto-generated TypeScript types from Contentful content models
// Generated on: 2026-04-08T07:07:18.296Z
// Do not edit manually - use npm run generate-types to regenerate

// Base types
export interface ContentfulEntry {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
  };
}

// Base type for transformed entries (after mapEntry processing)
export interface TransformedEntry {
  id: string;
  type: string;
}

export interface ContentfulImage {
  sys: {
    id: string;
    type: 'Asset';
  };
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

// Transformed image type after mapEntry processing
export interface TransformedImage {
  id: string;
  type: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Episode
// Description: An uploaded episode of Dream Cheesers
export interface Episode extends TransformedEntry {
  seasonNumber: number;
  episodeNumber: number;
  releaseDate: string;
  spotifyUrl: string;
  episodeTitle: string;
  teaserText: string;
  description?: string;
  showNotes?: (Menagerie | RandomThoughts)[];
  relatedImages?: TransformedImage[];
}

// Menagerie
// Description: For those pieces of weird animal content you just have to talk about
export interface Menagerie extends TransformedEntry {
  thumbnail?: TransformedImage | null;
  displayName: string;
  teaserText: string;
  content?: any;
  media?: TransformedImage[];
  links?: string[];
}

// Random Thoughts
// Description: Any piece of random content directly related to an episode.
"Add it to the show notes!"
export interface RandomThoughts extends TransformedEntry {
  thumbnail?: TransformedImage | null;
  displayName: string;
  teaserText: string;
  content?: any;
  media?: TransformedImage[];
  links?: string[];
}

