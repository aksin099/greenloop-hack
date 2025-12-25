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

// Mock logistics requests data
const initialLogisticsRequests: LogisticsRequest[] = [
  {
    id: "log1",
    announcementId: "1",
    material: "Beton Bloklar M200",
    quantity: 300,
    unit: "ədəd",
    fromLocation: "Ağdam",
    toLocation: "Bakı",
    offeredPrice: 450,
    status: "open",
    createdAt: new Date("2024-12-24"),
  },
  {
    id: "log2",
    announcementId: "2",
    material: "Armatur Polad 12mm",
    quantity: 1500,
    unit: "metr",
    fromLocation: "Bakı",
    toLocation: "Gəncə",
    offeredPrice: 320,
    status: "open",
    createdAt: new Date("2024-12-24"),
  },
  {
    id: "log3",
    announcementId: "4",
    material: "Portland Sement M400",
    quantity: 800,
    unit: "kisə",
    fromLocation: "Sumqayıt",
    toLocation: "Şəki",
    offeredPrice: 680,
    status: "open",
    createdAt: new Date("2024-12-23"),
  },
  {
    id: "log4",
    announcementId: "5",
    material: "PVC Kanalizasiya Borusu",
    quantity: 500,
    unit: "metr",
    fromLocation: "Gəncə",
    toLocation: "Lənkəran",
    offeredPrice: 280,
    status: "accepted",
    createdAt: new Date("2024-12-22"),
  },
  {
    id: "log5",
    announcementId: "6",
    material: "Keramik Döşəmə Kafelləri",
    quantity: 600,
    unit: "m²",
    fromLocation: "Bakı",
    toLocation: "Mingəçevir",
    offeredPrice: 520,
    status: "open",
    createdAt: new Date("2024-12-25"),
  },
];

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
  const [logisticsRequests, setLogisticsRequests] = useState<LogisticsRequest[]>(initialLogisticsRequests);

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
