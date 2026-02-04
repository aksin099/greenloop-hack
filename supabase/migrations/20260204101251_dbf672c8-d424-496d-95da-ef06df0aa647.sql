-- Create announcements table
CREATE TABLE public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit TEXT NOT NULL DEFAULT 'ədəd',
  price_per_unit DECIMAL(10,2) NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  seller_name TEXT,
  seller_company TEXT,
  seller_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Anyone can view announcements"
  ON public.announcements FOR SELECT
  USING (true);

-- Allow anyone to insert (no auth for now)
CREATE POLICY "Anyone can create announcements"
  ON public.announcements FOR INSERT
  WITH CHECK (true);

-- Create storage bucket for announcement images
INSERT INTO storage.buckets (id, name, public)
VALUES ('announcement-images', 'announcement-images', true);

-- Allow public read access for storage
CREATE POLICY "Public read access for announcement images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'announcement-images');

-- Allow public uploads
CREATE POLICY "Anyone can upload announcement images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'announcement-images');