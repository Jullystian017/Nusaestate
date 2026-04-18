'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Map as MapIcon } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Format harga ringkas: terima number atau string Rupiah
const formatPriceShort = (price: string | number): string => {
  const num = typeof price === 'number'
    ? price
    : parseFloat(String(price).replace(/[^0-9]/g, ''));

  if (isNaN(num) || num === 0) return '—';
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1).replace('.0', '')}M`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(0)}jt`;
  return `${num}`;
};

const createCustomIcon = (priceLabel: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="price-marker-outer">
        <div class="price-marker-inner">${priceLabel}</div>
        <div class="price-marker-pulse"></div>
      </div>
    `,
    iconSize: [80, 30],
    iconAnchor: [40, 15],
  });
};

interface LeafletMapProps {
  properties: any[];
}

// Sub-component for custom controls
const MapControls = () => {
  const map = useMap();

  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();
  
  const handleLocate = () => {
    map.locate().on('locationfound', (e) => {
      map.flyTo(e.latlng, 15);
      L.marker(e.latlng).addTo(map).bindPopup("Kamu di sini!").openPopup();
    });
  };

  return (
    <div className="absolute top-4 right-4 z-[500] flex flex-col gap-2">
      <div className="flex flex-col bg-white-pure/90 backdrop-blur-md rounded-xl shadow-premium border border-white/20 overflow-hidden">
        <button 
          onClick={handleZoomIn}
          className="p-3 hover:bg-surface-gray border-b border-border-line text-text-dark transition-colors"
          title="Zoom In"
        >
          <span className="text-xl font-bold">+</span>
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-3 hover:bg-surface-gray text-text-dark transition-colors"
          title="Zoom Out"
        >
          <span className="text-xl font-bold">−</span>
        </button>
      </div>

      <button 
        onClick={handleLocate}
        className="p-3 bg-white-pure/90 backdrop-blur-md rounded-xl shadow-premium border border-white/20 text-brand-blue hover:text-brand-orange transition-all active:scale-95"
        title="Lokasi Saya"
      >
        <MapIcon size={20} />
      </button>
    </div>
  );
};

export default function LeafletMap({ properties }: LeafletMapProps) {
  const defaultCenter: [number, number] = [-7.025, 110.320];

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={11} 
      scrollWheelZoom={true}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      
      <MapControls />
      
      {properties.map((prop, idx) => {
        // Harga bisa berupa number (dari DB) atau string format lama (mock)
        const priceLabel = typeof prop.price === 'number'
          ? formatPriceShort(prop.price)
          : formatPriceShort(prop.price);

        // Nama properti — support field name (mock) atau title (DB)
        const propName = prop.name || prop.title || 'Properti';
        const propImage = prop.image || prop.images?.[0];

        return (
          <Marker 
            key={prop.id || idx} 
            position={[prop.coords?.lat ?? -7.025, prop.coords?.lng ?? 110.320]} 
            icon={createCustomIcon(priceLabel)}
          >
            <Popup className="premium-popup">
              <div className="p-1 min-w-[160px]">
                {propImage && (
                  <img src={propImage} alt={propName} className="w-full h-24 object-cover rounded-lg mb-2" />
                )}
                <h4 className="font-bold text-brand-blue text-sm leading-snug">{propName}</h4>
                <p className="text-brand-orange font-bold text-xs mt-0.5">
                  {typeof prop.price === 'number'
                    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(prop.price)
                    : prop.price}
                </p>
                {prop.location && (
                  <p className="text-[10px] text-gray-500 mt-0.5">{prop.location}</p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
