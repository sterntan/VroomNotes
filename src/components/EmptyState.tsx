import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onCreateNote: () => void;
}

export const EmptyState = ({ onCreateNote }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150" />
        <div className="relative glass rounded-full p-6">
          <FileText className="w-12 h-12 text-primary" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No notes yet
      </h3>
      <p className="text-muted-foreground text-center mb-6 max-w-sm">
        Create your first note to get started with learning CRUD operations!
      </p>
      
      <Button onClick={onCreateNote} className="gap-2">
        <Plus className="w-4 h-4" />
        Create your first note
      </Button>
    </div>
  );
};
