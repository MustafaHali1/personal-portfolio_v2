import React from 'react';
import { Proje } from '../types';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

interface ProjectsProps {
  projeler: Proje[];
}

export const Projects: React.FC<ProjectsProps> = ({ projeler }) => {
  return (
    <section id="projeler" className="py-12 border-t border-white/5">
      <div className="space-y-6">
        
        <div>
          <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
            Gerçek Motivasyon & Kodlama
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Öne Çıkan Projelerim
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Sadece tamamlanmış bir ürün değil; arkasındaki teknik ve insani problemi nasıl çözdüğümün hikayesi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(projeler || []).map((proje) => (
            <div
              key={proje.id}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col justify-between transition-all group"
            >
              {/* Image banner */}
              {proje.resimUrl && (
                <div className="h-48 w-full overflow-hidden relative">
                  <img
                    src={proje.resimUrl}
                    alt={proje.baslik}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111626] via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-cyan-300 border border-white/10">
                    {proje.kategori}
                  </span>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {proje.baslik}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {proje.kisaOzet}
                  </p>

                  {/* "Why I built it" story box */}
                  <div className="mt-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="text-[10px] font-mono text-indigo-400 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Neden Yaptım?</span>
                    </div>
                    <p className="text-[11px] text-slate-300/90 leading-relaxed italic">
                      "{proje.hikaye}"
                    </p>
                  </div>
                </div>

                <div>
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proje.teknolojiler.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                    {proje.canliLink && (
                      <a
                        href={proje.canliLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center gap-1.5 transition"
                      >
                        <span>Canlı Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {proje.githubLink && (
                      <a
                        href={proje.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1.5 transition"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Kodlar</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
