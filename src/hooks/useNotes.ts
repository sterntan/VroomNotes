import { useState, useEffect, useCallback } from 'react';
import { Note } from '@/types/note';
import { useStorageMode } from '@/contexts/StorageModeContext';
import { toast } from '@/hooks/use-toast';

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useNotes = () => {
  const { mode, apiUrl } = useStorageMode();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch notes
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      if (mode === 'local') {
        const stored = localStorage.getItem('notes');
        setNotes(stored ? JSON.parse(stored) : []);
      } else {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch notes');
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: mode === 'backend' ? "Cannot connect to backend. Is it running?" : "Failed to load notes",
        variant: "destructive",
      });
      if (mode === 'backend') setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [mode, apiUrl]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Create note
  const createNote = async (title: string, content: string) => {
    const newNote: Note = {
      id: generateId(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      if (mode === 'local') {
        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
      } else {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
        if (!response.ok) throw new Error('Failed to create note');
        const created = await response.json();
        setNotes(prev => [created, ...prev]);
      }
      toast({
        title: "Created!",
        description: `Note "${title}" has been created.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive",
      });
    }
  };

  // Update note
  const updateNote = async (id: string, title: string, content: string) => {
    const updatedNote = {
      title,
      content,
      updatedAt: new Date(),
    };

    try {
      if (mode === 'local') {
        const updatedNotes = notes.map(note =>
          note.id === id ? { ...note, ...updatedNote } : note
        );
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
      } else {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
        if (!response.ok) throw new Error('Failed to update note');
        const updated = await response.json();
        setNotes(prev => prev.map(note => note.id === id ? updated : note));
      }
      toast({
        title: "Updated!",
        description: `Note "${title}" has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive",
      });
    }
  };

  // Delete note
  const deleteNote = async (id: string) => {
    const noteToDelete = notes.find(n => n.id === id);
    
    try {
      if (mode === 'local') {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
      } else {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete note');
        setNotes(prev => prev.filter(note => note.id !== id));
      }
      toast({
        title: "Deleted!",
        description: `Note "${noteToDelete?.title}" has been removed.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    }
  };

  return {
    notes,
    loading,
    createNote,
    updateNote,
    deleteNote,
    refetch: fetchNotes,
  };
};
