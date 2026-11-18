import React from 'react';
import { Link } from 'react-router-dom';
import { ProfilVerisi, NowStatus } from '../types';
import { Github, Linkedin, Instagram, Mail, Shield, Sparkles } from 'lucide-react';

interface NavbarProps {
  profil: ProfilVerisi;
  now: NowStatus;
}

export const Navbar: React.FC<NavbarProps> = ({ profil, now }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090c15]/85 border-b border-white/5 px-4 sm:px-6 py-3.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand & Identity */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0d1222] rounded-[10px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-300 to-cyan-200 text-sm">
              MH
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight group-hover:text-indigo-300 transition-colors">
                {profil.isim}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {now.durumMesaji || "Açık"}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {profil.universite}
            </p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a href="#hikaye" className="hover:text-white transition-colors">Hikayem</a>
          <a href="#sutunlar" className="hover:text-white transition-colors">Yazılım & AI</a>
          <a href="#cihaz" className="hover:text-white transition-colors flex items-center gap-1 text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            Mobil Simülatör
          </a>
          <a href="#projeler" className="hover:text-white transition-colors">Projeler</a>
          <a href="#su-an" className="hover:text-white transition-colors">Şu An</a>
        </nav>

        {/* Right Action Links & Admin */}
        <div className="flex items-center gap-2.5">
          {profil.sosyalMedya.find(s => s.platform === 'GitHub') && (
            <a
              href={profil.sosyalMedya.find(s => s.platform === 'GitHub')?.link}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          <a
            href={`mailto:${profil.eposta}`}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>İletişim</span>
          </a>

          {/* Admin Dashboard shortcut */}
          <Link
            to="/admin"
            className="p-2 rounded-lg bg-white/5 hover:bg-indigo-600/20 text-slate-400 hover:text-indigo-300 border border-white/5 transition"
            title="Dashboard (Yönetim Paneli)"
          >
            <Shield className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </header>
  );
};
