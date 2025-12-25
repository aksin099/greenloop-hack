import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Announcement, initialAnnouncements } from "@/data/announcements";

export interface LogisticsRequest {
  id: string;
  announcementId: string;
  material: string;
  quantity: number;
  unit: string;
  fromLocation: string;
  toLocation: string;
  offeredPrice: number;
  status: "open" | "accepted" | "completed";
  createdAt: Date;
}

interface AnnouncementContextType {
  announcements: Announcement[];
  favorites: string[];
  logisticsRequests: LogisticsRequest[];
  addAnnouncement: (announcement: Omit<Announcement, "id" | "createdAt">) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getAnnouncementById: (id: string) => Announcement | undefined;
  getFavoriteAnnouncements: () => Announcement[];
  addLogisticsRequest: (request: Omit<LogisticsRequest, "id" | "createdAt" | "status">) => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [logisticsRequests, setLogisticsRequests] = useState<LogisticsRequest[]>([]);

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

  const addLogisticsRequest = useCallback((request: Omit<LogisticsRequest, "id" | "createdAt" | "status">) => {
    const newRequest: LogisticsRequest = {
      ...request,
      id: Date.now().toString(),
      status: "open",
      createdAt: new Date(),
    };
    setLogisticsRequests((prev) => [newRequest, ...prev]);
  }, []);

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        favorites,
        logisticsRequests,
        addAnnouncement,
        toggleFavorite,
        isFavorite,
        getAnnouncementById,
        getFavoriteAnnouncements,
        addLogisticsRequest,
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
