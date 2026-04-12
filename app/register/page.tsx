'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

// Custom SVG Icons for stability
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) throw authError;
      
      if (data.session) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setIsSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Gagal mendaftar. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  if (isSuccess) {
    return (
      <div className="bg-white-pure min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-[440px] bg-white-pure p-10 rounded-[2.5rem] shadow-premium border border-border-line/40 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={32} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-display font-medium text-text-dark mb-4">Cek Email Kamu</h2>
            <p className="text-text-gray font-medium text-sm leading-relaxed mb-8">
              Kami telah mengirimkan link verifikasi ke <strong>{email}</strong>. <br />
              Silakan klik link tersebut untuk mengaktifkan akun kamu.
            </p>
            <Button variant="outline" className="w-full" onClick={() => setIsSuccess(false)}>
              Kembali
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white-pure min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-20 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="w-full max-w-[440px] z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-white-pure p-8 md:p-10 rounded-[2.5rem] shadow-premium border border-border-line/40">
            
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-display font-medium text-text-dark mb-3">
                Prop<span className="text-brand-blue">Nest</span>
              </h1>
              <p className="text-text-gray font-medium text-sm">
                Mulai perjalanan properti pintar Anda hari ini.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <Input
                label="Nama Lengkap"
                type="text"
                placeholder="John Doe"
                icon={User}
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <Input
                label="Alamat Email"
                type="email"
                placeholder="nama@email.com"
                icon={Mail}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Kata Sandi"
                type="password"
                placeholder="Min. 8 karakter"
                icon={Lock}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-xs font-medium animate-in fade-in">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full mt-2" 
                isLoading={isLoading}
                rightIcon={<ArrowRight size={18} />}
              >
                Daftar Sekarang
              </Button>
            </form>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-line/40"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-text-gray bg-white-pure px-4 font-medium">
                Atau daftar dengan
              </div>
            </div>

            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full rounded-2xl" 
                onClick={handleGoogleLogin}
                leftIcon={<GoogleIcon />}
              >
                Google
              </Button>
            </div>

            <p className="mt-10 text-center text-sm text-text-gray font-medium">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-brand-blue hover:underline">
                Masuk Here
              </Link>
            </p>
          </div>
          
          <p className="mt-8 text-center text-[11px] text-text-gray/60 font-medium">
            &copy; 2026 PropNest AI. Dengan mendaftar, Anda setuju dengan <br />
            Ketentuan Layanan dan Kebijakan Privasi kami.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
