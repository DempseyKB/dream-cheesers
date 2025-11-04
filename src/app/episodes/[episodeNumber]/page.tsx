import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getEpisodeByNumber } from '../../../utils/content';
import { Episode, ShowNote } from '../../../types/content';

interface EpisodePageProps {
  params: {
    episodeNumber: string;
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export async function generateMetadata({ params }: EpisodePageProps) {
  const episodeNumber = parseInt(params.episodeNumber);
  
  if (isNaN(episodeNumber)) {
    return {
      title: 'Episode Not Found - Dream Cheesers',
    };
  }

  const episode = await getEpisodeByNumber(episodeNumber);
  
  if (!episode) {
    return {
      title: 'Episode Not Found - Dream Cheesers',
    };
  }

  return {
    title: `Episode ${episode.episodeNumber}: ${episode.episodeTitle} - Dream Cheesers`,
    description: episode.description || `Listen to Episode ${episode.episodeNumber} of the Dream Cheesers podcast`,
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const episodeNumber = parseInt(params.episodeNumber);
  
  if (isNaN(episodeNumber)) {
    notFound();
  }

  const episode = await getEpisodeByNumber(episodeNumber);
  
  if (!episode) {
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
        {/* Episode Header */}
        <div className="page-content rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Episode Thumbnail */}
            <div className="lg:w-1/3">
              <div className="aspect-square bg-gradient-to-br from-dream-orange/20 to-dream-yellow/20 rounded-xl overflow-hidden shadow-lg">
                {episode.thumbnail ? (
                  <Image
                    src={episode.thumbnail.src}
                    alt={episode.thumbnail.alt || episode.episodeTitle}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-24 h-24 bg-gradient-to-br from-dream-orange to-dream-yellow rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-12 h-12 text-dream-navy" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Episode Info */}
            <div className="lg:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block bg-gradient-to-r from-dream-pink to-dream-orange text-dream-navy px-4 py-2 rounded-full text-sm font-bold mb-3 shadow-lg">
                    Episode #{episode.episodeNumber}
                  </span>
                  <h1 className="text-3xl lg:text-4xl font-bold text-dream-cream mb-2 bg-gradient-to-r from-dream-pink via-dream-yellow to-dream-teal bg-clip-text text-transparent">
                    {episode.episodeTitle}
                  </h1>
                  <p className="text-dream-teal mb-4 font-medium">
                    Released: {formatDate(episode.releaseDate)}
                  </p>
                </div>
              </div>

              {episode.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-dream-cream mb-3">About This Episode</h2>
                  <p className="text-dream-cream/80 leading-relaxed">
                    {episode.description}
                  </p>
                </div>
              )}

              {/* Audio Player */}
              {episode.episodeFile && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-dream-cream mb-3">Listen Now</h2>
                  <div className="content-tile rounded-xl p-6 shadow-lg">
                    <audio 
                      controls 
                      className="w-full h-12 rounded-lg"
                      preload="metadata"
                      style={{
                        filter: 'sepia(100%) saturate(200%) hue-rotate(180deg) brightness(0.8) contrast(1.2)'
                      }}
                    >
                      <source src={episode.episodeFile.src} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <div className="mt-4 text-center">
                      <a
                        href={episode.episodeFile.src}
                        download
                        className="text-sm text-dream-teal hover:text-dream-pink transition-colors duration-300 font-medium inline-flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Episode
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Show Notes Section */}
        {episode.showNotes && episode.showNotes.length > 0 && (
          <div className="page-content rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-dream-cream mb-6 bg-gradient-to-r from-dream-pink to-dream-orange bg-clip-text text-transparent">Show Notes</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {episode.showNotes.map((note) => (
                <Link key={note.id} href={`/show-notes/${note.internalName}`}>
                  <div className="content-tile rounded-xl overflow-hidden dream-card-hover cursor-pointer group">
                    {/* Show Note Thumbnail */}
                    {note.thumbnail && (
                      <div className="aspect-video relative bg-gradient-to-br from-dream-orange/20 to-dream-yellow/20">
                        <Image
                          src={note.thumbnail.src}
                          alt={note.thumbnail.alt || note.displayName}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    
                    {/* Show Note Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-dream-teal/20 text-dream-teal px-3 py-1 rounded-full font-medium">
                          {note.category}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-dream-cream mb-2 group-hover:text-dream-pink transition-colors duration-300">
                        {note.displayName}
                      </h3>
                      
                      {note.teaserText && (
                        <p className="text-dream-cream/70 text-sm line-clamp-3 mb-3">
                          {note.teaserText}
                        </p>
                      )}

                      {/* Links and Media Indicators */}
                      <div className="flex items-center justify-between text-xs text-dream-cream/60">
                        <div className="flex items-center space-x-3">
                          {note.links && note.links.length > 0 && (
                            <div className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                              {note.links.length} link{note.links.length > 1 ? 's' : ''}
                            </div>
                          )}
                          {note.media && note.media.length > 0 && (
                            <div className="flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {note.media.length} media
                            </div>
                          )}
                        </div>
                        <span className="text-dream-teal font-medium group-hover:text-dream-pink transition-colors duration-300">
                          View details →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}