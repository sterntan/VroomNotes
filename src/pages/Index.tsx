import { useState } from 'react';
import { Note } from '@/types/note';
import { useNotes } from '@/hooks/useNotes';
import { NoteCard } from '@/components/NoteCard';
import { NoteModal } from '@/components/NoteModal';
import { NotesHeader } from '@/components/NotesHeader';
import { EmptyState } from '@/components/EmptyState';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { notes, loading, createNote, updateNote, deleteNote, refetch } = useNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (title: string, content: string) => {
    if (editingNote) {
      updateNote(editingNote.id, title, content);
    } else {
      createNote(title, content);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteNote(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <NotesHeader
          onCreateNote={handleCreateNote}
          onRefresh={refetch}
          notesCount={notes.length}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : notes.length === 0 ? (
          <EmptyState onCreateNote={handleCreateNote} />
        ) : (
          <div className="grid gap-4">
            {notes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                index={index}
                onEdit={handleEditNote}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}

        <NoteModal
          isOpen={isModalOpen}
          note={editingNote}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNote}
        />

        <DeleteConfirmDialog
          isOpen={deleteId !== null}
          onClose={() => setDeleteId(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>

      {/* CRUD Operations Info */}
      <footer className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto">
        <div className="glass rounded-2xl p-4 text-xs">
          <p className="font-medium text-foreground mb-2">CRUD Operations:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-muted-foreground">
            <span className="px-2 py-1 bg-accent/10 text-accent rounded-lg">C - Create</span>
            <span className="px-2 py-1 bg-secondary rounded-lg">R - Read</span>
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg">U - Update</span>
            <span className="px-2 py-1 bg-destructive/10 text-destructive rounded-lg">D - Delete</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
