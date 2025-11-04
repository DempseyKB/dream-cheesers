import Image from 'next/image';
import { ShowNote } from '../types/content';

interface ShowNotesProps {
  showNotes: ShowNote[];
}

export const ShowNotes: React.FC<ShowNotesProps> = ({ showNotes }) => {
  if (!showNotes || showNotes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-dream-coral">Show Notes</h3>
      <div className="grid gap-6 md:grid-cols-2">
        {showNotes.map((note) => (
          <div key={note.id} className="bg-dream-navy-light rounded-lg overflow-hidden dream-card-hover">
            {/* Thumbnail */}
            {note.thumbnail && (
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
                  {note.category}
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
              
              {/* Links */}
              {note.links && note.links.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-dream-coral">Related Links:</h5>
                  <div className="space-y-1">
                    {note.links.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-dream-teal hover:text-dream-teal-light truncate transition-colors"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Additional Media */}
              {note.media && note.media.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-dream-coral mb-2">Media:</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {note.media.slice(0, 4).map((media, index) => (
                      <div key={media.id} className="aspect-square relative rounded-md overflow-hidden bg-dream-navy-lighter">
                        <Image
                          src={media.src}
                          alt={media.alt || `Media ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                  {note.media.length > 4 && (
                    <p className="text-xs text-gray-400 mt-2">
                      +{note.media.length - 4} more media files
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};