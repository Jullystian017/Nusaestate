import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { 
  MapPin, BedDouble, Bath, Scaling, CheckCircle2, 
  Phone, CalendarHeart, Share2, Bookmark, Award,
  Zap, MessageSquare, ChevronRight, Star, Shield, TrendingUp,
  Box, Eye, Info, FileText, Layout, Navigation, HelpCircle,
  Home, TrainFront, School, Hospital, ShoppingBag, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { MOCK_PROPERTIES } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import MapContainer from '@/components/maps/MapContainer';

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

  // Related properties (excluding current)
  const relatedProperties = MOCK_PROPERTIES.filter(p => p.id !== id).slice(0, 3);

  return (
    <div className="bg-white-pure min-h-screen pt-24 font-sans selection:bg-brand-blue/10 relative">
      {/* Background Decorative Elements Wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px] -mr-96 -mt-96"></div>
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brand-blue/3 rounded-full blur-[100px] -ml-48"></div>
      </div>
      
      <Navbar />

      <main className="container-standard py-6 relative z-10">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 h-[500px] md:h-[650px] relative z-10">
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
           <div className="flex-col gap-4 h-full hidden md:flex">
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
                        <span className="text-white-pure font-semibold text-[10px] uppercase tracking-wider">Lihas Semua Foto</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* Property Identity Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="relative z-10 text-left">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="backdrop-blur-md bg-brand-blue/5 px-3 py-1 rounded-full border border-brand-blue/10 text-[9px] font-bold flex items-center gap-2 text-brand-blue uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                  {property.badge}
                </div>
                <span className="bg-surface-dim/30 text-text-gray/70 text-[9px] font-semibold px-3 py-1 rounded-full border border-border-line/20 uppercase tracking-widest">SHM Sertifikat</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-display font-medium text-text-dark tracking-tight mb-3 leading-tight">
                {property.name}
              </h1>
              <div className="flex items-center gap-2 text-text-gray">
                <div className="p-1.5 bg-brand-blue/5 rounded-lg text-brand-blue">
                   <MapPin size={16} />
                </div>
                <span className="text-sm md:text-base font-medium tracking-tight opacity-80">{property.location}</span>
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
          <div className="flex-1 space-y-10">
            
            {/* Specs Highlight Dashboard - Refined Size */}
            <div className="relative p-[1px] rounded-[2rem] bg-gradient-to-br from-brand-blue/15 via-white-pure/5 to-transparent shadow-xl">
              <div className="bg-white-pure/80 backdrop-blur-2xl p-6 md:p-8 rounded-[2rem] flex flex-wrap justify-between items-center text-text-dark relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-30"></div>
                 
                 <div className="flex flex-col items-center gap-1 flex-1 min-w-[120px] border-r border-border-line/40 last:border-0 py-2 transition-transform hover:scale-105">
                   <div className="p-2.5 bg-brand-blue/10 rounded-xl mb-1 text-brand-blue">
                     <BedDouble size={20} />
                   </div>
                   <div className="text-[9px] text-text-gray font-semibold uppercase tracking-widest opacity-60">Kamar Tidur</div>
                   <div className="text-lg font-display font-medium text-text-dark">{property.specs.beds} Unit</div>
                 </div>
                 
                 <div className="flex flex-col items-center gap-1 flex-1 min-w-[120px] border-r border-border-line/40 last:border-0 py-2 transition-transform hover:scale-105">
                   <div className="p-2.5 bg-brand-blue/10 rounded-xl mb-1 text-brand-blue">
                     <Bath size={20} />
                   </div>
                   <div className="text-[9px] text-text-gray font-semibold uppercase tracking-widest opacity-60">Kamar Mandi</div>
                   <div className="text-lg font-display font-medium text-text-dark">{property.specs.baths} Unit</div>
                 </div>
                 
                 <div className="flex flex-col items-center gap-1 flex-1 min-w-[120px] py-2 transition-transform hover:scale-105">
                   <div className="p-2.5 bg-brand-blue/10 rounded-xl mb-1 text-brand-blue">
                     <Scaling size={20} />
                   </div>
                   <div className="text-[9px] text-text-gray font-semibold uppercase tracking-widest opacity-60">Luas Tanah</div>
                   <div className="text-lg font-display font-medium text-text-dark">{property.specs.size} m²</div>
                 </div>
              </div>
            </div>

            {/* Overview Section - New */}
            <div className="bg-surface-gray/30 rounded-3xl p-6 border border-border-line/30">
              <h2 className="text-lg font-display font-semibold text-text-dark mb-5 flex items-center gap-3">
                <Info size={18} className="text-brand-blue" /> Ringkasan Properti
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                {[
                  { label: 'Sertifikat', value: 'SHM - Milik Adat' },
                  { label: 'Hadap', value: 'Selatan' },
                  { label: 'Daya Listrik', value: '2200 VA' },
                  { label: 'Sumber Air', value: 'PDAM & Sumur' },
                  { label: 'Tahun Bangun', value: '2024' },
                  { label: 'Kondisi', value: 'Baru (Gres)' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-[10px] text-text-gray uppercase tracking-widest font-semibold mb-1">{item.label}</div>
                    <div className="text-sm font-medium text-text-dark">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-brand-blue rounded-full"></div>
                <h2 className="text-xl font-display font-semibold text-text-dark">Deskripsi Lengkap</h2>
              </div>
              <div className="text-text-gray leading-relaxed text-sm md:text-base font-light max-w-4xl space-y-4">
                <p>
                  {property.description || 'Properti eksklusif yang dirancang untuk kenyamanan keluarga Anda. Terletak di lokasi yang sangat strategis dengan akses mudah ke fasilitas publik utama.'}
                </p>
                <p>
                  Setiap sudut ruangan dirancang dengan material berkualitas tinggi, memastikan estetika modern bertemu dengan ketahanan jangka panjang. Dengan pencahayaan alami yang melimpah dan sirkulasi udara yang optimal, hunian ini menawarkan harmoni sempurna bagi gaya hidup perkotaan yang dinamis.
                </p>
              </div>
            </div>

            {/* Information House / Technical Detail */}
            <div>
              <h2 className="text-lg font-display font-semibold text-text-dark mb-5 flex items-center gap-3">
                <FileText size={18} className="text-brand-blue" /> Spesifikasi Teknis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Pondasi', value: 'Batu Kali & Beton Bertulang' },
                  { label: 'Dinding', value: 'Bata Merah, Plester, Aci' },
                  { label: 'Lantai Utama', value: 'Granit Tile 60x60' },
                  { label: 'Atap', value: 'Baja Ringan & Genteng Flat' },
                  { label: 'Kusen', value: 'Aluminium Powder Coated' },
                  { label: 'Sanitasi', value: 'Toto / American Standard' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-xl border border-border-line/30 bg-white-pure shadow-sm hover:shadow-md transition-all">
                    <span className="text-xs text-text-gray font-medium">{item.label}</span>
                    <span className="text-xs text-text-dark font-semibold text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div>
              <h2 className="text-lg font-display font-semibold text-text-dark mb-5 flex items-center gap-3">
                <Shield size={18} className="text-brand-blue" /> Fasilitas Premium
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(property.features || ['Keamanan 24 Jam', 'Area Taman', 'Smart Gateway', 'Internet Dedicated']).map((feat) => (
                    <div key={feat} className="flex flex-col gap-2 bg-surface-dim/30 p-4 rounded-xl border border-border-line/20 hover:border-brand-blue/30 transition-all group">
                      <CheckCircle2 size={18} className="text-brand-blue/40 group-hover:text-brand-blue transition-colors" />
                      <span className="text-[11px] text-text-dark font-medium leading-tight">{feat}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Property Location & Interactive Map */}
            <div className="space-y-4">
                <h2 className="text-lg font-display font-semibold text-text-dark flex items-center gap-3">
                  <MapPin size={18} className="text-brand-blue" /> Lokasi Properti
                </h2>
                <div className="relative w-full h-[350px] rounded-[2rem] overflow-hidden border border-border-line/50 shadow-premium bg-surface-dim">
                  <MapContainer properties={[property]} />
                  <div className="absolute top-4 left-4 z-[400] bg-white-pure/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/20 text-[10px] font-semibold text-brand-blue flex items-center gap-2">
                    <Navigation size={12} fill="currentColor" /> {property.location}
                  </div>
                </div>
            </div>

            {/* Nearest Facilities Section - New */}
            <div>
              <h2 className="text-lg font-display font-semibold text-text-dark mb-5 flex items-center gap-3">
                <Navigation size={18} className="text-brand-blue" /> Fasilitas Sekitar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Transport & Education */}
                <div className="space-y-4">
                  <div className="bg-white-pure p-4 rounded-2xl border border-border-line/30 shadow-sm">
                    <div className="flex items-center gap-2 text-brand-blue mb-3">
                      <TrainFront size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Transportasi</span>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex justify-between text-xs"><span className="text-text-gray">Stasiun Kereta Utama</span> <span className="font-semibold text-text-dark">15 Menit</span></li>
                      <li className="flex justify-between text-xs"><span className="text-text-gray">Gerbang Tol Terdekat</span> <span className="font-semibold text-text-dark">8 Menit</span></li>
                    </ul>
                  </div>
                  <div className="bg-white-pure p-4 rounded-2xl border border-border-line/30 shadow-sm">
                    <div className="flex items-center gap-2 text-brand-blue mb-3">
                      <School size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Pendidikan</span>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex justify-between text-xs"><span className="text-text-gray">SD Negeri Favorit</span> <span className="font-semibold text-text-dark">5 Menit</span></li>
                      <li className="flex justify-between text-xs"><span className="text-text-gray">Universitas Negeri</span> <span className="font-semibold text-text-dark">12 Menit</span></li>
                    </ul>
                  </div>
                </div>

                {/* Health & Commercial */}
                <div className="space-y-4">
                  <div className="bg-white-pure p-4 rounded-2xl border border-border-line/30 shadow-sm">
                    <div className="flex items-center gap-2 text-brand-blue mb-3">
                      <Hospital size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Kesehatan</span>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex justify-between text-xs"><span className="text-text-gray">Rumah Sakit Umum</span> <span className="font-semibold text-text-dark">10 Menit</span></li>
                      <li className="flex justify-between text-xs"><span className="text-text-gray">Apotek 24 Jam</span> <span className="font-semibold text-text-dark">3 Menit</span></li>
                    </ul>
                  </div>
                  <div className="bg-white-pure p-4 rounded-2xl border border-border-line/30 shadow-sm">
                    <div className="flex items-center gap-2 text-brand-blue mb-3">
                      <ShoppingBag size={16} /> <span className="text-xs font-bold uppercase tracking-wider">Pusat Belanja</span>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex justify-between text-xs"><span className="text-text-gray">Mall & Lifestyle Center</span> <span className="font-semibold text-text-dark">10 Menit</span></li>
                      <li className="flex justify-between text-xs"><span className="text-text-gray">Pasar Tradisional</span> <span className="font-semibold text-text-dark">5 Menit</span></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Buying Guide Section - Based on Proposal */}
            <div className="bg-gradient-to-br from-brand-blue/5 to-white-pure border border-brand-blue/10 p-8 rounded-[2.5rem] relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="text-xl font-display font-semibold text-text-dark mb-2 flex items-center gap-3">
                   <HelpCircle size={20} className="text-brand-blue" /> Panduan Pembelian Properti
                 </h2>
                 <p className="text-xs text-text-gray mb-8">Langkah cerdas mewujudkan rumah impian Anda di PropNest AI.</p>
                 
                 <div className="space-y-6 relative ml-4 border-l-2 border-brand-blue/10 pl-8">
                    {[
                      { title: 'Survei & Konsultasi', desc: 'Jadwalkan kunjungan unit dan konsultasi gratis dengan agen ahli kami untuk mengenal lingkungan lebih dekat.' },
                      { title: 'Booking & Administrasi', desc: 'Amankan unit pilihan Anda dengan booking fee yang transparan dan pengumpulan berkas identitas awal.' },
                      { title: 'Verifikasi & Pengajuan KPR', desc: 'Sistem AI kami akan membantu memverifikasi kelayakan bank dan mempercepat proses appraisal dokumen.' },
                      { title: 'Akad & Penyerahan Kunci', desc: 'Proses penandatanganan AJB/Akad Kredit dengan pendampingan notaris hingga unit siap serah terima.' },
                    ].map((step, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-white-pure border-2 border-brand-blue flex items-center justify-center text-[10px] font-bold text-brand-blue group-hover:scale-125 transition-transform">
                          {idx + 1}
                        </div>
                        <h4 className="text-sm font-semibold text-text-dark mb-1">{step.title}</h4>
                        <p className="text-xs text-text-gray leading-relaxed pr-4 opacity-70">{step.desc}</p>
                      </div>
                    ))}
                 </div>
               </div>
            </div>

          </div>

          {/* Right Column (Sticky Sidebar) - Refined Scaling */}
          <aside className="w-full lg:w-[380px] shrink-0">
             <div className="bg-white-pure rounded-[2.5rem] border border-border-line/40 p-6 shadow-premium sticky top-24 ring-1 ring-border-line/20">
               
               <div className="mb-6 p-6 bg-[#F8F9FD] rounded-[2rem] border border-brand-blue/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700"></div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-text-gray/50 mb-2">Harga Jual Properti</div>
                  <div className="text-3xl font-display font-medium text-text-dark tracking-tight">{property.price}</div>
                  <div className="flex items-center gap-2 mt-4 text-brand-blue font-semibold text-[9px] uppercase tracking-wider bg-brand-blue/5 py-1 px-2.5 rounded-lg w-fit">
                    <TrendingUp size={10} /> <span>Value Trend +2.4%</span>
                  </div>
                </div>

               {/* Smart Reminder Widget */}
               <div className="bg-brand-blue/5 border border-brand-blue/10 text-brand-blue p-4 rounded-xl flex items-start gap-3 mb-6">
                 <div className="bg-white-pure p-1.5 rounded-lg shadow-sm">
                   <Zap size={16} fill="currentColor" />
                 </div>
                 <div>
                   <div className="text-xs font-bold leading-tight uppercase tracking-wide">High Demand Area!</div>
                   <div className="text-[10px] text-brand-blue/70 mt-1 leading-normal">Rumah di area ini populer, terjual dalam rata-rata 25 hari.</div>
                 </div>
               </div>

               <div className="space-y-3 mb-8">
                 <button className="w-full bg-brand-blue text-white-pure py-4 rounded-xl font-semibold text-sm shadow-xl hover:bg-brand-blue-deep hover:shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95">
                   <MessageSquare size={18} /> Hubungi Agen
                 </button>
                 <button className="w-full bg-white-pure border-2 border-brand-blue text-brand-blue hover:bg-blue-50 py-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-3 active:scale-95">
                   <CalendarHeart size={18} /> Atur Jadwal Survei
                 </button>
               </div>

               {/* Verified Agent Badge */}
               <div className="bg-white-pure border border-border-line/40 p-4 rounded-2xl flex items-center gap-4 hover:bg-surface-gray transition-colors group">
                 <div className="relative">
                   <div className="w-12 h-12 rounded-xl bg-cover bg-center shadow-md grow-0 shrink-0 border border-white-pure group-hover:scale-110 transition-transform duration-300" style={{ backgroundImage: `url('${property.agent?.avatar || 'https://ui-avatars.com/api/?name=Agent+PropNest&background=random'}')`}}></div>
                   <div className="absolute -bottom-1 -right-1 bg-green-500 text-white-pure p-1 rounded-full border-2 border-white-pure">
                     <Shield size={8} fill="currentColor" />
                   </div>
                 </div>
                 <div>
                   <div className="font-semibold text-text-dark text-sm tracking-tight">{property.agent?.name || 'Agen PropNest Resmi'}</div>
                   <div className="text-[9px] text-text-gray font-black uppercase tracking-widest mt-0.5">{property.agent?.type || 'Senior Consultant'}</div>
                 </div>
               </div>

             </div>
          </aside>

        </div>

        {/* Other Properties Section - Bottom */}
        <section className="mt-24 pt-20 border-t border-border-line/40">
           <div className="flex items-center justify-between mb-10">
              <div>
                 <p className="text-brand-blue text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Rekomendasi</p>
                 <h2 className="text-3xl font-display font-medium text-text-dark">Properti Serupa Lainnya</h2>
              </div>
              <Link href="/cari" className="flex items-center gap-2 text-xs font-semibold text-text-dark hover:text-brand-blue transition-colors group">
                 Lihat Semua <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {relatedProperties.map((item) => (
                <Link
                  key={item.id}
                  href={`/properti/${item.id}`}
                  className="group relative flex flex-col transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image Area */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-soft group-hover:shadow-md transition-all duration-700">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-[3s]" style={{ backgroundImage: `url(${item.image})` }}></div>
                    <div className="absolute top-4 left-4 backdrop-blur-md bg-white-pure/90 px-3 py-1.5 rounded-full shadow-premium border border-white/20 text-[10px] font-semibold flex items-center gap-2 text-brand-blue">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
                      {item.badge}
                    </div>
                  </div>

                  {/* Floating Content Box */}
                  <div className="relative -mt-10 mx-3 bg-white-pure rounded-xl p-4 shadow-premium border border-border-line/20 group-hover:border-brand-blue/30 transition-all duration-500 z-10">
                    <h3 className="text-[15px] font-semibold text-text-dark truncate mb-1 pr-2">{item.name}</h3>
                    <p className="flex items-center gap-1.5 text-[10px] text-text-gray font-medium">
                      <MapPin size={12} className="text-brand-blue" />
                      <span className="truncate">{item.location}</span>
                    </p>
                    <div className="my-3 border-t border-border-line/20"></div>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-bold text-text-dark">{item.price}</p>
                      <div className="flex gap-3 text-[10px] text-text-gray font-medium">
                        <span className="flex items-center gap-1"><BedDouble size={14} className="text-brand-blue/60" /> {item.specs.beds}</span>
                        <span className="flex items-center gap-1"><Bath size={14} className="text-brand-blue/60" /> {item.specs.baths}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
           </div>
        </section>

      </main>
      
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
