'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, User, Bot, Loader2, Minus, Maximize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function PropNestAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Halo! Saya PropNest AI. Ada yang bisa saya bantu dengan data properti, leads, atau deals Anda hari ini?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (overrideInput?: string) => {
    const messageText = overrideInput || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Maaf, terjadi kesalahan saat menghubungi asisten AI. Silakan coba lagi nanti.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        suppressHydrationWarning
        onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
        }}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-brand-blue text-white-pure rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 z-50 group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Sparkles className="group-hover:rotate-12 transition-transform" size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white-pure rounded-full animate-pulse"></span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed right-6 bottom-6 w-[400px] max-w-[calc(100vw-3rem)] bg-white-pure rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-border-line/20 flex flex-col overflow-hidden transition-all duration-500 ease-in-out z-50 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        } ${isMinimized ? 'h-[72px]' : 'h-[600px] max-h-[80vh]'}`}
      >
        {/* Header */}
        <div className="p-4 bg-brand-blue flex items-center justify-between text-white-pure shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white-pure/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-display font-medium text-sm leading-tight">PropNest AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                <span className="text-[10px] font-medium opacity-80 uppercase tracking-widest">Intelligent Assistant</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white-pure/10 rounded-lg transition-all"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minus size={16} />}
            </button>
            <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white-pure/10 rounded-lg transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        {!isMinimized && (
          <>
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FBFBFE]"
            >
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
                  {[
                    { label: '🏠 Cek Listing Properti', text: 'Ada berapa listing properti saya saat ini?' },
                    { label: '👥 Analisis Leads', text: 'Siapa leads paling baru yang masuk?' },
                    { label: '💰 Update Pipeline', text: 'Tampilkan ringkasan deals saya.' },
                    { label: '✍️ Buat Caption', text: 'Bantu buatkan caption IG untuk properti terbaru saya.' },
                  ].map((chip, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(chip.text)}
                      className="px-4 py-2 bg-white-pure border border-border-line/20 rounded-xl text-[10px] font-bold text-brand-blue hover:bg-brand-blue hover:text-white-pure transition-all shadow-sm active:scale-95"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                    msg.role === 'assistant' ? 'bg-brand-blue text-white-pure' : 'bg-white-pure text-text-gray/40 border border-border-line/20'
                  }`}>
                    {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'assistant' 
                      ? 'bg-white-pure border border-border-line/10 text-text-dark rounded-tl-none' 
                      : 'bg-brand-blue text-white-pure rounded-tr-none'
                  }`}>
                    <div className="prose prose-sm max-w-none prose-slate">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-brand-blue/40" />
                  </div>
                  <div className="bg-white-pure border border-border-line/10 rounded-2xl rounded-tl-none p-4 w-2/3">
                    <Loader2 size={16} className="animate-spin text-brand-blue/40" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white-pure border-t border-border-line/10 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tanya tentang properti, leads, atau deals Anda..."
                  className="w-full bg-surface-gray/50 border border-transparent rounded-2xl py-3.5 pl-4 pr-12 text-sm focus:bg-white-pure focus:border-brand-blue/20 outline-none transition-all shadow-inner"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`absolute right-2 p-2 rounded-xl transition-all ${
                    input.trim() && !isLoading ? 'bg-brand-blue text-white-pure shadow-lg shadow-brand-blue/20 hover:scale-105' : 'text-text-gray/30'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[9px] text-center text-text-gray/30 mt-3 font-medium uppercase tracking-[0.1em]">
                PropNest AI can make mistakes. Check important info.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
