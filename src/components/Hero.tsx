import React from 'react';
import { ProfilVerisi, SutunBecerisi, NowStatus } from '../types';
import { Terminal, Smartphone, Brain, ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  profil: ProfilVerisi;
  sutunlar: SutunBecerisi[];
  now: NowStatus;
}

export const Hero: React.FC<HeroProps> = ({ profil, sutunlar, now }) => {
  const getSutunIkon = (ikonAdi: string) => {
    switch (ikonAdi) {
      case 'Terminal': return <Terminal className="w-5 h-5 text-cyan-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-indigo-400" />;
      case 'Brain': return <Brain className="w-5 h-5 text-purple-400" />;
      default: return <Terminal className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="hikaye" className="py-12 md:py-16">
      <div className="space-y-8">
        
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>☕ {now.kahveSayisi}. Kupa Kahve • {now.kampus}</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Merhaba, ben Mustafa.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-200 to-emerald-300">
              Kodun arkasındaki mantığı,
            </span><br />
            cepteki akıllı deneyime dönüştürüyorum.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {profil.biyografi}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href="#projeler"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
          >
            <span>Projelerin Hikayelerini Oku</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <a
            href="#cihaz"
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-medium flex items-center gap-2 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Mobil Simülatörle Oyna</span>
          </a>
        </div>

        {/* 3 Pillars */}
        <div id="sutunlar" className="pt-8">
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-4">
            Üç Temel Mühendislik Sütunum
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(sutunlar || []).map((sutun) => (
              <div
                key={sutun.id}
                className="glass-panel glass-panel-hover rounded-2xl p-5 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  {getSutunIkon(sutun.ikon)}
                </div>

                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                  {sutun.baslik}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {sutun.kisaAciklama}
                </p>

                <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                  {sutun.detay}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-white/5">
                  {sutun.etiketler.map((etiket, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono"
                    >
                      {etiket}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
