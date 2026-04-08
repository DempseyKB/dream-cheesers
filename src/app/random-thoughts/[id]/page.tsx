import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getShowNoteById } from '../../../utils/contentAPI';
import { RandomThoughtContent } from '@/components/RandomThoughtContent';

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

      <RandomThoughtContent randomThought={randomThought} />
    </div>
  );
}
