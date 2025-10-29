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
    <div className="min-h-screen bg-gray-50">
      {/* Back to Episodes */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Episodes
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Episode Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Episode Thumbnail */}
            <div className="lg:w-1/3">
              <div className="aspect-square bg-purple-100 rounded-lg overflow-hidden">
                {episode.thumbnail ? (
                  <Image
                    src={episode.thumbnail.src}
                    alt={episode.thumbnail.alt || episode.episodeTitle}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-24 h-24 bg-purple-300 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
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
                  <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                    Episode #{episode.episodeNumber}
                  </span>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {episode.episodeTitle}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    Released: {formatDate(episode.releaseDate)}
                  </p>
                </div>
              </div>

              {episode.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">About This Episode</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {episode.description}
                  </p>
                </div>
              )}

              {/* Audio Player */}
              {episode.episodeFile && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Listen Now</h2>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <audio 
                      controls 
                      className="w-full"
                      preload="metadata"
                    >
                      <source src={episode.episodeFile.src} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <div className="mt-2 text-center">
                      <a
                        href={episode.episodeFile.src}
                        download
                        className="text-sm text-purple-600 hover:text-purple-700"
                      >
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
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Show Notes</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {episode.showNotes.map((note) => (
                <Link key={note.id} href={`/show-notes/${note.internalName}`}>
                  <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md hover:bg-gray-100 transition-all cursor-pointer">
                    {/* Show Note Thumbnail */}
                    {note.thumbnail && (
                      <div className="aspect-video relative">
                        <Image
                          src={note.thumbnail.src}
                          alt={note.thumbnail.alt || note.displayName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    
                    {/* Show Note Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                          {note.category}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {note.displayName}
                      </h3>
                      
                      {note.teaserText && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                          {note.teaserText}
                        </p>
                      )}

                      {/* Links and Media Indicators */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
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
                        <span className="text-purple-600 font-medium">
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