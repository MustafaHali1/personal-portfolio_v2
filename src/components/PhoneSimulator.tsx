import React, { useState, useEffect } from 'react';
import { TelefonUygulamasi } from '../types';
import { Smartphone, Sparkles, ExternalLink, Mail, CheckCircle2 } from 'lucide-react';

interface PhoneSimulatorProps {
  uygulamalar: TelefonUygulamasi[];
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({ uygulamalar }) => {
  const [seciliUygulama, setSeciliUygulama] = useState<TelefonUygulamasi | null>(uygulamalar[0] || null);
  const [saat, setSaat] = useState<string>('23:45');

  useEffect(() => {
    const guncelle = () => {
      const now = new Date();
      setSaat(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
    };
    guncelle();
    const interval = setInterval(guncelle, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="cihaz" className="py-6">
      <div className="relative w-[310px] sm:w-[325px] h-[620px] mx-auto bg-[#111626] rounded-[48px] p-3.5 border-[4.5px] border-slate-700/80 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_40px_0_rgba(99,102,241,0.2)]">
        
        {/* Inner Device Screen */}
        <div className="w-full h-full bg-[#090c16] rounded-[36px] overflow-hidden flex flex-col justify-between border border-white/10 relative">
          
          {/* Top Status Bar & Dynamic Pill Notch */}
          <div className="pt-2 px-4 flex items-center justify-between text-[11px] font-mono text-slate-300 select-none">
            <span className="font-bold">{saat}</span>
            <div className="px-2 py-0.5 bg-black rounded-full flex items-center gap-1.5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-[9px] text-slate-300 font-sans">
                {seciliUygulama ? seciliUygulama.isim : "Android 15"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px]">
              <span>5G</span>
              <span className="text-emerald-400">98%</span>
            </div>
          </div>

          {/* Screen Content */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 custom-scroll">
            
            {/* Widget: Header Banner */}
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/20">
              <div className="flex items-center justify-between text-[9px] font-mono text-indigo-300">
                <span>Mustafa Hali • Android OS</span>
                <span className="text-emerald-400">● Canlı Cihaz</span>
              </div>
              <div className="text-xs font-bold text-white mt-1">
                Mobil Geliştirici Masası
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Uygulama simgelerine dokunarak detayları inceleyin:
              </p>
            </div>

            {/* App Grid */}
            <div>
              <div className="text-[10px] font-mono text-slate-400 mb-2 flex items-center justify-between">
                <span>Uygulama Çekmecesi</span>
                <span className="text-indigo-400 text-[9px]">Dokun & Çalıştır</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {uygulamalar.map((app) => {
                  const aktif = seciliUygulama?.id === app.id;
                  return (
                    <button
                      key={app.id}
                      onClick={() => setSeciliUygulama(app)}
                      className={`p-2.5 rounded-2xl border transition-all text-left flex flex-col justify-between h-20 ${
                        aktif
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                          : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xl">{app.ikon}</span>
                        {aktif && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                      </div>
                      <span className="font-medium truncate text-[11px] mt-1">{app.isim}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected App Detail Window */}
            {seciliUygulama && (
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white pb-1.5 border-b border-white/10">
                  <span>{seciliUygulama.ikon}</span>
                  <span className="truncate">{seciliUygulama.baslik}</span>
                </div>
                
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {seciliUygulama.icerik}
                </p>

                {seciliUygulama.baglantiUrl && (
                  <a
                    href={seciliUygulama.baglantiUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-medium transition"
                  >
                    <span>{seciliUygulama.baglantiMetni || "Aç"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}

          </div>

          {/* Home Gesture Bar */}
          <div className="py-2 flex justify-center bg-transparent">
            <div className="w-24 h-1 bg-white/30 rounded-full"></div>
          </div>

        </div>
      </div>
    </div>
  );
};
