
# Supabase Database Integration for "Elan Yerləşdir"

## Overview
This plan outlines how to integrate Supabase database to persist announcements so they remain visible after page refresh. We'll set up Lovable Cloud (the preferred approach), create the necessary database tables, configure storage for images, and update the frontend to fetch/save data from Supabase.

---

## Database Schema Design

### Table: `announcements`

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` (PK) | Unique identifier |
| `title` | `text` | Material title (required) |
| `category` | `text` | Category ID (concrete, metal, wood, etc.) |
| `quantity` | `integer` | Available quantity |
| `unit` | `text` | Unit type (piece, meter, m2, etc.) |
| `price_per_unit` | `decimal` | Price per unit in AZN |
| `location` | `text` | Location name |
| `image_url` | `text` | URL to uploaded image or default |
| `description` | `text` | Detailed description |
| `seller_name` | `text` | Seller's name |
| `seller_company` | `text` | Company name |
| `seller_phone` | `text` | Contact phone |
| `created_at` | `timestamptz` | Creation timestamp |

### Storage Bucket: `announcement-images`
- Public bucket for storing uploaded material images
- Will store user-uploaded images and return public URLs

---

## Implementation Steps

### Step 1: Enable Lovable Cloud
- Initialize Supabase connection through Lovable Cloud
- This will create the backend infrastructure automatically

### Step 2: Create Database Migration
Create a SQL migration that:
- Creates the `announcements` table with all required fields
- Sets up Row Level Security (RLS) policies for public read access
- Allows anyone to insert announcements (since there's no auth yet)

### Step 3: Create Storage Bucket
Create a migration for:
- `announcement-images` storage bucket (public)
- RLS policies allowing public uploads and reads

### Step 4: Create Supabase Client
- Create `src/integrations/supabase/client.ts` with the Supabase client configuration
- Add TypeScript types for the database schema

### Step 5: Create React Query Hooks
Create custom hooks for data fetching:
- `useAnnouncements()` - Fetch all announcements
- `useAddAnnouncement()` - Mutation to add new announcement
- `useUploadImage()` - Upload image to storage

### Step 6: Update AnnouncementContext
Modify the context to:
- Fetch announcements from Supabase on mount
- Replace mock data with real database data
- Update `addAnnouncement` to save to database

### Step 7: Update PostAnnouncement Page
Modify the form submission to:
- Upload image to Supabase Storage first (if provided)
- Save announcement data to the database
- Show loading states during submission

---

## Technical Details

### Database Migration SQL

```sql
-- Create announcements table
CREATE TABLE public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit TEXT NOT NULL DEFAULT 'piece',
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
```

### Storage Bucket Setup

```sql
-- Create storage bucket for announcement images
INSERT INTO storage.buckets (id, name, public)
VALUES ('announcement-images', 'announcement-images', true);

-- Allow public read access
CREATE POLICY "Public read access for announcement images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'announcement-images');

-- Allow public uploads
CREATE POLICY "Anyone can upload announcement images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'announcement-images');
```

### Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/integrations/supabase/client.ts` | Create | Supabase client setup |
| `src/integrations/supabase/types.ts` | Create | TypeScript database types |
| `src/hooks/useSupabaseAnnouncements.ts` | Create | React Query hooks for announcements |
| `src/context/AnnouncementContext.tsx` | Modify | Integrate with Supabase data |
| `src/pages/PostAnnouncement.tsx` | Modify | Save to database with image upload |

---

## Data Flow

```text
User fills form --> Upload image to Storage --> Get image URL --> 
Save to announcements table --> Invalidate cache --> UI updates
```

---

## Notes
- Initial mock data will be kept as fallback when database is empty
- Images uploaded by users will be stored in Supabase Storage
- If no image is uploaded, a default category image URL will be used
- React Query will handle caching and refetching automatically
