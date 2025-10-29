import Link from 'next/link';
import Image from 'next/image';
import { getEpisodes } from '../utils/content';
import { Episode, ShowNote } from '../types/content';

export const metadata = {
  title: 'Dream Cheesers Podcast - Episodes',
  description: 'Listen to all episodes of the Dream Cheesers podcast about dreams, cheese, and artisanal craftsmanship',
  keywords: 'podcast, dream cheesers, cheese, dreams, food, artisan, episodes',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export default async function HomePage() {
  let episodes: Episode[] = [];
  
  try {
    episodes = await getEpisodes();
  } catch (error) {
    console.error('Error fetching episodes:', error);
    // Episodes will remain empty array, showing placeholder content
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Dream Cheesers Episodes
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Dive into the world of artisanal cheese-making and culinary dreams. 
              Each episode brings you closer to the craft!
            </p>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {episodes.length > 0 ? (
          <div className="space-y-6">
            {episodes.map((episode) => (
              <Link key={episode.id} href={`/episodes/${episode.episodeNumber}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex flex-col md:flex-row">
                    {/* Episode Thumbnail */}
                    <div className="w-full md:w-80 aspect-video md:aspect-square bg-purple-100 relative flex-shrink-0">
                      {episode.thumbnail ? (
                        <Image
                          src={episode.thumbnail.src}
                          alt={episode.thumbnail.alt || episode.episodeTitle}
                          fill
                          className="object-cover"
                          sizes="(max-width: 767px) 100vw, 320px"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-16 h-16 bg-purple-300 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Episode Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-semibold text-gray-900 pr-4">
                          {episode.episodeTitle}
                        </h3>
                        <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium flex-shrink-0">
                          #{episode.episodeNumber}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-4">
                        Released: {formatDate(episode.releaseDate)}
                      </p>
                      
                      {episode.description && (
                        <p className="text-gray-600 text-base mb-6 line-clamp-3">
                          {episode.description}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-purple-600 font-medium">
                          Click to view episode
                        </span>
                        {episode.showNotes && episode.showNotes.length > 0 && (
                          <span className="text-xs text-gray-500">
                            • {episode.showNotes.length} show notes
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Placeholder when no episodes are available */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Episodes Coming Soon!
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              We're preparing amazing content about artisanal cheese-making and culinary dreams. 
              Stay tuned for our first episodes!
            </p>
            <div className="flex justify-center">
              <Link 
                href="/about"
                className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-600 transition-colors"
              >
                Learn About the Show
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
