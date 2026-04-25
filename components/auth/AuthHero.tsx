'use client';

import React from 'react';

export default function AuthHero() {
  return (
    <div className="relative w-full md:w-[45%] h-[300px] md:h-auto overflow-hidden order-1 md:order-2">
      <img
        src="/images/auth-hero.png"
        alt="NusaEstate Luxury Property"
        className="absolute inset-0 w-full h-full object-cover p-3 rounded-[3rem]"
      />
      
      <div className="absolute inset-0 p-3">
        <div className="w-full h-full rounded-[2.5rem] bg-black-pure/30 flex flex-col justify-end p-10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-2 bg-white/10 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/20">
              <img src="/images/nusaestate.png" alt="Logo" className="w-6 h-6 object-contain" />
              <span className="text-white-pure text-xs font-medium tracking-wide">NusaEstate AI</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-white-pure leading-tight mb-4">
              Kelola Properti <br /> Lebih Efisien
            </h2>
            <p className="text-white-pure/80 text-sm font-medium max-w-sm leading-relaxed">
              Lacak pembayaran sewa, permintaan pemeliharaan, dan komunikasi penyewa dengan mudah di satu tempat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
