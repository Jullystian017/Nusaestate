'use server';

import Groq from 'groq-sdk';
import { MOCK_LEADS } from '@/lib/leads-mock';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = 'llama-3.3-70b-versatile';

/**
 * Generates an AI-powered executive report based on current leads data.
 * This analyzes sources, property popularity, and conversion potential.
 */
export async function generateExecutiveReport(analyticsData?: {
  totalLeads: number;
  sourceStats: any;
  propertyStats: any;
  qualityStats: any;
  trendSummary?: string;
}) {
  // 1. Data Aggregation for AI Context
  // Use provided data or fallback to MOCK_LEADS
  const totalLeads = analyticsData?.totalLeads || MOCK_LEADS.length;
  const sourceStats = analyticsData?.sourceStats || MOCK_LEADS.reduce((acc: any, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {});

  const propertyStats = analyticsData?.propertyStats || MOCK_LEADS.reduce((acc: any, lead) => {
    acc[lead.property] = (acc[lead.property] || 0) + 1;
    return acc;
  }, {});

  const tempStats = analyticsData?.qualityStats || MOCK_LEADS.reduce((acc: any, lead) => {
    acc[lead.temperature] = (acc[lead.temperature] || 0) + 1;
    return acc;
  }, {});

  const trendText = analyticsData?.trendSummary ? `\nTren Terakhir: ${analyticsData.trendSummary}` : "";

  // 2. Performance Breakdown string for Prompt
  const promptData = `
    DATA REAL-TIME ANALYTICS:
    - Total Volume Leads: ${totalLeads}
    - Distribusi Channel: ${JSON.stringify(sourceStats)}
    - Properti Terpopuler: ${JSON.stringify(propertyStats)}
    - Kualitas Prospek (Temperature): ${JSON.stringify(tempStats)}${trendText}
  `;

  const prompt = `
    Kamu adalah Direktur Marketing Properti (CMO) senior. 
    Berdasarkan DATA REAL-TIME ANALYTICS berikut, buatlah LAPORAN STRATEGIS yang tajam dan profesional untuk developer perumahan.
    
    ${promptData}

    INSTRUKSI KHUSUS:
    1. Jangan sekadar mendeskripsikan angka, berikan ANALISIS MENDALAM. (Contoh: "Meskipun Instagram membawa banyak lead, kualitasnya rendah dibanding WhatsApp, tandanya tim konten harus lebih selektif...").
    2. Identifikasi properti mana yang "Winner" (paling laku) dan berikan saran optimasi.
    3. Gunakan Markdown yang rapi dengan heading, bullet points, dan penekanan (bold).
    4. Gunakan Bahasa Indonesia yang Executive, Elegan, dan Powerful.

    STRUKTUR LAPORAN:
    1. **Data Highlights**: Ringkasan performa berbasis angka.
    2. **Strategic Deep Dive**: Analisis tajam per channel dan properti.
    3. **Action Plan (7-Day Focus)**: 3-5 langkah konkrit yang bisa dilakukan minggu ini.
    4. **Executive Insight**: Prediksi atau motivasi penutup.
  `;

  try {
    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return {
      success: true,
      report: completion.choices[0].message.content,
      generatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('AI Report Error:', error);
    return {
      success: false,
      error: 'Gagal membuat laporan AI. Pastikan API Key valid.',
    };
  }
}
