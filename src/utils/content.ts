import { createClient, Entry, Asset, EntryCollection } from 'contentful';
import { ContentfulEntry, ContentfulImage, Episode, ShowNote } from '../types/content';

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

// Get all show notes
export async function getShowNotes(): Promise<ShowNote[]> {
  try {
    let items: any[] = [];
    
    try {
      const result = await getEntries('showNote', {
        order: 'fields.displayName'
      });
      items = result.items;
    } catch {
      // If 'showNote' doesn't work, try 'showNotes'
      try {
        const result = await getEntries('showNotes', {
          order: 'fields.displayName'
        });
        items = result.items;
      } catch {
        console.log('No show notes content type found yet, returning empty array');
        return [];
      }
    }
    
    return items.map(mapEntry) as ShowNote[];
  } catch (error) {
    console.error('Error fetching show notes:', error);
    return [];
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

// Map Contentful entry to clean object
function mapEntry(entry: any): any {
  const id = entry.sys?.id;
  const type = entry.sys?.contentType?.sys?.id || entry.sys?.type;

  if (entry.sys?.type === 'Asset') {
    return {
      id,
      type,
      src: `https:${entry.fields?.file?.url || ''}`,
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
