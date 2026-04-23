'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { 
  Rocket, Shield, Zap, Target, 
  MapPin, Heart, Sparkles, Building2, 
  ChevronRight, ArrowRight, Star, 
  CheckCircle2, Users
} from 'lucide-react';
import Link from 'next/link';

export default function TentangPage() {
  return (
    <div className="bg-white-pure min-h-screen font-sans selection:bg-brand-blue/10 overflow-x-hidden">
      <Navbar />

      <main>
        {/* Background Decorative Mesh Gradients */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-brand-blue/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-brand-blue/5 rounded-full blur-[120px]"></div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-24">
          <div className="container-standard relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/50 backdrop-blur-md border border-blue-100/50 text-brand-blue text-[10px] font-semibold uppercase tracking-widest mb-8 animate-fade-in shadow-sm">
                  <Sparkles size={14} />
                  Masa Depan Properti Indonesia
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-text-dark tracking-tight leading-[1.1] mb-8">
                  Temukan Cara Baru <br />
                  <span className="text-brand-blue relative">
                    Bermarketing
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-blue/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0, 50 5 T 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                    </svg>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-text-gray leading-relaxed mb-12 max-w-xl font-medium">
                  NusaEstate adalah ekosistem digital revolusioner yang memberdayakan developer melalui AI Generatif dan Otomasi cerdas.
                </p>
                <div className="flex flex-wrap gap-5">
                  <Link href="/cari" className="bg-brand-blue text-white-pure px-10 py-5 rounded-2xl font-semibold hover:bg-brand-blue-hover transition-all shadow-premium active:scale-95 flex items-center gap-3 group">
                    Eksplorasi Properti <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="flex -space-x-4 items-center pl-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white-pure bg-surface-gray overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="pl-6 text-sm font-semibold text-text-dark">
                      <div className="flex items-center gap-1 text-yellow-500 mb-0.5">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                      </div>
                      150+ Developer Bergabung
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Hero Image */}
              <div className="relative group max-w-[500px] mx-auto lg:ml-auto">
                <div className="absolute -inset-4 bg-brand-blue/10 rounded-[3rem] blur-2xl group-hover:bg-brand-blue/20 transition-all duration-700"></div>
                <div className="relative aspect-[4/4] rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] bg-white-pure">
                  <img 
                    src="/images/about-hero.png" 
                    alt="AI Property Future" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-pure/40 via-transparent to-transparent"></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-10 right-10 backdrop-blur-xl bg-white/10 border border-white/20 p-4 rounded-3xl animate-bounce-slow shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white-pure">
                        <Zap size={20} />
                      </div>
                      <div className="text-white-pure">
                        <div className="text-[10px] font-semibold uppercase tracking-widest opacity-70">AI Efficiency</div>
                        <div className="text-lg font-bold">10x Faster</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-10 backdrop-blur-xl bg-black/30 border border-white/10 p-6 rounded-[2.5rem] max-w-[240px] shadow-2xl">
                     <div className="text-white-pure text-sm font-medium leading-loose italic">
                       "Transformasi digital tercepat yang pernah kami rasakan di industri ini."
                     </div>
                     <div className="mt-4 text-[10px] text-white/60 font-semibold uppercase tracking-widest tracking-widest">CEO @ Graha Indo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission with Glassmorphism */}
        <section className="py-12 relative overflow-hidden">
          <div className="container-standard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1 grid grid-cols-2 gap-6 relative">
                 <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-[60px]"></div>
                 
                 <div className="pt-12 space-y-6">
                    <div className="p-8 rounded-[2.5rem] bg-white-pure shadow-premium border border-border-line/40 hover:translate-y-px transition-all">
                       <Users className="text-brand-blue mb-4" size={32} />
                       <div className="text-3xl font-semibold text-text-dark">2,5k+</div>
                       <div className="text-[10px] text-text-gray font-semibold uppercase tracking-widest mt-1">Leads Generated</div>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-brand-blue shadow-premium text-white-pure border border-white/10">
                       <Shield className="mb-4" size={32} />
                       <div className="text-3xl font-semibold">100%</div>
                       <div className="text-[10px] text-white/70 font-semibold uppercase tracking-widest mt-1">Data Terpadu</div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="p-8 rounded-[2.5rem] bg-brand-blue text-white-pure shadow-premium border border-white/10">
                       <Zap className="mb-4" size={32} />
                       <div className="text-3xl font-semibold">Instant</div>
                       <div className="text-[10px] text-white/70 font-semibold uppercase tracking-widest mt-1">Caption AI</div>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-white-pure shadow-premium border border-border-line/40">
                       <Building2 className="text-brand-blue mb-4" size={32} />
                       <div className="text-3xl font-semibold">45+</div>
                       <div className="text-[10px] text-text-gray font-semibold uppercase tracking-widest mt-1">Perumahan Baru</div>
                    </div>
                 </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="w-16 h-1 w-brand-blue mb-8 rounded-full"></div>
                <h2 className="text-3xl md:text-5xl font-display font-semibold text-text-dark mb-8 leading-tight">Misi Berbasis Komunitas & Teknologi</h2>
                <p className="text-text-gray text-lg mb-10 leading-relaxed font-medium">
                  NusaEstate  tidak hanya membangun software, kami membangun jembatan antara developer daerah dengan pembeli impian mereka. Melalui kecerdasan buatan, kami mengotomatisasi kerumitan sehingga Anda bisa fokus pada apa yang terpenting: <span className="text-brand-blue">membangun hunian</span>.
                </p>
                <div className="space-y-6">
                  {[
                    { label: "Otomasi Konten Multi-Platform", icon: Sparkles },
                    { label: "Simulasi KPR Pintar Terintegrasi", icon: Target },
                    { label: "Manajemen Lead Tanpa Ribet", icon: CheckCircle2 }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-2xl bg-white-pure shadow-soft border border-border-line/30 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform duration-500">
                        <item.icon size={22} />
                      </div>
                      <span className="text-lg font-semibold text-text-dark">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Features Grid */}
        <section className="py-12 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-[600px] bg-gradient-to-b from-brand-blue/5 to-transparent -z-10"></div>
          <div className="container-standard text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-display font-semibold text-text-dark mb-6">Kenapa NusaEstate?</h2>
            <p className="text-text-gray text-lg max-w-2xl mx-auto font-medium">Satu platform, ribuan peluang. Dirancang untuk efisiensi maksimal.</p>
          </div>
          <div className="container-standard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  title: "AI Content Studio",
                  description: "Caption IG, TikTok & Facebook yang natural dan persuasif. Tidak perlu lagi bingung menulis konten setiap hari.",
                  icon: Sparkles,
                  color: "bg-purple-500"
                },
                {
                  title: "KPR Simulator Pintar",
                  description: "Bantu pembeli menghitung cicilan dengan akurat. Cek kelayakan KPR instan tanpa perlu ke bank.",
                  icon: Zap,
                  color: "bg-yellow-500"
                },
                {
                  title: "Dashboard Terpusat",
                  description: "Semua leads, postingan, dan analytics dalam satu layar. Minimalis, informatif, dan mudah dikelola.",
                  icon: Building2,
                  color: "bg-blue-500"
                }
              ].map((feature, i) => (
                <div key={i} className="group relative pt-12">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl group-hover:bg-brand-blue/20 transition-all"></div>
                  <div className="relative p-12 rounded-[4rem] bg-white-pure/60 backdrop-blur-xl border border-border-line/30 shadow-premium group-hover:-translate-y-2 transition-all duration-500 text-center">
                    <div className={`w-16 h-16 mx-auto rounded-3xl ${feature.color} flex items-center justify-center text-white-pure mb-10 shadow-lg shadow-brand-blue/20`}>
                      <feature.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-dark mb-6">{feature.title}</h3>
                    <p className="text-text-gray leading-relaxed font-medium">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Roots / Location Focused */}
        <section className="py-12 pb-10 relative overflow-hidden">
          <div className="container-standard">
            <div className="relative rounded-[5rem] overflow-hidden shadow-2xl bg-white-pure border border-border-line/40">
              <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[400px] lg:h-full overflow-hidden">
                  <img 
                    src="/images/local-roots.png" 
                    alt="Local Roots" 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-[2s]"
                  />
                  <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay"></div>
                </div>
                <div className="p-12 md:p-24 lg:p-32 flex flex-col justify-center bg-white-pure relative overflow-hidden">
                   <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-blue/5 rounded-full blur-[80px]"></div>
                   
                   <div className="relative z-10">
                     <div className="inline-flex items-center gap-2 text-brand-blue font-semibold text-[10px] uppercase tracking-widest mb-6">
                        <MapPin size={16} /> Berakar di Jawa Tengah
                     </div>
                     <h2 className="text-4xl md:text-5xl font-display font-semibold text-text-dark mb-8 leading-tight">Fokus Pada Kota <br /> Tier 2 & 3</h2>
                     <p className="text-text-gray text-lg mb-12 leading-relaxed font-medium">
                        Kami mengerti bahwa dinamika properti di Purwokerto, Cilacap, atau Banyumas berbeda dengan Jakarta. NusaEstate dirancang khusus untuk memahami karakteristik pasar lokal dan membantu developer di daerah berkembang pesat.
                     </p>
                     <div className="grid grid-cols-2 gap-10">
                        <div>
                           <div className="text-4xl font-semibold text-brand-blue mb-2">15.000+</div>
                           <div className="text-[10px] text-text-gray font-semibold uppercase tracking-widest tracking-widest">Developer Target Terdaftar</div>
                        </div>
                        <div>
                           <div className="text-4xl font-semibold text-brand-blue mb-2">Jateng</div>
                           <div className="text-[10px] text-text-gray font-semibold uppercase tracking-widest tracking-widest">Base Operasional</div>
                        </div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
           <div className="container-standard">
              <div className="bg-text-dark rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-[100px]"></div>
                 <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px]"></div>
                 
                 <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-display font-medium text-white-pure mb-8 leading-tight">
                       Siap Membangun Masa <br /> Depan Properti Bersama?
                    </h2>
                    <p className="text-white-pure/60 text-lg mb-12 font-medium">
                       Gabung dengan ratusan developer yang telah mentransformasi cara mereka bekerja.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                       <Link href="/register" className="bg-brand-blue text-white-pure px-12 py-5 rounded-2xl font-semibold hover:bg-brand-blue-hover transition-all active:scale-95 shadow-xl">
                          Mulai Gratis Sekarang
                       </Link>
                       <Link href="/cari" className="bg-white/10 backdrop-blur-md text-white-pure border border-white/20 px-12 py-5 rounded-2xl font-semibold hover:bg-white/20 transition-all active:scale-95">
                          Jelajahi Properti
                       </Link>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
      `}</style>
    </div>
  );
}
