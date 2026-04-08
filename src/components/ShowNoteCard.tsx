import Image from 'next/image';
import Link from 'next/link';
import { Menagerie, RandomThoughts } from '@/types/contentTypes';

export type ShowNoteItem = Menagerie | RandomThoughts;

interface ShowNoteCardProps {
  note: ShowNoteItem;
  category: string;
}

export const ShowNoteCard: React.FC<ShowNoteCardProps> = ({ note, category }) => {
  // Determine route based on category
  const route = category === 'Random Thought' ? '/random-thoughts' : '/show-notes';
  
  return (
    <Link href={`${route}/${note.id}`} className="block">
      <div className="bg-dream-navy-light rounded-lg overflow-hidden dream-card-hover">
      {/* Thumbnail */}
      {note.thumbnail && note.thumbnail.src && (
        <div className="aspect-video relative">
          <Image
            src={note.thumbnail.src}
            alt={note.thumbnail.alt || note.displayName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-dream-teal/20 text-dream-teal px-2 py-1 rounded-full font-medium">
            {category}
          </span>
        </div>
        
        <h4 className="text-lg font-semibold text-white mb-2">
          {note.displayName}
        </h4>
        
        {note.teaserText && (
          <p className="text-gray-300 text-sm mb-4">
            {note.teaserText}
          </p>
        )}
        
        {/* Rich text content - simplified for now */}
        {note.content && (
          <div 
            className="prose prose-sm max-w-none text-gray-300 mb-4 prose-headings:text-white prose-strong:text-dream-coral prose-a:text-dream-teal hover:prose-a:text-dream-teal-light"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        )}
      </div>
    </div>
    </Link>
  );
};
