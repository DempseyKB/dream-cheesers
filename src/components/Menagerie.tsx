import { ShowNoteCard } from './ShowNoteCard';
import { Menagerie as MenagerieType } from '@/types/contentTypes';

interface MenagerieProps {
  menagerie: MenagerieType[];
}

export const Menagerie: React.FC<MenagerieProps> = ({ menagerie }) => {
  if (!menagerie || menagerie.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {menagerie.map((note) => (
          <ShowNoteCard key={note.id} note={note} category="Menagerie" />
        ))}
      </div>
    </div>
  );
};
