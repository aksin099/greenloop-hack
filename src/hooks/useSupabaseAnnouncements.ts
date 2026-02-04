import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Announcement } from "@/data/announcements";

export interface DbAnnouncement {
  id: string;
  title: string;
  category: string;
  quantity: number;
  unit: string;
  price_per_unit: number;
  location: string;
  image_url: string | null;
  description: string | null;
  seller_name: string | null;
  seller_company: string | null;
  seller_phone: string | null;
  created_at: string;
}

// Convert DB format to app format
const toAppFormat = (db: DbAnnouncement): Announcement => ({
  id: db.id,
  title: db.title,
  category: db.category,
  quantity: db.quantity,
  unit: db.unit,
  pricePerUnit: db.price_per_unit,
  location: db.location,
  image: db.image_url || "",
  description: db.description || "",
  createdAt: new Date(db.created_at),
  seller: {
    name: db.seller_name || "Anonim Satıcı",
    company: db.seller_company || "Fərdi Satıcı",
    phone: db.seller_phone || "+994 XX XXX XX XX",
  },
});

// Fetch all announcements
export function useSupabaseAnnouncements() {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data as DbAnnouncement[]).map(toAppFormat);
    },
  });
}

// Add new announcement
export function useAddAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (announcement: {
      title: string;
      category: string;
      quantity: number;
      unit: string;
      pricePerUnit: number;
      location: string;
      imageUrl?: string;
      description?: string;
      sellerName?: string;
      sellerCompany?: string;
      sellerPhone?: string;
    }) => {
      const { data, error } = await supabase
        .from("announcements")
        .insert({
          title: announcement.title,
          category: announcement.category,
          quantity: announcement.quantity,
          unit: announcement.unit,
          price_per_unit: announcement.pricePerUnit,
          location: announcement.location,
          image_url: announcement.imageUrl || null,
          description: announcement.description || null,
          seller_name: announcement.sellerName || null,
          seller_company: announcement.sellerCompany || null,
          seller_phone: announcement.sellerPhone || null,
        })
        .select()
        .single();

      if (error) throw error;
      return toAppFormat(data as DbAnnouncement);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}

// Upload image to storage
export function useUploadImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("announcement-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("announcement-images")
        .getPublicUrl(filePath);

      return publicUrl;
    },
  });
}
