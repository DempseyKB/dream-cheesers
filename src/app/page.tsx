import Link from 'next/link';
import Image from 'next/image';
import { getEpisodes } from '../utils/contentAPI';
import { Episode } from '@/types/contentTypes';

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
    <div className="min-h-screen bg-dream-navy">

      {/* Episodes Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {episodes.length > 0 ? (
          <div className="space-y-8 animate-slide-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dream-cream mb-4">Latest Episodes</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-dream-pink to-dream-teal mx-auto rounded-full"></div>
            </div>
            {episodes.map((episode, index) => (
              <Link key={episode.id} href={`/episodes/${episode.id}`}>
                <div className="page-content rounded-xl overflow-hidden dream-card-hover cursor-pointer group">
                  <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row">
                      {/* Episode Thumbnail */}
                      <div className="w-full md:w-80 aspect-video md:aspect-square bg-gradient-to-br from-dream-orange/20 to-dream-yellow/20 relative flex-shrink-0">
                          <Image
                            src="/DreamCheesersLogo-Transparent.png"
                            alt="Dream Cheesers Logo"
                            width={200}
                            height={200}
                            className="w-full h-full object-contain p-8"
                          />
                      </div>
                      
                      {/* Episode Content */}
                      <div className="flex-1 p-8">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-2xl font-bold text-dream-cream pr-4 group-hover:text-dream-pink transition-colors duration-300">
                            {episode.episodeTitle}
                          </h3>
                          <span className="text-sm bg-gradient-to-r from-dream-pink to-dream-orange text-dream-navy px-4 py-2 rounded-full font-bold flex-shrink-0 shadow-lg">
                            #{episode.episodeNumber}
                          </span>
                        </div>
                        
                        <p className="text-sm text-dream-teal mb-4 font-medium">
                          Released: {formatDate(episode.releaseDate)}
                        </p>
                        
                        {episode.description && (
                          <p className="text-dream-cream/80 text-base mb-6 line-clamp-3 leading-relaxed">
                            {episode.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Audio Player - Full Width */}
                    <div className="w-full px-8 pb-8">
                      <h2 className="text-lg font-semibold text-dream-cream mb-3">Listen Now</h2>
                      <iframe
                        data-testid="embed-iframe"
                        style={{ borderRadius: '12px' }}
                        src="https://open.spotify.com/embed/episode/7AypIc2N8ct2UoWgI3oHnN?utm_source=generator"
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Placeholder when no episodes are available */
          <div className="text-center py-20 animate-fade-in">
            <div className="w-32 h-32 relative mx-auto mb-8 logo-bounce">
              <Image
                src="/DreamCheesersLogo-Transparent.png"
                alt="Dream Cheesers Logo"
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
            <h2 className="text-3xl font-bold text-dream-cream mb-6 bg-gradient-to-r from-dream-pink to-dream-orange bg-clip-text">
              Episodes Coming Soon!
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/about"
                className="px-8 py-4 bg-gradient-to-r from-dream-pink to-dream-orange text-dream-navy font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg glow-button"
              >
                Learn About the Show
              </Link>
              <button className="px-8 py-4 border-2 border-dream-teal text-dream-teal font-bold rounded-xl hover:bg-dream-teal hover:text-dream-navy transition-all duration-300">
                Subscribe for Updates
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
