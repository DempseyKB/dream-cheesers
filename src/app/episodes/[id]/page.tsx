import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getEpisodeById } from '@/utils/contentAPI';
import { RandomThoughts } from '@/components/RandomThoughts';
import { Menagerie } from '@/components/Menagerie';
import { Episode } from '@/types/contentTypes';

interface EpisodePageProps {
  params: {
    id: string;
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
  const episode = await getEpisodeById(params.id);
  
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
  const episode = await getEpisodeById(params.id);
  
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
        <div className="page-content rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Episode Thumbnail */}
            <div className="lg:w-1/3">
              <div className="aspect-square bg-gradient-to-br from-dream-orange/20 to-dream-yellow/20 rounded-xl overflow-hidden shadow-lg">
                  <div className="flex items-center justify-center h-full">
                    <Image
                      src="/DreamCheesersLogo-Transparent.png"
                      alt="Dream Cheesers Logo"
                      width={200}
                      height={200}
                      className="w-full h-full object-contain p-8"
                    />
                  </div>
              </div>
            </div>

            {/* Episode Info */}
            <div className="lg:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block bg-gradient-to-r from-dream-pink to-dream-orange text-dream-navy px-4 py-2 rounded-full text-sm font-bold mb-3 shadow-lg">
                    Episode #{episode.episodeNumber}
                  </span>
                  <h1 className="text-3xl lg:text-4xl font-bold text-dream-cream mb-2 bg-gradient-to-r from-dream-pink via-dream-yellow to-dream-teal bg-clip-text">
                    {episode.episodeTitle}
                  </h1>
                  <p className="text-dream-teal mb-4 font-medium">
                    Released: {formatDate(episode.releaseDate)}
                  </p>
                </div>
              </div>

              {episode.description && (
                <div className="mb-6">
                  <p className="text-dream-cream/80 leading-relaxed">
                    {episode.description}
                  </p>
                </div>
              )}

              {/* Audio Player */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-dream-cream mb-3">Listen Now</h2>
                <iframe
                  data-testid="embed-iframe"
                  style={{ 
                    borderRadius: '12px'
                   }}
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
        </div>

        {/* Show Notes Section */}
        {episode.showNotes && episode.showNotes.length > 0 && (
          <div className="page-content rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-dream-cream mb-6 bg-gradient-to-r from-dream-pink to-dream-orange bg-clip-text">Show Notes</h2>
            <RandomThoughts randomThoughts={episode.showNotes.filter((note): note is import('@/types/contentTypes').RandomThoughts => note.type === 'randomThoughts')} episodeId={params.id} />
            <Menagerie menagerie={episode.showNotes.filter((note): note is import('@/types/contentTypes').Menagerie => note.type === 'menagerie')} />
          </div>
        )}

        {/* Media Gallery */}
        {episode.relatedImages && episode.relatedImages.length > 0 && (
          <div className="page-content rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-dream-cream mb-6 bg-gradient-to-r from-dream-pink to-dream-orange bg-clip-text">Pics from the Ep</h2>
            
            {/* Grid layout for multiple images */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {episode.relatedImages.map((image, index) => (
                image.src ? (
                  <div key={image.id || index} className="group">
                    <div className="aspect-video content-tile rounded-lg overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt || `Related image ${index + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}