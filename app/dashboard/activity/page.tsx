'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, Search, Filter, ArrowUpRight, 
  Users, TrendingUp, Home, ArrowLeft, 
  ChevronRight, Calendar, Bell, Sparkles,
  Loader2, AlertCircle
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

interface Activity {
  id: string;
  type: 'lead' | 'deal' | 'property';
  title: string;
  description: string;
  status: string;
  timestamp: string;
  fullDate: string;
}

export default function ActivityLogPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('Semua');

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Baru saja';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} jam lalu`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} hari lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  useEffect(() => {
    async function fetchAllActivity() {
      try {
        const [leadsRes, propsRes, dealsRes] = await Promise.all([
          supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(20),
          supabase.from('properties').select('*').order('created_at', { ascending: false }).limit(20),
          supabase.from('deals').select('*').order('created_at', { ascending: false }).limit(20)
        ]);

        const combined: Activity[] = [];

        // Map Leads
        (leadsRes.data || []).forEach(l => {
          combined.push({
            id: `lead-${l.id}`,
            type: 'lead',
            title: 'Prospek Baru Masuk',
            description: `${l.name || 'Anonim'} tertarik pada ${l.intent || 'Listing Umum'}`,
            status: l.status || 'Baru',
            timestamp: formatRelativeTime(l.created_at),
            fullDate: new Date(l.created_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })
          });
        });

        // Map Properties
        (propsRes.data || []).forEach(p => {
          combined.push({
            id: `prop-${p.id}`,
            type: 'property',
            title: 'Listing Diterbitkan',
            description: `Unit ${p.title} telah tersedia di market.`,
            status: p.status || 'Aktif',
            timestamp: formatRelativeTime(p.created_at),
            fullDate: new Date(p.created_at).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })
          });
        });

        // Map Deals
        (dealsRes.data || []).forEach(d => {
          combined.push({
            id: `deal-${d.id}`,
            type: 'deal',
            title: 'Pipeline Diperbarui',
            description: `Deal untuk ${d.client_name || 'Klien'} di tahap ${d.status}.`,
            status: d.priority || 'Medium',
            timestamp: formatRelativeTime(d.created_at || new Date().toISOString()),
            fullDate: new Date(d.created_at || new Date().toISOString()).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })
          });
        });

        // Sort by actual date
        setActivities(combined.sort((a, b) => new Date(b.fullDate).getTime() - new Date(a.fullDate).getTime()));
      } catch (err) {
        console.error('Error fetching activities:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllActivity();
  }, []);

  const filtered = useMemo(() => {
    return activities.filter(act => {
      const matchesSearch = act.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           act.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'Semua' || 
                         (typeFilter === 'Leads' && act.type === 'lead') ||
                         (typeFilter === 'Pipeline' && act.type === 'deal') ||
                         (typeFilter === 'Listing' && act.type === 'property');
      return matchesSearch && matchesType;
    });
  }, [activities, searchQuery, typeFilter]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lead': return <Users size={18} />;
      case 'deal': return <TrendingUp size={18} />;
      case 'property': return <Home size={18} />;
      default: return <Clock size={18} />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'lead': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'deal': return 'bg-violet-50 text-violet-600 border-violet-100';
      case 'property': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-medium text-brand-blue hover:gap-3 transition-all mb-4">
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-display font-medium text-text-dark tracking-tight">Log Aktivitas</h1>
          <p className="text-sm font-normal text-text-gray/50">Lacak setiap perubahan dan interaksi di akun PropNest Anda.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white-pure border border-border-line/20 rounded-2xl text-text-gray/40 hover:text-brand-blue transition-all shadow-sm">
            <Calendar size={20} />
          </button>
          <button className="p-3 bg-white-pure border border-border-line/20 rounded-2xl text-text-gray/40 hover:text-brand-blue transition-all shadow-sm">
            <Bell size={20} />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white-pure p-4 rounded-3xl border border-border-line/20 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-gray/30" size={18} strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Cari aktivitas..."
            className="w-full bg-surface-gray/30 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-normal focus:ring-2 focus:ring-brand-blue/10 transition-all placeholder:text-text-gray/30"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
          {['Semua', 'Leads', 'Pipeline', 'Listing'].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all border whitespace-nowrap ${
                typeFilter === t
                  ? 'bg-brand-blue text-white-pure border-brand-blue shadow-sm'
                  : 'bg-white-pure border-border-line/20 text-text-gray/60 hover:border-brand-blue/30'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-blue/20 via-brand-blue/10 to-transparent rounded-full hidden md:block"></div>

        <div className="space-y-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-text-gray/40">
              <Loader2 size={32} className="animate-spin mb-4 text-brand-blue" />
              <p className="text-sm font-medium">Sinkronisasi data...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 bg-surface-gray/20 rounded-[3rem] border border-dashed border-border-line/30">
              <div className="w-16 h-16 bg-white-pure rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Filter size={24} className="text-text-gray/20" />
              </div>
              <h3 className="text-lg font-medium text-text-dark">Tidak ada aktivitas</h3>
              <p className="text-sm text-text-gray/40">Coba ubah filter atau kata kunci pencarian Anda.</p>
            </div>
          ) : (
            filtered.map((act, index) => (
              <div key={act.id} className="relative md:pl-16 group">
                {/* Dot / Icon Container */}
                <div className={`absolute left-0 top-0 w-14 h-14 rounded-2xl border flex items-center justify-center z-10 transition-all duration-500 group-hover:scale-110 shadow-sm ${getTypeStyles(act.type)}`}>
                  {getTypeIcon(act.type)}
                </div>

                <div className="bg-white-pure p-8 rounded-[2rem] border border-border-line/10 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-medium text-text-dark group-hover:text-brand-blue transition-colors">{act.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getTypeStyles(act.type)}`}>
                          {act.type}
                        </span>
                      </div>
                      <p className="text-sm text-text-gray/60 leading-relaxed font-normal">{act.description}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-semibold text-text-dark/80">{act.timestamp}</span>
                      <span className="text-[10px] text-text-gray/30 uppercase tracking-widest mt-1">{act.fullDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-6 border-t border-border-line/5">
                    <button className="text-[10px] font-bold text-text-gray/40 uppercase tracking-widest hover:text-brand-blue transition-colors flex items-center gap-1.5 group/btn">
                      Lihat Detail <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    {act.type === 'lead' && (
                      <button className="text-[10px] font-bold text-brand-blue uppercase tracking-widest hover:underline">
                        Hubungi Prospek
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Note */}
      {!loading && filtered.length > 0 && (
        <div className="text-center pt-10">
          <p className="text-[10px] text-text-gray/30 uppercase tracking-[0.2em] font-medium">
            Menampilkan {filtered.length} aktivitas terbaru • Terakhir sinkronisasi: {new Date().toLocaleTimeString()}
          </p>
        </div>
      )}
    </div>
  );
}
