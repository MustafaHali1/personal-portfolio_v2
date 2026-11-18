import React from 'react';
import { NowStatus, ProfilVerisi } from '../types';
import { Coffee, Music, BookOpen, MapPin, Mail, Compass } from 'lucide-react';

interface NowSectionProps {
  now: NowStatus;
  profil: ProfilVerisi;
}

export const NowSection: React.FC<NowSectionProps> = ({ now, profil }) => {
  return (
    <section id="su-an" className="py-12 border-t border-white/5">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
          <div>
            <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Canlı Geliştirici Durumu</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Şu Anda Masamda Ne Var?
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            <span>{now.kampus}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Study Topic */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <Compass className="w-4 h-4" />
              <span>Odak Konusu</span>
            </div>
            <div className="text-sm font-semibold text-white mt-1">
              {now.calisilanKonu}
            </div>
            <div className="text-[11px] text-slate-400">Aktif kodlama & denemeler</div>
          </div>

          {/* Card 2: Music */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Music className="w-4 h-4" />
              <span>Kulaklıkta Ne Var?</span>
            </div>
            <div className="text-sm font-semibold text-white mt-1">
              {now.calanMuzik}
            </div>
            <div className="text-[11px] text-slate-400">Kod yazarken ritim</div>
          </div>

          {/* Card 3: Coffee Count */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Coffee className="w-4 h-4" />
              <span>Kahve Sayacı</span>
            </div>
            <div className="text-sm font-semibold text-white mt-1">
              Günün {now.kahveSayisi}. Kupası ☕
            </div>
            <div className="text-[11px] text-slate-400">Algoritmaları besleyen yakıt</div>
          </div>

          {/* Card 4: Documentation */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
              <BookOpen className="w-4 h-4" />
              <span>İncelenen Kaynak</span>
            </div>
            <div className="text-sm font-semibold text-white mt-1 truncate">
              {now.okunanKaynak}
            </div>
            <div className="text-[11px] text-slate-400">Mimari & dökümantasyon</div>
          </div>

        </div>

        {/* Bottom invitation */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 border-t border-white/5">
          <p>
            Staj, mobil proje fikirleri veya sadece bilgisayar mühendisliği üzerine sohbet etmek için:
          </p>
          <a
            href={`mailto:${profil.eposta}`}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-indigo-600 text-white font-medium flex items-center gap-2 transition shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{profil.eposta}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
