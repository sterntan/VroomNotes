import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StorageModeSwitch } from './StorageModeSwitch';

interface NotesHeaderProps {
  onCreateNote: () => void;
  onRefresh: () => void;
  notesCount: number;
}

export const NotesHeader = ({ onCreateNote, onRefresh, notesCount }: NotesHeaderProps) => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Notes<span className="text-gradient">App</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Learn CRUD operations with this simple notes manager
          </p>
        </div>
        <StorageModeSwitch />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {notesCount} {notesCount === 1 ? 'note' : 'notes'}
          </span>
          <button
            onClick={onRefresh}
            className="btn-icon"
            aria-label="Refresh notes"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        
        <Button onClick={onCreateNote} className="gap-2">
          <Plus className="w-4 h-4" />
          New Note
        </Button>
      </div>
    </header>
  );
};
