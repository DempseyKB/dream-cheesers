import { ContentfulEntry, Episode, RandomThoughts, Menagerie } from '@/types/contentTypes';
import { createClient, Entry, Asset, EntryCollection } from 'contentful';

const IS_DEV = process.env.NODE_ENV === 'development';

// Create Contentful client
function createContentfulClient() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = IS_DEV ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_DELIVERY_TOKEN;
  
  if (!spaceId || !accessToken) {
    throw new Error('Missing Contentful credentials. Please check your .env.local file.');
  }

  return createClient({
    accessToken,
    space: spaceId,
    host: IS_DEV ? 'preview.contentful.com' : 'cdn.contentful.com',
  });
}

async function getEntries(content_type: string, queryParams: Record<string, any> = {}): Promise<EntryCollection<any>> {
  const client = createContentfulClient();
  const entries = await client.getEntries({ content_type, ...queryParams, include: 10 });
  return entries;
}

// Generic function to get all entries of a specific content type
export async function getContentByType(contentType: string): Promise<ContentfulEntry[]> {
  const { items } = await getEntries(contentType);
  return items.map(mapEntry);
}

// Get all episodes, sorted by release date (newest first)
export async function getEpisodes(): Promise<Episode[]> {
  try {
    // Try different possible content type IDs for episodes
    let items: any[] = [];
    
    try {
      const result = await getEntries('episode', { 
        order: '-fields.releaseDate' 
      });
      items = result.items;
    } catch {
      // If 'episode' doesn't work, try 'episodes'
      try {
        const result = await getEntries('episodes', { 
          order: '-fields.releaseDate' 
        });
        items = result.items;
      } catch {
        console.log('No episodes content type found yet, returning empty array');
        return [];
      }
    }
    
    return items.map(mapEntry) as Episode[];
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
}

// Get all random thoughts
export async function getRandomThoughts(): Promise<RandomThoughts[]> {
  try {
    let items: any[] = [];
    
    try {
      const result = await getEntries('randomThoughts', {
        order: 'fields.displayName'
      });
      items = result.items;
    } catch {
      console.log('No random thoughts content type found yet, returning empty array');
      return [];
    }
    
    return items.map(mapEntry) as RandomThoughts[];
  } catch (error) {
    console.error('Error fetching random thoughts:', error);
    return [];
  }
}

// Get all menagerie items
export async function getMenagerie(): Promise<Menagerie[]> {
  try {
    let items: any[] = [];
    
    try {
      const result = await getEntries('menagerie', {
        order: 'fields.displayName'
      });
      items = result.items;
    } catch {
      console.log('No menagerie content type found yet, returning empty array');
      return [];
    }
    
    return items.map(mapEntry) as Menagerie[];
  } catch (error) {
    console.error('Error fetching menagerie:', error);
    return [];
  }
}

// Get a specific episode by ID
export async function getEpisodeById(id: string): Promise<Episode | null> {
  try {
    const client = createContentfulClient();
    const entry = await client.getEntry(id);
    return mapEntry(entry) as Episode;
  } catch (error) {
    console.error('Error fetching episode by ID:', error);
    return null;
  }
}

// Get a specific episode by episode number
export async function getEpisodeByNumber(episodeNumber: number): Promise<Episode | null> {
  try {
    let items: any[] = [];
    
    try {
      const result = await getEntries('episode', {
        'fields.episodeNumber': episodeNumber
      });
      items = result.items;
    } catch {
      try {
        const result = await getEntries('episodes', {
          'fields.episodeNumber': episodeNumber
        });
        items = result.items;
      } catch {
        return null;
      }
    }
    
    return items.length > 0 ? mapEntry(items[0]) as Episode : null;
  } catch (error) {
    console.error('Error fetching episode by number:', error);
    return null;
  }
}

// Get a specific item by ID (works for both RandomThoughts and Menagerie)
export async function getShowNoteById(id: string): Promise<RandomThoughts | Menagerie | null> {
  try {
    const client = createContentfulClient();
    const entry = await client.getEntry(id);
    return mapEntry(entry) as RandomThoughts | Menagerie;
  } catch (error) {
    console.error('Error fetching show note by ID:', error);
    return null;
  }
}

// Get a specific RandomThought by entry title
export async function getRandomThoughtByTitle(title: string): Promise<RandomThoughts | null> {
  try {
    const result = await getEntries('randomThoughts', {
      'fields.displayName': title,
      limit: 1
    });
    
    return result.items.length > 0 ? mapEntry(result.items[0]) as RandomThoughts : null;
  } catch (error) {
    console.error('Error fetching random thought by title:', error);
    return null;
  }
}

// Get a specific item by entry title (works for both RandomThoughts and Menagerie)
export async function getShowNoteByTitle(title: string): Promise<RandomThoughts | Menagerie | null> {
  try {
    let items: any[] = [];
    
    // Try random thoughts first
    try {
      const result = await getEntries('randomThoughts', {
        'fields.displayName': title,
        limit: 1
      });
      items = result.items;
    } catch {
      // If not found, try menagerie
      try {
        const result = await getEntries('menagerie', {
          'fields.displayName': title,
          limit: 1
        });
        items = result.items;
      } catch {
        console.log('No show note found with title:', title);
        return null;
      }
    }
    
    return items.length > 0 ? mapEntry(items[0]) as RandomThoughts | Menagerie : null;
  } catch (error) {
    console.error('Error fetching show note by title:', error);
    return null;
  }
}

// Map Contentful entry to clean object
function mapEntry(entry: any): any {
  const id = entry.sys?.id;
  const type = entry.sys?.contentType?.sys?.id || entry.sys?.type;

  if (entry.sys?.type === 'Asset') {
    const fileUrl = entry.fields?.file?.url || '';
    // Contentful URLs can come as protocol-relative (//...) or with protocol (https://...)
    // Handle empty URLs to avoid creating invalid URLs like "https:"
    const src = !fileUrl
      ? ''
      : fileUrl.startsWith('//')
        ? `https:${fileUrl}`
        : fileUrl.startsWith('http')
          ? fileUrl
          : `https:${fileUrl}`;
    
    return {
      id,
      type,
      src,
      alt: entry.fields?.title || entry.fields?.description || '',
      width: entry.fields?.file?.details?.image?.width,
      height: entry.fields?.file?.details?.image?.height,
    };
  }

  return {
    id,
    type,
    ...Object.fromEntries(Object.entries(entry.fields || {}).map(([key, value]) => [key, parseField(value)])),
  };
}

function parseField(value: any): any {
  if (typeof value === 'object' && value?.sys) return mapEntry(value);
  if (Array.isArray(value)) return value.map(item => 
    typeof item === 'object' && item?.sys ? mapEntry(item) : item
  );
  return value;
}
