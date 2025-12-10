import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmDialog = ({ isOpen, onClose, onConfirm }: DeleteConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm glass rounded-3xl p-6 shadow-2xl animate-scale-in text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-destructive/10 rounded-full">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Delete Note?
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          This action cannot be undone. The note will be permanently removed.
        </p>
        
        <div className="flex items-center justify-center gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
