import { createClient } from 'contentful';

// Content type IDs
const PAGE_CONTENT_TYPE_ID = 'page';
const HERO_CONTENT_TYPE_ID = 'hero';
const STATS_CONTENT_TYPE_ID = 'stats';

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

async function getEntries(content_type, queryParams = {}) {
  const client = createContentfulClient();
  const entries = await client.getEntries({ content_type, ...queryParams, include: 10 });
  return entries;
}

// Generic function to get all entries of a specific content type
export async function getContentByType(contentType) {
  const { items } = await getEntries(contentType);
  return items.map(mapEntry);
}

// Get homepage content
export async function getHomepageContent() {
  try {
    const [heroEntries, statsEntries] = await Promise.all([
      getEntries(HERO_CONTENT_TYPE_ID),
      getEntries(STATS_CONTENT_TYPE_ID)
    ]);

    return {
      hero: heroEntries.items.length > 0 ? mapEntry(heroEntries.items[0]) : null,
      stats: statsEntries.items.length > 0 ? mapEntry(statsEntries.items[0]) : null,
    };
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    return { hero: null, stats: null };
  }
}

export async function getPagePaths() {
  const { items } = await getEntries(PAGE_CONTENT_TYPE_ID);
  return items.map((page) => {
    const slug = page.fields.slug;
    return slug.startsWith('/') ? slug : `/${slug}`;
  });
}

export async function getPageFromSlug(slug) {
  const { items } = await getEntries(PAGE_CONTENT_TYPE_ID, { 'fields.slug': slug });
  let page = (items ?? [])[0];
  if (!page && slug !== '/' && slug.startsWith('/')) {
    const { items } = await getEntries(PAGE_CONTENT_TYPE_ID, { 'fields.slug': slug.slice(1) });
    page = (items ?? [])[0];
  }
  if (!page) throw new Error(`Page not found for slug: ${slug}`);
  return mapEntry(page);
}

// Map Contentful entry to clean object
function mapEntry(entry) {
  const id = entry.sys?.id;
  const type = entry.sys?.contentType?.sys?.id || entry.sys?.type;

  if (entry.sys?.type === 'Asset') {
    return {
      id,
      type,
      src: `https:${entry.fields.file.url}`,
      alt: entry.fields.title || entry.fields.description || '',
      width: entry.fields.file?.details?.image?.width,
      height: entry.fields.file?.details?.image?.height,
    };
  }

  return {
    id,
    type,
    ...Object.fromEntries(Object.entries(entry.fields || {}).map(([key, value]) => [key, parseField(value)])),
  };
}

function parseField(value) {
  if (typeof value === 'object' && value?.sys) return mapEntry(value);
  if (Array.isArray(value)) return value.map(item => 
    typeof item === 'object' && item?.sys ? mapEntry(item) : item
  );
  return value;
}
