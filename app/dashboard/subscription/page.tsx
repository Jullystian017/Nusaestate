'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { 
  Check, 
  Zap, 
  Crown, 
  CreditCard, 
  AlertCircle, 
  Calendar,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const PLANS = [
  {
    id: 'basic',
    name: 'Free Starter',
    price: '0',
    description: 'Cocok untuk developer individu yang baru memulai.',
    features: [
      'Hingga 5 Listing Properti',
      'AI Caption Generator (Basic)',
      'CRM Leads Basic',
      'KPR Simulator (Embed)',
      'Support via Email'
    ],
    color: 'text-text-gray',
    bg: 'bg-white-pure',
    border: 'border-border-line/10',
    button: 'bg-surface-gray text-text-dark hover:bg-border-line/20',
    icon: Building2
  },
  {
    id: 'pro',
    name: 'Pro Developer',
    price: '299rb',
    period: '/bulan',
    description: 'Pilihan terbaik untuk pengembang properti aktif.',
    features: [
      'Hingga 20 Listing Properti',
      'AI Caption Semua Platform',
      'Auto Posting IG, FB, TikTok',
      'CRM Leads Full Pipeline',
      'Laporan Otomatis Mingguan',
      'Manajemen Tim (2 User)',
      'Support WA Business'
    ],
    color: 'text-brand-blue',
    bg: 'bg-white-pure',
    border: 'border-brand-blue/20 ring-4 ring-brand-blue/5',
    button: 'bg-brand-blue text-white-pure hover:bg-brand-blue-deep shadow-lg shadow-brand-blue/20',
    icon: Zap,
    popular: true
  },
  {
    id: 'premium',
    name: 'Enterprise AI',
    price: '1.99jt',
    period: '/bulan',
    description: 'Solusi lengkap untuk perusahaan real estate besar.',
    features: [
      'Listing Properti Unlimited',
      'Auto Posting Semua Platform + WA',
      'CRM Leads + Advanced Analytics',
      'KPR Simulator Custom Branded',
      'A/B Testing Caption',
      'Laporan Harian & Bulanan',
      'Manajemen Tim (5 User)',
      'Dedicated WA Support'
    ],
    color: 'text-purple-600',
    bg: 'bg-white-pure',
    border: 'border-purple-200',
    button: 'bg-purple-600 text-white-pure hover:bg-purple-700 shadow-lg shadow-purple-600/20',
    icon: Crown
  }
];

export default function SubscriptionPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, startUpdateTransition] = useTransition();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    }
    loadProfile();
  }, [supabase]);

  const handleUpgrade = async (planId: string) => {
    if (planId === profile?.subscription_plan) return;

    startUpdateTransition(async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ 
          subscription_plan: planId,
          subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
        })
        .eq('id', user.id);

      if (!error) {
        setProfile((prev: any) => ({ ...prev, subscription_plan: planId }));
        // Normally redirect to payment, but for now we just update
        alert(`Berhasil upgrade ke paket ${planId.toUpperCase()}!`);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60rem]">
        <div className="w-12 h-12 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Current Plan Hero */}
      <div className="bg-white-pure rounded-[3rem] border border-border-line/10 p-10 shadow-xl shadow-brand-blue/5 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-brand-blue/10 text-brand-blue px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-brand-blue/10">
                Paket Anda Saat Ini
              </div>
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full text-[10px] font-bold border border-emerald-100">
                <ShieldCheck size={14} />
                AKTIF
              </div>
            </div>
            <h2 className="text-4xl font-display font-bold text-text-dark">
              {PLANS.find(p => p.id === profile?.subscription_plan)?.name || 'Free Starter'}
            </h2>
            <p className="text-text-gray max-w-lg leading-relaxed">
              Anda memiliki akses ke fitur-fitur dasar pemasaran NusaEstate AI. Tingkatkan paket Anda untuk membuka potensi penuh otomasi AI.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-gray flex items-center justify-center text-text-gray">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-gray uppercase tracking-wider">Perpanjangan Berikutnya</p>
                  <p className="text-sm font-bold text-text-dark">
                    {profile?.subscription_expires_at 
                      ? new Date(profile.subscription_expires_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-gray flex items-center justify-center text-text-gray">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-gray uppercase tracking-wider">Metode Pembayaran</p>
                  <p className="text-sm font-bold text-text-dark">Transfer Bank / E-Wallet</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-brand-blue rounded-3xl p-8 text-white-pure shadow-2xl shadow-brand-blue/30 md:w-80">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-white/80" />
              <p className="text-sm font-bold uppercase tracking-widest opacity-80">Limit Penggunaan</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Listing Properti</span>
                  <span>1 / {profile?.subscription_plan === 'basic' ? '5' : profile?.subscription_plan === 'pro' ? '20' : '∞'}</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/5 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>AI Generation</span>
                  <span>12 / 50</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/4 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-display font-bold text-text-dark">Pilih Paket Langganan</h2>
          <p className="text-text-gray max-w-2xl mx-auto">Tingkatkan efisiensi pemasaran Anda dengan fitur otomasi AI tercanggih di industri properti.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={`${plan.bg} p-8 rounded-[3rem] border ${plan.border} flex flex-col relative transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white-pure px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-blue/30">
                  Paling Populer
                </div>
              )}

              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl ${plan.bg} ${plan.color} flex items-center justify-center mb-6 shadow-xl shadow-current/5 border border-current/10`}>
                  <plan.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-text-dark">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-sm font-medium text-text-gray">Rp</span>
                  <span className="text-4xl font-display font-bold text-text-dark tracking-tight">{plan.price}</span>
                  <span className="text-sm font-medium text-text-gray">{plan.period}</span>
                </div>
                <p className="text-text-gray text-xs mt-4 leading-relaxed">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.id === 'basic' ? 'bg-surface-gray text-text-gray' : plan.color + ' bg-current/5 border border-current/10'}`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-xs font-medium text-text-dark/80">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleUpgrade(plan.id)}
                disabled={isUpdating || profile?.subscription_plan === plan.id}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all text-sm ${
                  profile?.subscription_plan === plan.id 
                    ? 'bg-surface-gray text-text-gray/50 cursor-not-allowed' 
                    : plan.button
                }`}
              >
                {isUpdating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {profile?.subscription_plan === plan.id ? 'Paket Aktif' : 'Pilih Paket'}
                    {profile?.subscription_plan !== plan.id && <ArrowRight size={18} />}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-surface-gray/50 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-border-line/5">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white-pure flex items-center justify-center text-brand-blue shadow-lg border border-border-line/5">
            <Users size={32} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-text-dark">Butuh paket khusus untuk tim besar?</h4>
            <p className="text-sm text-text-gray">Hubungi Account Manager kami untuk solusi enterprise yang dipersonalisasi.</p>
          </div>
        </div>
        <button className="px-8 py-4 rounded-2xl bg-white-pure border border-border-line/10 font-bold text-sm text-text-dark hover:bg-surface-gray transition-all shadow-sm active:scale-95">
          Konsultasi Sekarang
        </button>
      </div>
    </div>
  );
}
