import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { 
  MapPin, BedDouble, Bath, Scaling, CheckCircle2, 
  Phone, CalendarHeart, Share2, Bookmark, Award,
  Zap, MessageSquare, ChevronRight, Star, Shield, TrendingUp,
  Box, Eye
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_PROPERTIES } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default async function DetailPropertiPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const property = MOCK_PROPERTIES.find(p => p.id === id);

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-white-pure min-h-screen pt-24 font-sans selection:bg-brand-blue/10 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px] -mr-96 -mt-96 z-0"></div>
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brand-blue/3 rounded-full blur-[100px] -ml-48 z-0"></div>
      
      <Navbar />

      <main className="container-standard py-6">
        {/* Navigation & Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-text-gray/60 font-medium">
            <Link href="/" className="hover:text-brand-blue transition-colors">Beranda</Link>
            <ChevronRight size={10} />
            <Link href="/cari" className="hover:text-brand-blue transition-colors">Properti</Link>
            <ChevronRight size={10} />
            <span className="text-text-dark font-semibold">{property.location.split(',')[0]}</span>
          </div>
        </div>

        {/* Custom Bento Gallery - 1 Large, 1 Medium, 2 Small */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 h-[500px] md:h-[650px] relative z-10">
           {/* Left: Large vertical */}
           <div className="relative rounded-[2.5rem] overflow-hidden group h-full shadow-2xl border border-white-pure/20">
             <div className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-[5s] ease-out" style={{ backgroundImage: `url('${property.image}')` }}></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black-pure/30 to-transparent"></div>
             
             {/* Virtual Tour Floating Button */}
             <button className="absolute bottom-8 left-8 flex items-center gap-3 bg-white-pure/10 backdrop-blur-xl border border-white-pure/30 px-6 py-3 rounded-2xl text-white-pure text-sm font-semibold hover:bg-white-pure/20 transition-all shadow-xl group/btn">
                <div className="p-1.5 bg-brand-blue rounded-lg shadow-blue-glow group-hover/btn:scale-110 transition-transform">
                  <Box size={16} />
                </div>
                Virtual Tour 360°
             </button>
           </div>
           
           {/* Right side wrap */}
           <div className="flex flex-col gap-4 h-full">
             {/* Top right: Medium horizontal */}
             <div className="relative rounded-[2rem] overflow-hidden group h-[60%] shadow-lg border border-white-pure/20">
               <div className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-[5s] ease-out" style={{ backgroundImage: `url('${property.gallery?.[0] || property.image}')` }}></div>
             </div>
             
             {/* Bottom right: 2 Small images */}
             <div className="flex gap-4 h-[40%]">
               <div className="relative rounded-[1.5rem] overflow-hidden group flex-1 shadow-lg border border-white-pure/20">
                 <div className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-[5s] ease-out" style={{ backgroundImage: `url('${property.gallery?.[1] || property.image}')` }}></div>
               </div>
               <div className="relative rounded-[1.5rem] overflow-hidden group flex-1 shadow-lg border border-white-pure/20">
                 <div className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-[5s] ease-out" style={{ backgroundImage: `url('${property.gallery?.[2] || property.image}')` }}></div>
                 
                 {/* See all photos overlay */}
                 <div className="absolute inset-0 bg-black-pure/40 backdrop-blur-[1px] flex items-center justify-center cursor-pointer hover:bg-black-pure/60 transition-all duration-500">
                   <div className="text-center group-hover:scale-110 transition-transform flex flex-col items-center">
                     <div className="bg-white-pure/20 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-white-pure/30">
                        <Eye size={14} className="text-white-pure" />
                        <span className="text-white-pure font-semibold text-[10px] uppercase tracking-wider">See all 10 photos</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* Property Identity Header */}
        <div className="mt-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="relative z-10 text-left">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="backdrop-blur-md bg-brand-blue/5 px-3 py-1 rounded-full border border-brand-blue/10 text-[9px] font-bold flex items-center gap-2 text-brand-blue uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                  {property.badge}
                </div>
                <span className="bg-surface-dim/30 text-text-gray/70 text-[9px] font-semibold px-3 py-1 rounded-full border border-border-line/20 uppercase tracking-widest">SHM Sertifikat</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-display font-medium text-text-dark tracking-tight mb-3 leading-tight">
                {property.name}
              </h1>
              <div className="flex items-center gap-2 text-text-gray">
                <div className="p-1.5 bg-brand-blue/5 rounded-lg text-brand-blue">
                   <MapPin size={16} />
                </div>
                <span className="text-base md:text-lg font-medium tracking-tight opacity-80">{property.location}</span>
              </div>
            </div>

            <div className="flex gap-2.5 relative z-10">
               <button className="flex items-center gap-2 px-5 py-3 bg-white-pure border border-border-line/60 rounded-xl text-xs font-medium text-text-dark hover:bg-surface-gray transition-all shadow-sm active:scale-95 ring-1 ring-border-line/5">
                 <Share2 size={16} className="text-brand-blue" /> Bagikan
               </button>
               <button className="flex items-center gap-2 px-5 py-3 bg-white-pure border border-border-line/60 rounded-xl text-xs font-semibold text-text-dark hover:bg-blue-50 hover:text-brand-blue hover:border-brand-blue/30 transition-all shadow-sm active:scale-95 ring-1 ring-border-line/5">
                 <Bookmark size={16} /> Simpan
               </button>
            </div>
          </div>
        </div>

        {/* Two Column Content */}
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Column (Main) */}
          <div className="flex-1 space-y-12">
            
            {/* Specs Highlight Dashboard - Refined Size */}
            <div className="relative p-[1px] rounded-[2rem] bg-gradient-to-br from-brand-blue/15 via-white-pure/5 to-transparent shadow-xl">
              <div className="bg-white-pure/80 backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] flex flex-wrap justify-between items-center text-text-dark relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-30"></div>
                 
                 <div className="flex flex-col items-center gap-1 flex-1 min-w-[120px] border-r border-border-line/40 last:border-0 py-2 transition-transform hover:scale-105">
                   <div className="p-2.5 bg-brand-blue/10 rounded-xl mb-1 text-brand-blue">
                     <BedDouble size={22} />
                   </div>
                   <div className="text-[9px] text-text-gray font-semibold uppercase tracking-widest opacity-60">Kamar Tidur</div>
                   <div className="text-xl font-display font-medium">{property.specs.beds} Unit</div>
                 </div>
                 
                 <div className="flex flex-col items-center gap-1 flex-1 min-w-[120px] border-r border-border-line/40 last:border-0 py-2 transition-transform hover:scale-105">
                   <div className="p-2.5 bg-brand-blue/10 rounded-xl mb-1 text-brand-blue">
                     <Bath size={22} />
                   </div>
                   <div className="text-[9px] text-text-gray font-semibold uppercase tracking-widest opacity-60">Kamar Mandi</div>
                   <div className="text-xl font-display font-medium">{property.specs.baths} Unit</div>
                 </div>
                 
                 <div className="flex flex-col items-center gap-1 flex-1 min-w-[120px] py-2 transition-transform hover:scale-105">
                   <div className="p-2.5 bg-brand-blue/10 rounded-xl mb-1 text-brand-blue">
                     <Scaling size={22} />
                   </div>
                   <div className="text-[9px] text-text-gray font-semibold uppercase tracking-widest opacity-60">Luas Tanah</div>
                   <div className="text-xl font-display font-medium">{property.specs.size} m²</div>
                 </div>
              </div>
            </div>

            {/* Description Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-10 bg-brand-blue rounded-full"></div>
                <h2 className="text-3xl font-display font-medium text-text-dark">Tentang Properti Ini</h2>
              </div>
              <div className="text-text-gray leading-relaxed text-lg font-light max-w-3xl">
                {property.description || 'Properti eksklusif yang dirancang untuk kenyamanan keluarga Anda. Terletak di lokasi yang sangat strategis dengan akses mudah ke fasilitas publik utama.'}
              </div>
            </div>

            {/* Features Section */}
            <div>
              <h2 className="text-xl font-display font-semibold text-text-dark mb-6 flex items-center gap-3">
                <Shield size={20} className="text-brand-blue" /> Fasilitas Premium
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(property.features || ['Keamanan 24 Jam', 'Area Taman', 'Smart Gateway', 'Internet Dedicated']).map((feat) => (
                    <div key={feat} className="flex flex-col gap-3 bg-surface-dim/30 p-5 rounded-2xl border border-border-line/20 hover:border-brand-blue/30 transition-all group">
                      <CheckCircle2 size={24} className="text-brand-blue/40 group-hover:text-brand-blue transition-colors" />
                      <span className="text-sm text-text-dark font-medium leading-tight">{feat}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Mini Mortgage Calculator */}
            <div className="bg-gradient-to-br from-brand-blue/5 via-white-pure to-transparent p-10 rounded-[40px] border border-brand-blue/10 relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="text-2xl font-display font-semibold text-text-dark mb-2">Simulasi Cicilan KPR</h2>
                 <p className="text-text-gray mb-8 text-sm">Wujudkan hunian impian Anda dengan skema pembayaran yang fleksibel.</p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                   <div className="space-y-2">
                     <label className="text-[10px] font-semibold uppercase tracking-widest text-text-gray">Uang Muka (DP)</label>
                     <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dark font-semibold text-sm">Rp</span>
                        <input type="text" className="w-full bg-white-pure border-2 border-border-line/40 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-blue shadow-sm group-hover:border-border-line transition-all" defaultValue="150.000.000" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-semibold uppercase tracking-widest text-text-gray">Tenor (Tahun)</label>
                     <select className="w-full bg-white-pure border-2 border-border-line/40 rounded-2xl py-4 px-4 focus:outline-none focus:border-brand-blue shadow-sm appearance-none font-semibold text-text-dark" defaultValue="15">
                       <option value="10">10 Tahun</option>
                       <option value="15">15 Tahun</option>
                       <option value="20">20 Tahun</option>
                     </select>
                   </div>
                 </div>
                 
                 <div className="flex items-center justify-between bg-white-pure/60 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-premium">
                    <div>
                      <div className="text-[10px] text-text-gray font-black uppercase tracking-widest mb-1">Estimasi Cicilan Ke-1</div>
                      <div className="text-3xl font-black text-brand-blue font-display">{property.price.includes('Miliar') ? 'Rp 8.450.000' : 'Rp 3.120.000'}<span className="text-sm font-semibold text-text-gray/50 ml-1">/ bulan</span></div>
                    </div>
                    <Link href="#" className="bg-brand-blue text-white-pure font-semibold text-xs px-6 py-3 rounded-xl hover:bg-brand-blue-deep transition-all shadow-md hover:shadow-lg active:scale-95">
                      Lihat Detail
                    </Link>
                 </div>
               </div>
            </div>

          </div>

          {/* Right Column (Sticky Sidebar) */}
          <aside className="w-full lg:w-[420px] shrink-0">
             <div className="bg-white-pure rounded-[40px] border border-border-line/40 p-8 shadow-premium sticky top-28 ring-1 ring-border-line/20">
               
               <div className="mb-8 p-8 bg-[#F8F9FD] rounded-[2.5rem] border border-brand-blue/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700"></div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-text-gray/50 mb-2">Harga Jual</div>
                  <div className="text-4xl font-display font-medium text-text-dark tracking-tight">{property.price}</div>
                  <div className="flex items-center gap-2 mt-4 text-brand-blue font-semibold text-[10px] uppercase tracking-wider bg-brand-blue/5 py-1.5 px-3 rounded-lg w-fit">
                    <TrendingUp size={12} /> <span>Value Trend +2.4%</span>
                  </div>
                </div>

               {/* Smart Reminder Widget */}
               <div className="bg-brand-blue/5 border border-brand-blue/10 text-brand-blue p-5 rounded-2xl flex items-start gap-3 mb-8">
                 <div className="bg-white-pure p-2 rounded-lg shadow-sm">
                   <Zap size={18} fill="currentColor" />
                 </div>
                 <div>
                   <div className="text-sm font-semibold leading-tight">High Demand Area!</div>
                   <div className="text-xs text-brand-blue/70 mt-1">Rumah di area ini populer, terjual dalam rata-rata 25 hari.</div>
                 </div>
               </div>

               <div className="space-y-4 mb-10">
                 <button className="w-full bg-brand-blue text-white-pure py-5 rounded-2xl font-semibold text-base shadow-xl hover:bg-brand-blue-deep hover:shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95">
                   <MessageSquare size={20} /> Hubungi Agen
                 </button>
                 <button className="w-full bg-white-pure border-2 border-brand-blue text-brand-blue hover:bg-blue-50 py-5 rounded-2xl font-semibold text-base transition-all flex items-center justify-center gap-3 active:scale-95">
                   <CalendarHeart size={20} /> Jadwalkan Kunjungan
                 </button>
               </div>

               {/* Verified Agent Badge */}
               <div className="bg-white-pure border border-border-line/40 p-5 rounded-3xl flex items-center gap-5 hover:bg-surface-gray transition-colors group">
                 <div className="relative">
                   <div className="w-14 h-14 rounded-2xl bg-cover bg-center shadow-md grow-0 shrink-0 border border-white-pure group-hover:scale-110 transition-transform duration-300" style={{ backgroundImage: `url('${property.agent?.avatar || 'https://ui-avatars.com/api/?name=Agent+PropNest&background=random'}')`}}></div>
                   <div className="absolute -bottom-1 -right-1 bg-green-500 text-white-pure p-1 rounded-full border-2 border-white-pure">
                     <Shield size={10} fill="currentColor" />
                   </div>
                 </div>
                 <div>
                   <div className="font-semibold text-text-dark text-base tracking-tight">{property.agent?.name || 'Agen PropNest Resmi'}</div>
                   <div className="text-[10px] text-text-gray font-black uppercase tracking-widest mt-0.5">{property.agent?.type || 'Senior Consultant'}</div>
                 </div>
               </div>

             </div>
          </aside>

        </div>
      </main>
      
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
