// Type definitions for Dream Cheesers podcast content

export interface ContentfulEntry {
  id: string;
  type: string;
}

export interface ContentfulImage {
  id: string;
  type: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Show Notes content type
export interface ShowNote extends ContentfulEntry {
  category: string;
  thumbnail?: ContentfulImage;
  internalName: string;
  displayName: string;
  teaserText: string;
  content: string; // Rich text content
  media?: ContentfulImage[]; // Many media files
  links?: string[]; // List of links
}

// Episode content type
export interface Episode extends ContentfulEntry {
  episodeNumber: number;
  releaseDate: string;
  episodeTitle: string;
  thumbnail?: ContentfulImage;
  description: string; // Long text
  episodeFile?: ContentfulImage; // Audio file from Contentful
  showNotes?: ShowNote[]; // References to Show Notes entries
}