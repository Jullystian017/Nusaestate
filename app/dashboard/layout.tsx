'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  Sparkles, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = React.useState<any>(null);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Listing Properti', href: '/dashboard/listing', icon: Building2 },
    { name: 'CRM Leads', href: '/dashboard/leads', icon: Users },
    { name: 'Content Studio', href: '/dashboard/content', icon: Sparkles },
    { name: 'Pengaturan', href: '/dashboard/settings', icon: Settings },
  ];

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const companyName = user?.user_metadata?.company_name || 'PropNest Developer';

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans flex transition-all duration-300">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white-pure border-r border-border-line/30 z-50 flex flex-col hidden lg:flex transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-60'}`}>
        {/* Logo Section */}
        <div className={`h-20 flex items-center border-b border-border-line/5 ${isCollapsed ? 'justify-center px-0' : 'justify-between px-6'}`}>
          <Link href="/" className="flex items-center gap-2.5 group overflow-hidden">
            <div className="w-9 h-9 bg-brand-blue rounded-xl flex items-center justify-center shadow-lg shadow-brand-blue/10 group-hover:scale-105 transition-all shrink-0">
              <span className="text-white-pure font-medium text-sm">P</span>
            </div>
            {!isCollapsed && (
              <span className="font-display font-medium text-base text-text-dark tracking-tight animate-in fade-in slide-in-from-left-2 duration-300">PropNest</span>
            )}
          </Link>
          {!isCollapsed && (
            <button 
              onClick={() => setIsCollapsed(true)}
              className="p-2 text-text-gray/40 hover:text-brand-blue hover:bg-surface-gray rounded-xl transition-all"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {isCollapsed && (
            <div className="flex justify-center py-4 border-b border-border-line/5">
                <button 
                    onClick={() => setIsCollapsed(false)}
                    className="p-2 text-text-gray/40 hover:text-brand-blue hover:bg-surface-gray rounded-xl transition-all"
                >
                    <ChevronRight size={18} strokeWidth={1.5} />
                </button>
            </div>
        )}

        {/* Navigation - Pill Style */}
        <div className={`flex-1 overflow-y-auto py-8 ${isCollapsed ? 'px-3' : 'px-5'}`}>
          <div className={`text-[9px] font-medium text-text-gray/30 uppercase tracking-[0.2em] mb-6 px-4 truncate ${isCollapsed ? 'hidden' : 'block'}`}>Menu Utama</div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  title={isCollapsed ? item.name : ''}
                  className={`flex items-center rounded-full text-xs font-medium transition-all group ${
                    isCollapsed ? 'justify-center h-10 w-full p-0' : 'gap-2.5 px-4 py-2.5'
                  } ${
                    isActive 
                      ? 'bg-brand-blue text-white-pure shadow-lg shadow-brand-blue/15' 
                      : 'text-text-gray/80 hover:bg-surface-gray hover:text-text-dark'
                  }`}
                >
                  <Icon 
                    size={18} 
                    strokeWidth={isActive ? 2 : 1.5} 
                    className={isActive ? 'text-white-pure' : 'text-text-gray/50 group-hover:text-brand-blue transition-colors'} 
                  />
                  {!isCollapsed && (
                    <span className="truncate animate-in fade-in slide-in-from-left-1 duration-300">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={`p-4 border-t border-border-line/10 mt-auto ${isCollapsed ? 'flex justify-center' : ''}`}>
          <button 
            onClick={handleLogout}
            title={isCollapsed ? 'Keluar Akun' : ''}
            className={`flex items-center text-red-500/70 hover:text-red-500 hover:bg-red-50 transition-all rounded-full ${
                isCollapsed ? 'h-10 w-10 justify-center' : 'w-full px-4 py-2.5 gap-2.5 text-xs font-medium'
            }`}
          >
            <LogOut size={18} strokeWidth={1.5} />
            {!isCollapsed && <span>Keluar Akun</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen relative transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:pl-20' : 'lg:pl-60'}`}>
        {/* Topbar */}
        <header className="h-20 bg-white-pure/60 backdrop-blur-xl border-b border-border-line/30 sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4 lg:hidden">
            <button className="p-2 text-text-gray hover:bg-surface-gray rounded-lg">
              <Menu size={24} />
            </button>
            <div className="w-8 h-8 bg-brand-blue rounded-xl flex items-center justify-center">
              <span className="text-white-pure font-medium text-sm">P</span>
            </div>
          </div>

          <div className="hidden lg:block">
            <h1 className="text-lg font-display font-medium text-text-dark/80 capitalize tracking-tight">
              {pathname === '/dashboard' ? 'Dashboard Overview' : 
               pathname.includes('listing') ? 'Listing Properti' :
               pathname.includes('leads') ? 'CRM Leads' :
               pathname.includes('content') ? 'AI Content Studio' :
               pathname.includes('settings') ? 'Pengaturan Akun' :
               pathname.split('/').pop()?.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-border-line/30 flex items-center justify-center text-text-gray/60 hover:bg-surface-gray hover:text-brand-blue transition-all relative">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-brand-blue rounded-full border-2 border-white-pure"></span>
            </button>
            <div className="h-11 pl-1 pr-4 flex items-center gap-3 bg-surface-gray/40 rounded-full border border-border-line/10 hover:bg-surface-gray/60 transition-colors">
                <div className="w-9 h-9 rounded-full bg-white-pure border border-border-line/10 flex items-center justify-center text-brand-blue font-medium text-sm shadow-sm ring-2 ring-brand-blue/5">
                    {displayName.charAt(0)}
                </div>
                <div className="hidden sm:block overflow-hidden max-w-[150px]">
                    <p className="text-xs font-medium text-text-dark truncate leading-tight">{displayName}</p>
                    <p className="text-[9px] font-normal text-text-gray/50 truncate uppercase tracking-wider">{companyName}</p>
                </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10 bg-[#F8F9FA]/50">
          {children}
        </main>
      </div>
    </div>
  );
}
