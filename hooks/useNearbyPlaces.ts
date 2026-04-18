import { useState, useEffect } from 'react';

export interface NearbyPlace {
  id: number;
  name: string;
  dist: number;       // meter
  distLabel: string;  // "1.2 km" atau "800 m"
  timeLabel: string;  // estimasi berkendara
  lat: number;
  lng: number;
}

export interface NearbyCategories {
  transport: NearbyPlace[];
  school: NearbyPlace[];
  shopping: NearbyPlace[];
  health: NearbyPlace[];
  tourism: NearbyPlace[];
  worship: NearbyPlace[];
}

// Overpass API query builder
const OSM_QUERIES: Record<keyof NearbyCategories, string> = {
  transport: `
    node["public_transport"~"stop_position|station"](around:3000,LAT,LNG);
    node["railway"~"station|halt|tram_stop"](around:3000,LAT,LNG);
    node["highway"="bus_stop"](around:2000,LAT,LNG);
  `,
  school: `
    node["amenity"~"school|university|college|kindergarten"](around:3000,LAT,LNG);
    way["amenity"~"school|university|college|kindergarten"](around:3000,LAT,LNG);
  `,
  shopping: `
    node["shop"~"mall|supermarket|convenience|department_store"](around:3000,LAT,LNG);
    node["amenity"~"marketplace"](around:3000,LAT,LNG);
    way["building"="mall"](around:3000,LAT,LNG);
  `,
  health: `
    node["amenity"~"hospital|clinic|pharmacy|doctors"](around:5000,LAT,LNG);
    way["amenity"~"hospital|clinic"](around:5000,LAT,LNG);
  `,
  tourism: `
    node["tourism"~"attraction|museum|viewpoint|theme_park|hotel"](around:5000,LAT,LNG);
    node["leisure"~"park|water_park|sports_centre"](around:3000,LAT,LNG);
  `,
  worship: `
    node["amenity"="place_of_worship"](around:2000,LAT,LNG);
  `,
};

const haversineMeters = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371000;
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
};

const formatDist = (m: number): string => {
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(1).replace('.0', '')} km`;
};

const estimateDriveTime = (m: number): string => {
  // Asumsi kecepatan rata2 30 km/jam di perkotaan
  const minutes = Math.ceil((m / 30000) * 60);
  if (minutes < 1) return '< 1 Menit';
  return `${minutes} Menit`;
};

async function fetchCategory(
  cat: keyof NearbyCategories,
  lat: number,
  lng: number
): Promise<NearbyPlace[]> {
  const rawQuery = OSM_QUERIES[cat]
    .replace(/LAT/g, String(lat))
    .replace(/LNG/g, String(lng));

  const query = `[out:json][timeout:10];(${rawQuery});out center;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) return [];
    const json = await res.json();

    const places: NearbyPlace[] = json.elements
      .filter((el: any) => {
        // Pastikan ada nama dan koordinat
        const elLat = el.lat ?? el.center?.lat;
        const elLng = el.lon ?? el.center?.lon;
        return el.tags?.name && elLat && elLng;
      })
      .map((el: any) => {
        const elLat = el.lat ?? el.center?.lat;
        const elLng = el.lon ?? el.center?.lon;
        const dist = haversineMeters(lat, lng, elLat, elLng);
        return {
          id: el.id,
          name: el.tags.name,
          dist,
          distLabel: formatDist(dist),
          timeLabel: estimateDriveTime(dist),
          lat: elLat,
          lng: elLng,
        };
      })
      .sort((a: NearbyPlace, b: NearbyPlace) => a.dist - b.dist)
      .slice(0, 5); // Ambil 5 terdekat

    return places;
  } catch {
    return [];
  }
}

export function useNearbyPlaces(lat: number | null, lng: number | null) {
  const [data, setData] = useState<NearbyCategories>({
    transport: [], school: [], shopping: [], health: [], tourism: [], worship: [],
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!lat || !lng) return;

    setLoading(true);
    setLoaded(false);

    const cats = Object.keys(OSM_QUERIES) as (keyof NearbyCategories)[];

    // Fetch semua kategori secara paralel
    Promise.all(
      cats.map(cat => fetchCategory(cat, lat, lng).then(places => ({ cat, places })))
    ).then(results => {
      const newData = { ...data };
      results.forEach(({ cat, places }) => {
        newData[cat] = places;
      });
      setData(newData);
      setLoading(false);
      setLoaded(true);
    });
  }, [lat, lng]);

  return { data, loading, loaded };
}
