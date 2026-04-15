'use client';

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const data = [
  { day: 'Sen', leads: 12, click: 40 },
  { day: 'Sel', leads: 18, click: 55 },
  { day: 'Rab', leads: 15, click: 48 },
  { day: 'Kam', leads: 25, click: 70 },
  { day: 'Jum', leads: 32, click: 85 },
  { day: 'Sab', leads: 28, click: 75 },
  { day: 'Min', leads: 40, click: 95 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white-pure p-4 rounded-2xl shadow-premium border border-border-line/20 backdrop-blur-md">
        <p className="text-xs font-bold text-text-gray/50 uppercase tracking-widest mb-2">{label}</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-blue"></div>
            <p className="text-sm font-bold text-text-dark">
              {payload[0].value} <span className="text-text-gray font-medium">Leads Baru</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-blue/30"></div>
            <p className="text-sm font-bold text-text-dark">
              {payload[1].value} <span className="text-text-gray font-medium">Klik Chatbot</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function LeadsChart() {
  return (
    <div className="w-full h-[350px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#E2E8F0" 
            strokeOpacity={0.5} 
          />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="leads" 
            stroke="#2563EB" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorLeads)" 
            animationDuration={1500}
          />
          <Area 
            type="monotone" 
            dataKey="click" 
            stroke="#94A3B8" 
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="transparent" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
