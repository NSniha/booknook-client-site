"use client";
import { createContext, useContext } from "react";
import { useBooks } from "@/hooks/use-books";

const HomeLibraryContext = createContext(null);
export default function HomeLibraryProvider({ children }) {
  const library = useBooks("limit=100&sort=newest");
  return (
    <HomeLibraryContext.Provider value={library}>
      {children}
    </HomeLibraryContext.Provider>
  );
}
export function useHomeLibrary() {
  const context = useContext(HomeLibraryContext);
  if (!context)
    throw new Error("Home collections must be inside HomeLibraryProvider.");
  return context;
}
