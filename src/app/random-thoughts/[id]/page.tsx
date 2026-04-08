import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getShowNoteById } from '../../../utils/contentAPI';
import { RandomThoughts } from '@/types/contentTypes';

// Helper function to validate and fix image URLs
function validateImageUrl(url: string): string | null {
  if (!url) return null;
  
  try {
    // If it's already a valid URL, return it
    if (url.startsWith('http://') || url.startsWith('https://')) {
      new URL(url); // This will throw if invalid
      return url;
    }
    
    // If it starts with //, add https:
    if (url.startsWith('//')) {
      const fullUrl = `https:${url}`;
      new URL(fullUrl); // Validate the constructed URL
      return fullUrl;
    }
    
    // If it starts with /, treat as relative path (shouldn't happen with Contentful)
    if (url.startsWith('/')) {
      return url;
    }
    
    return null;
  } catch {
    console.warn('Invalid image URL:', url);
    return null;
  }
}

// Helper function to render rich text content from Contentful
function renderRichTextContent(content: any): React.ReactNode {
  // If content is a string, render it directly
  if (typeof content === 'string') {
    return content;
  }
  
  // If content is a rich text object with content array
  if (content && content.content && Array.isArray(content.content)) {
    return content.content.map((node: any, index: number) => {
      // Handle paragraph nodes
      if (node.nodeType === 'paragraph') {
        return (
          <p key={index} className="mb-4">
            {node.content?.map((textNode: any, textIndex: number) => {
              if (textNode.nodeType === 'text') {
                return textNode.value;
              }
              return textNode.value || '';
            }).join('')}
          </p>
        );
      }
      
      // Handle heading nodes
      if (node.nodeType === 'heading-1') {
        return (
          <h1 key={index} className="text-2xl font-bold mb-4">
            {node.content?.map((textNode: any) => textNode.value || '').join('')}
          </h1>
        );
      }
      
      if (node.nodeType === 'heading-2') {
        return (
          <h2 key={index} className="text-xl font-semibold mb-3">
            {node.content?.map((textNode: any) => textNode.value || '').join('')}
          </h2>
        );
      }
      
      // Handle unordered list
      if (node.nodeType === 'unordered-list') {
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-1">
            {node.content?.map((listItem: any, listIndex: number) => (
              <li key={listIndex}>
                {listItem.content?.map((paragraph: any) => 
                  paragraph.content?.map((textNode: any) => textNode.value || '').join('')
                ).join('')}
              </li>
            ))}
          </ul>
        );
      }
      
      // Handle ordered list
      if (node.nodeType === 'ordered-list') {
        return (
          <ol key={index} className="list-decimal list-inside mb-4 space-y-1">
            {node.content?.map((listItem: any, listIndex: number) => (
              <li key={listIndex}>
                {listItem.content?.map((paragraph: any) => 
                  paragraph.content?.map((textNode: any) => textNode.value || '').join('')
                ).join('')}
              </li>
            ))}
          </ol>
        );
      }
      
      // Fallback for other node types
      return (
        <div key={index} className="mb-2">
          {JSON.stringify(node)}
        </div>
      );
    });
  }
  
  // Fallback: try to stringify if it's an object
  if (typeof content === 'object') {
    return JSON.stringify(content, null, 2);
  }
  
  return content;
}

interface RandomThoughtPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: RandomThoughtPageProps) {
  const randomThought = await getShowNoteById(params.id);
  
  if (!randomThought) {
    return {
      title: 'Random Thought Not Found - Dream Cheesers',
    };
  }

  return {
    title: `${randomThought.displayName} - Dream Cheesers Random Thoughts`,
    description: randomThought.teaserText || `Random thought from the Dream Cheesers podcast`,
  };
}

export default async function RandomThoughtPage({ params }: RandomThoughtPageProps) {
  const randomThought = await getShowNoteById(params.id);
  
  if (!randomThought) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-dream-navy">
      {/* Back to Episodes */}
      <div className="bg-dream-navy/80 backdrop-blur-sm border-b border-dream-teal/20 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-dream-teal hover:text-dream-pink transition-colors duration-300 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Episodes
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Random Thought Header */}
        <div className="page-content rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Random Thought Thumbnail */}
            <div className="lg:w-1/3">
              <div className="aspect-square bg-gradient-to-br from-dream-orange/20 to-dream-yellow/20 rounded-lg overflow-hidden">
                {randomThought.thumbnail && validateImageUrl(randomThought.thumbnail.src) ? (
                  <Image
                    src={validateImageUrl(randomThought.thumbnail.src)!}
                    alt={randomThought.thumbnail.alt || randomThought.displayName}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-24 h-24 bg-gradient-to-br from-dream-orange to-dream-yellow rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-dream-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Random Thought Header */}
            <div className="lg:w-2/3">
              <div className="mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-dream-cream mb-4 bg-gradient-to-r from-dream-pink via-dream-yellow to-dream-teal bg-clip-text">
                  {randomThought.displayName}
                </h1>
              </div>

              {/* Content */}
              {randomThought.content && (
                <div className="mb-6">
                  <div className="prose prose-sm max-w-none text-dream-cream/80 prose-headings:text-white prose-strong:text-dream-coral prose-a:text-dream-teal hover:prose-a:text-dream-teal-light">
                    <div className="leading-relaxed whitespace-pre-wrap">
                      {renderRichTextContent(randomThought.content)}
                    </div>
                  </div>
                </div>
              )}

              {/* Links Section */}
              {randomThought.links && randomThought.links.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-dream-coral mb-3">Related Links</h2>
                  <div className="space-y-2">
                    {randomThought.links.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-dream-teal hover:text-dream-teal-light transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Media Gallery */}
        {randomThought.media && randomThought.media.length > 0 && (
          <div className="page-content rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-dream-cream mb-6 bg-gradient-to-r from-dream-pink to-dream-orange bg-clip-text">Media Gallery</h2>
            
            {/* Grid layout for multiple images */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {randomThought.media.map((mediaItem, index) => {
                const validImageSrc = validateImageUrl(mediaItem.src);
                
                return validImageSrc ? (
                  <div key={mediaItem.id || index} className="group">
                    <div className="aspect-video content-tile rounded-lg overflow-hidden">
                      <Image
                        src={validImageSrc}
                        alt={mediaItem.alt || `Media ${index + 1}`}
                        width={mediaItem.width || 600}
                        height={mediaItem.height || 400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    
                    {/* Media Caption */}
                    {mediaItem.alt && (
                      <p className="mt-2 text-sm text-dream-cream/70 text-center">
                        {mediaItem.alt}
                      </p>
                    )}
                  </div>
                ) : (
                  <div key={mediaItem.id || index} className="group">
                    <div className="aspect-video content-tile rounded-lg overflow-hidden flex items-center justify-center">
                      <div className="text-center text-dream-cream/60">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.314 15.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <p className="text-sm">Invalid image</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No Media Placeholder */}
        {(!randomThought.media || randomThought.media.length === 0) && (
          <div className="page-content rounded-lg shadow-sm p-8">
            <div className="text-center py-12">
              <svg className="mx-auto w-16 h-16 text-dream-cream/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-dream-cream/60">No media files available for this random thought.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}