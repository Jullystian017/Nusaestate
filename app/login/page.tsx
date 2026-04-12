'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';

// Custom SVG Icons for stability (replaced missing Lucide icons)
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Gagal masuk. Silakan periksa email dan kata sandi Anda.');
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
                Masuk ke platform properti AI tercanggih.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                label="Alamat Email"
                type="email"
                placeholder="nama@email.com"
                icon={Mail}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error && email === '' ? 'Email wajib diisi' : undefined}
              />

              <div className="space-y-1">
                <Input
                  label="Kata Sandi"
                  type="password"
                  placeholder="••••••••"
                  icon={Lock}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-end px-1">
                  <Link href="/lupa-sandi" className="text-[11px] font-medium text-brand-blue hover:underline">
                    Lupa kata sandi?
                  </Link>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-xs font-medium animate-in fade-in">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                isLoading={isLoading}
                rightIcon={<ArrowRight size={18} />}
              >
                Masuk Sekarang
              </Button>
            </form>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-line/40"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-text-gray bg-white-pure px-4 font-medium">
                Atau masuk dengan
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
              Belum punya akun?{' '}
              <Link href="/register" className="text-brand-blue hover:underline">
                Daftar Gratis
              </Link>
            </p>
          </div>
          
          <p className="mt-8 text-center text-[11px] text-text-gray/60 font-medium">
            &copy; 2026 PropNest AI. Semua hak dilindungi. <br />
            Dengan masuk, Anda setuju dengan Ketentuan Layanan kami.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
