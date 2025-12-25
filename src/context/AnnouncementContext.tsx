import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Announcement, initialAnnouncements } from "@/data/announcements";

interface AnnouncementContextType {
  announcements: Announcement[];
  favorites: string[];
  addAnnouncement: (announcement: Omit<Announcement, "id" | "createdAt">) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getAnnouncementById: (id: string) => Announcement | undefined;
  getFavoriteAnnouncements: () => Announcement[];
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [favorites, setFavorites] = useState<string[]>([]);

  const addAnnouncement = useCallback((announcement: Omit<Announcement, "id" | "createdAt">) => {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const getAnnouncementById = useCallback(
    (id: string) => announcements.find((a) => a.id === id),
    [announcements]
  );

  const getFavoriteAnnouncements = useCallback(
    () => announcements.filter((a) => favorites.includes(a.id)),
    [announcements, favorites]
  );

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        favorites,
        addAnnouncement,
        toggleFavorite,
        isFavorite,
        getAnnouncementById,
        getFavoriteAnnouncements,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncements() {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    throw new Error("useAnnouncements must be used within an AnnouncementProvider");
  }
  return context;
}
