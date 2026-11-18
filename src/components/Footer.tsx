import React from 'react';
import { ProfilVerisi } from '../types';
import { Heart, Github, Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  profil: ProfilVerisi;
}

export const Footer: React.FC<FooterProps> = ({ profil }) => {
  return (
    <footer className="py-12 border-t border-white/5 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div>
          <span className="font-bold text-white">{profil.isim}</span> • {profil.universite} Bilgisayar Mühendisliği
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <span>Kod ve</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>ile hazırlandı.</span>
        </div>

        <div className="flex items-center gap-3">
          {profil.sosyalMedya.map((sosyal, i) => (
            <a
              key={i}
              href={sosyal.link}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              {sosyal.platform}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};
