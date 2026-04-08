import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getShowNoteById, getEpisodeById } from '../../../../../utils/contentAPI';
import { RandomThoughtContent } from '@/components/RandomThoughtContent';

interface EpisodeRandomThoughtPageProps {
  params: {
    id: string;
    randomThoughtId: string;
  };
}

export async function generateMetadata({ params }: EpisodeRandomThoughtPageProps) {
  const [randomThought, episode] = await Promise.all([
    getShowNoteById(params.randomThoughtId),
    getEpisodeById(params.id)
  ]);
  
  if (!randomThought) {
    return {
      title: 'Random Thought Not Found - Dream Cheesers',
    };
  }

  const episodeTitle = episode ? `Episode ${episode.episodeNumber}: ${episode.episodeTitle}` : 'Episode';

  return {
    title: `${randomThought.displayName} - ${episodeTitle} - Dream Cheesers`,
    description: randomThought.teaserText || `Random thought from ${episodeTitle}`,
  };
}

export default async function EpisodeRandomThoughtPage({ params }: EpisodeRandomThoughtPageProps) {
  const [randomThought, episode] = await Promise.all([
    getShowNoteById(params.randomThoughtId),
    getEpisodeById(params.id)
  ]);
  
  if (!randomThought) {
    notFound();
  }

  const episodeTitle = episode ? `Episode ${episode.episodeNumber}: ${episode.episodeTitle}` : 'Episode';

  return (
    <div className="min-h-screen bg-dream-navy">
      {/* Back to Episode */}
      <div className="bg-dream-navy/80 backdrop-blur-sm border-b border-dream-teal/20 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href={`/episodes/${params.id}`}
            className="inline-flex items-center text-dream-teal hover:text-dream-pink transition-colors duration-300 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {episodeTitle}
          </Link>
        </div>
      </div>

      <RandomThoughtContent randomThought={randomThought} episodeContext={episodeTitle} />
    </div>
  );
}
