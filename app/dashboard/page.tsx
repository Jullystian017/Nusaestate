'use client';

import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, Home, MousePointerClick, ArrowUpRight, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import LeadsChart from '@/components/dashboard/LeadsChart';

export default function DashboardPage() {
  const supabase = createClient();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (error) throw error;
        setLeads(data || []);
      } catch (err) {
        console.error('Error fetching leads:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const stats = [
    { label: 'Total Leads', value: '124', change: '+12%', isPositive: true, icon: Users, color: 'text-brand-blue', bgColor: 'bg-brand-blue/10' },
    { label: 'Listing Aktif', value: '8', change: '0%', isPositive: true, icon: Home, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { label: 'Konversi', value: '2.4%', change: '+0.4%', isPositive: true, icon: TrendingUp, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { label: 'Klik Chatbot', value: '432', change: '+45%', isPositive: true, icon: MousePointerClick, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white-pure p-6 rounded-3xl border border-border-line/40 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bgColor} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${stat.isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                  {stat.isPositive && <ArrowUpRight size={12} />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-3xl font-display font-semibold text-text-dark mb-1">{stat.value}</h3>
              <p className="text-sm font-medium text-text-gray">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Analytics Chart Section */}
      <div className="bg-white-pure p-8 rounded-[2rem] border border-border-line/40 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-text-dark mb-1">Tren Leads & Interaksi AI</h2>
            <p className="text-sm font-medium text-text-gray">Visualisasi performa marketing kamu dalam 7 hari terakhir</p>
          </div>
          <div className="flex items-center gap-3 bg-surface-gray p-1 rounded-xl">
             <button className="px-4 py-1.5 bg-white-pure shadow-sm rounded-lg text-xs font-bold text-brand-blue">7 Hari</button>
             <button className="px-4 py-1.5 text-xs font-bold text-text-gray hover:text-text-dark">30 Hari</button>
          </div>
        </div>
        <LeadsChart />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Leads Table */}
        <div className="lg:col-span-2 bg-white-pure rounded-[2rem] border border-border-line/40 shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-border-line/20 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-text-dark mb-1">Leads Terbaru</h2>
              <p className="text-xs font-medium text-text-gray">Prospek pembeli dari Chatbot & Inquiry Form</p>
            </div>
            <button className="text-sm font-bold text-brand-blue hover:text-brand-blue-deep flex items-center gap-1">
              Lihat Semua <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="flex-1 p-0 overflow-x-auto">
            {loading ? (
              <div className="p-10 flex flex-col items-center justify-center space-y-3">
                <div className="w-8 h-8 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin"></div>
                <p className="text-sm text-text-gray font-medium">Memuat data leads...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-surface-gray rounded-full flex items-center justify-center mx-auto mb-4 text-text-gray/50">
                  <Users size={32} />
                </div>
                <h3 className="text-base font-bold text-text-dark mb-1">Belum ada leads</h3>
                <p className="text-sm text-text-gray">Promosikan listing Anda untuk mendapatkan calon pembeli.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#F8F9FA] text-xs uppercase tracking-wider text-text-gray/70 font-bold border-b border-border-line/20">
                    <th className="p-4 pl-6 font-semibold">Nama Prospek</th>
                    <th className="p-4 font-semibold">Kontak</th>
                    <th className="p-4 font-semibold">Intent / Info</th>
                    <th className="p-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-line/10">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="font-bold text-text-dark text-sm">{lead.name || 'Anonymous'}</div>
                        <div className="text-xs text-text-gray mt-0.5">{new Date(lead.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'})}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-sm text-text-dark">{lead.phone || '-'}</div>
                        <div className="text-xs text-text-gray mt-0.5">{lead.email || '-'}</div>
                      </td>
                      <td className="p-4">
                        <div className="inline-flex py-1 px-2.5 rounded-md bg-surface-gray text-xs font-semibold text-text-dark">
                          {lead.intent || 'Umum'}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold bg-green-50 text-green-600 ring-1 ring-green-600/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                          Baru
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Actions & Tips */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-brand-blue to-brand-blue-deep rounded-[2rem] p-8 text-white-pure shadow-xl shadow-brand-blue/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white-pure/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-display font-semibold mb-2">Buat Konten Baru?</h3>
              <p className="text-white-pure/80 text-sm mb-6 leading-relaxed">
                Gunakan AI Content Studio untuk membuat caption Instagram promosi listing Anda dalam 5 detik.
              </p>
              <button className="w-full bg-white-pure text-brand-blue py-3 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                Coba AI Content Studio
              </button>
            </div>
          </div>

          <div className="bg-white-pure rounded-3xl p-6 border border-border-line/40 shadow-sm">
            <h3 className="font-bold text-text-dark mb-4 text-sm">Aktivitas Terakhir</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-surface-gray flex items-center justify-center flex-none">
                    <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-dark">Sistem berhasil memposting ke Instagram.</p>
                    <p className="text-xs text-text-gray mt-1">2 jam yang lalu</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
