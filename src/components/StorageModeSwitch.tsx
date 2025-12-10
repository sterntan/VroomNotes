import { useStorageMode } from '@/contexts/StorageModeContext';
import { Database, HardDrive } from 'lucide-react';

export const StorageModeSwitch = () => {
  const { mode, setMode } = useStorageMode();

  return (
    <div className="flex items-center gap-3 glass rounded-full p-1.5 pr-4">
      <button
        onClick={() => setMode(mode === 'local' ? 'backend' : 'local')}
        className="relative flex items-center gap-2 bg-secondary rounded-full p-2 pr-3 transition-all duration-300 hover:bg-secondary/80"
      >
        <div className="relative">
          <div
            className={`absolute inset-0 rounded-full bg-primary transition-all duration-300 ${
              mode === 'backend' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          />
          <div
            className={`absolute inset-0 rounded-full bg-accent transition-all duration-300 ${
              mode === 'local' ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          />
          <div className="relative p-1.5">
            {mode === 'local' ? (
              <HardDrive className="w-4 h-4 text-accent-foreground" />
            ) : (
              <Database className="w-4 h-4 text-primary-foreground" />
            )}
          </div>
        </div>
        <span className="text-sm font-medium text-foreground">
          {mode === 'local' ? 'Local State' : 'Backend'}
        </span>
      </button>
      
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
          mode === 'local' ? 'bg-accent' : 'bg-primary animate-pulse'
        }`} />
        {mode === 'local' ? 'localStorage' : 'localhost:8000'}
      </div>
    </div>
  );
};
