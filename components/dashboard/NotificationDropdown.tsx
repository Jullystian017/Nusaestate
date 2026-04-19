'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, Sparkles, Home, Bell, Check, 
  ChevronRight, Circle, Clock, MessageSquare,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'lead' | 'ai' | 'status' | 'system';
  is_read: boolean;
  created_at: string;
}

export default function NotificationDropdown({ onClose }: { onClose: () => void }) {
  const supabase = createClient();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setNotifications(data || []);
    } catch (err) {
      console.error('Error fetching dropdown notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Subscribe to new notifications
    const channel = supabase
      .channel('dropdown-notifs')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInMin = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMin < 1) return 'Baru saja';
    if (diffInMin < 60) return `${diffInMin}m lalu`;
    if (diffInMin < 1440) return `${Math.floor(diffInMin / 60)}j lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  const markAllAsRead = async () => {
    try {
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('is_read', false);
      fetchNotifications();
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  return (
    <div className="absolute top-full right-0 mt-3 w-[380px] bg-white-pure rounded-[2rem] shadow-premium border border-border-line/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
      {/* Header */}
      <div className="p-6 border-b border-border-line/5 flex items-center justify-between bg-surface-gray/10">
        <div>
          <h3 className="text-sm font-bold text-text-dark">Notifikasi</h3>
          <p className="text-[10px] text-text-gray/40 font-medium uppercase tracking-widest mt-0.5">Real-time Feed</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="text-[10px] font-bold text-brand-blue hover:underline"
        >
          Tandai Semua Dibaca
        </button>
      </div>

      {/* List */}
      <div className="max-h-[400px] overflow-y-auto no-scrollbar min-h-[150px]">
        {loading ? (
          <div className="py-12 flex justify-center">
            <Loader2 size={24} className="animate-spin text-brand-blue/30" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-12 px-6 text-center">
            <p className="text-xs text-text-gray/40 italic">Tidak ada notifikasi baru.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id}
              className={`p-5 flex gap-4 hover:bg-surface-gray/30 transition-all cursor-pointer border-b border-border-line/5 group relative ${!notif.is_read ? 'bg-brand-blue/[0.02]' : ''}`}
            >
              {!notif.is_read && (
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <Circle size={6} className="fill-brand-blue text-brand-blue" />
                </div>
              )}
              
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                notif.type === 'lead' ? 'bg-emerald-50 text-emerald-500' :
                notif.type === 'ai' ? 'bg-brand-blue/5 text-brand-blue' :
                notif.type === 'status' ? 'bg-orange-50 text-orange-500' :
                'bg-surface-gray text-text-gray/60'
              }`}>
                {notif.type === 'lead' && <Users size={18} />}
                {notif.type === 'ai' && <Sparkles size={18} />}
                {notif.type === 'status' && <Home size={18} />}
                {notif.type === 'system' && <MessageSquare size={18} />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-bold text-text-dark truncate pr-2">{notif.title}</p>
                  <span className="text-[10px] text-text-gray/30 whitespace-nowrap">{formatTime(notif.created_at)}</span>
                </div>
                <p className="text-xs text-text-gray/60 line-clamp-2 leading-relaxed">{notif.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <Link 
        href="/dashboard/activity" 
        onClick={onClose}
        className="p-4 bg-surface-gray/10 flex items-center justify-center gap-2 text-[11px] font-bold text-text-gray/60 hover:text-brand-blue hover:bg-brand-blue/5 transition-all"
      >
        Buka Pusat Aktivitas & Notifikasi
        <ChevronRight size={14} />
      </Link>
    </div>
  );
}
