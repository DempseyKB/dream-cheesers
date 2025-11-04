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
    <div className="min-h-screen bg-dream-navy">
      {/* Header Section */}
      <section className="gradient-dream-primary relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-dream-orange animate-bounce-gentle"></div>
          <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-dream-teal animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full bg-dream-pink animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 py-20 relative">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 relative logo-bounce">
                <Image
                  src="/DreamCheesersLogo-Transparent.png"
                  alt="Dream Cheesers Logo"
                  fill
                  className="object-contain"
                  sizes="96px"
                  priority
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-dream-pink via-dream-yellow to-dream-teal bg-clip-text text-transparent">
              Dream Cheesers Episodes
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-dream-cream leading-relaxed">
              Join 3 mates as they delve into the rediculous, the absurd and the hilarious.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="px-4 py-2 bg-dream-teal/20 rounded-full">
                <span className="text-dream-teal font-semibold text-sm">🧀 Artisanal Stories</span>
              </div>
              <div className="px-4 py-2 bg-dream-pink/20 rounded-full">
                <span className="text-dream-pink font-semibold text-sm">✨ Dream Makers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {episodes.length > 0 ? (
          <div className="space-y-8 animate-slide-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dream-cream mb-4">Latest Episodes</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-dream-pink to-dream-teal mx-auto rounded-full"></div>
            </div>
            {episodes.map((episode, index) => (
              <Link key={episode.id} href={`/episodes/${episode.episodeNumber}`}>
                <div className="page-content rounded-xl overflow-hidden dream-card-hover cursor-pointer group">
                  <div className="flex flex-col md:flex-row">
                    {/* Episode Thumbnail */}
                    <div className="w-full md:w-80 aspect-video md:aspect-square bg-gradient-to-br from-dream-orange/20 to-dream-yellow/20 relative flex-shrink-0">
                      {episode.thumbnail ? (
                        <Image
                          src={episode.thumbnail.src}
                          alt={episode.thumbnail.alt || episode.episodeTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 767px) 100vw, 320px"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-20 h-20 bg-gradient-to-br from-dream-orange to-dream-yellow rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-10 h-10 text-dream-navy" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
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
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-dream-pink font-semibold flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          Listen Now
                        </span>
                        {episode.showNotes && episode.showNotes.length > 0 && (
                          <span className="text-xs text-dream-teal/70 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                            </svg>
                            {episode.showNotes.length} show notes
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
            <h2 className="text-3xl font-bold text-dream-cream mb-6 bg-gradient-to-r from-dream-pink to-dream-orange bg-clip-text text-transparent">
              Episodes Coming Soon!
            </h2>
            <p className="text-dream-cream/80 max-w-lg mx-auto mb-12 text-lg leading-relaxed">
              Join 3 mates as they delve into the rediculous, the absurd and the hilarious.
              Stay tuned for our first episodes!
            </p>
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
            
            {/* Features preview */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
              <div className="content-tile rounded-lg p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-dream-pink to-dream-orange rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🧀</span>
                </div>
                <h3 className="text-dream-pink font-bold mb-2">Artisan Stories</h3>
                <p className="text-dream-cream/70 text-sm">Meet the passionate cheese makers behind extraordinary creations</p>
              </div>
              <div className="content-tile rounded-lg p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-dream-teal to-dream-light-teal rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-dream-teal font-bold mb-2">Dream Makers</h3>
                <p className="text-dream-cream/70 text-sm">Discover how culinary dreams become delicious reality</p>
              </div>
              <div className="content-tile rounded-lg p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-dream-orange to-dream-yellow rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🎙️</span>
                </div>
                <h3 className="text-dream-yellow font-bold mb-2">Expert Insights</h3>
                <p className="text-dream-cream/70 text-sm">Learn techniques, traditions, and trade secrets</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
