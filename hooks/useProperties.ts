import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export interface Property {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  price: number;
  price_type: 'Jual' | 'Sewa';
  location: string;
  type: string;
  status: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  land_area: number;
  building_area: number;
  lat: number | null;
  lng: number | null;
  created_at: string;
}

export type PropertyInsert = Omit<Property, 'id' | 'created_at'>;
export type PropertyUpdate = Partial<PropertyInsert> & { id: string };

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...propertyKeys.lists(), filters] as const,
  detail: (id: string) => [...propertyKeys.all, 'detail', id] as const,
};

// ─── Fetch all properties (for dashboard – owner's properties) ────────────────
async function fetchMyProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Property[];
}

// ─── Fetch public/active properties with filters (for /cari) ─────────────────
interface PropertyFilters {
  search?: string;
  type?: string;
  priceType?: string;
  maxPrice?: number;
}

async function fetchPublicProperties(filters: PropertyFilters): Promise<Property[]> {
  let query = supabase
    .from('properties')
    .select('*')
    .eq('status', 'Aktif')
    .order('created_at', { ascending: false });

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,location.ilike.%${filters.search}%`);
  }
  if (filters.type && filters.type !== 'Semua') {
    query = query.eq('type', filters.type);
  }
  if (filters.priceType) {
    query = query.eq('price_type', filters.priceType);
  }
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Property[];
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Dashboard: semua properti milik user yang login */
export function useMyProperties() {
  return useQuery({
    queryKey: propertyKeys.lists(),
    queryFn: fetchMyProperties,
  });
}

/** Public /cari: properti aktif dengan filter */
export function usePublicProperties(filters: PropertyFilters = {}) {
  return useQuery({
    queryKey: propertyKeys.list(filters as Record<string, unknown>),
    queryFn: () => fetchPublicProperties(filters),
    staleTime: 30 * 1000, // 30 detik agar cepat di-refresh
  });
}

/** Create property */
export function useCreateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<PropertyInsert, 'user_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Tidak terautentikasi');

      const { data: created, error } = await supabase
        .from('properties')
        .insert({ ...data, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
    },
  });
}

/** Update property */
export function useUpdateProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: PropertyUpdate) => {
      const { data: updated, error } = await supabase
        .from('properties')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
    },
  });
}

/** Delete property */
export function useDeleteProperty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
    },
  });
}

/** Upload foto ke Supabase Storage → return public URL */
export async function uploadPropertyImage(file: File, userId: string): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${userId}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from('property-images')
    .upload(path, file, { upsert: false });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('property-images')
    .getPublicUrl(path);

  return publicUrl;
}
