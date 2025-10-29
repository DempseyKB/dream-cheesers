import { Entry, Asset } from 'contentful';

// Base Contentful entry interface
export interface ContentfulEntry {
  id: string;
  type: string;
}

// Image/Asset interface
export interface ContentfulImage {
  id: string;
  type: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Button interface
export interface Button {
  id?: string;
  label: string;
  url: string;
  theme?: 'default' | 'outline';
}

// Stat item interface
export interface StatItem {
  id: string;
  value: string;
  label: string;
}

// Hero section interface
export interface Hero extends ContentfulEntry {
  heading: string;
  body?: string;
  theme?: 'imgLeft' | 'imgRight';
  image?: ContentfulImage;
  button?: Button;
}

// Stats section interface
export interface Stats extends ContentfulEntry {
  heading: string;
  body?: string;
  theme?: 'primary' | 'dark';
  stats: StatItem[];
}

// Page interface
export interface Page extends ContentfulEntry {
  slug: string;
  title?: string;
  sections?: (Hero | Stats)[];
}

// Homepage content interface
export interface HomepageContent {
  hero: Hero | null;
  stats: Stats | null;
}

// Raw Contentful types for API responses
export interface ContentfulButtonFields {
  label: string;
  url: string;
  theme?: 'default' | 'outline';
}

export interface ContentfulStatItemFields {
  value: string;
  label: string;
}

export interface ContentfulHeroFields {
  heading: string;
  body?: string;
  theme?: 'imgLeft' | 'imgRight';
  image?: Asset;
  button?: Entry<any>;
}

export interface ContentfulStatsFields {
  heading: string;
  body?: string;
  theme?: 'primary' | 'dark';
  stats: Entry<any>[];
}

export interface ContentfulPageFields {
  slug: string;
  title?: string;
  sections?: Entry<any>[];
}