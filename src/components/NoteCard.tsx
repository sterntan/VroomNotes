import { Note } from '@/types/note';
import { Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface NoteCardProps {
  note: Note;
  index: number;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteCard = ({ note, index, onEdit, onDelete }: NoteCardProps) => {
  return (
    <article
      className="note-card group opacity-0 animate-slide-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground truncate mb-1">
            {note.title || 'Untitled'}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 whitespace-pre-wrap">
            {note.content || 'No content'}
          </p>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(note)}
            className="btn-icon"
            aria-label="Edit note"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="btn-icon-danger"
            aria-label="Delete note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Created {format(new Date(note.createdAt), 'MMM d, yyyy')}
        </span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
          Updated {format(new Date(note.updatedAt), 'h:mm a')}
        </span>
      </div>
    </article>
  );
};
