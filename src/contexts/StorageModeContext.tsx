import React, { createContext, useContext, useState, ReactNode } from "react";
import { StorageMode } from "@/types/note";

interface StorageModeContextType {
  mode: StorageMode;
  setMode: (mode: StorageMode) => void;
  apiUrl: string;
}

const StorageModeContext = createContext<StorageModeContextType | undefined>(
  undefined
);

export const StorageModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<StorageMode>("local");
  const apiUrl =
    import.meta.env.VITE_API_URL || "http://localhost:8000/api/notes";

  return (
    <StorageModeContext.Provider value={{ mode, setMode, apiUrl }}>
      {children}
    </StorageModeContext.Provider>
  );
};

export const useStorageMode = () => {
  const context = useContext(StorageModeContext);
  if (!context) {
    throw new Error("useStorageMode must be used within StorageModeProvider");
  }
  return context;
};
