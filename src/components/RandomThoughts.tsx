import { ShowNoteCard } from './ShowNoteCard';
import { RandomThoughts as RandomThoughtsType } from '@/types/contentTypes';

interface RandomThoughtsProps {
  randomThoughts: RandomThoughtsType[];
  episodeId?: string;
}

export const RandomThoughts: React.FC<RandomThoughtsProps> = ({ randomThoughts, episodeId }) => {
  if (!randomThoughts || randomThoughts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {randomThoughts.map((note) => (
          <ShowNoteCard key={note.id} note={note} category="Random Thought" episodeId={episodeId} />
        ))}
      </div>
    </div>
  );
};
