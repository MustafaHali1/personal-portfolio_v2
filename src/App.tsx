import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolyoVerisi } from './types';
import { veriYukle } from './lib/supabase';
import { varsayilanPortfolyoVerisi } from './data/defaultData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhoneSimulator } from './components/PhoneSimulator';
import { Projects } from './components/Projects';
import { NowSection } from './components/NowSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { RefreshCw } from 'lucide-react';

function PortfolioAnaSayfa({ veri }: { veri: PortfolyoVerisi }) {
  return (
    <div className="min-h-screen bg-[#090c15] text-[#f1f5f9] relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px] animate-glow-slow"></div>
        <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] bg-cyan-600/15 rounded-full blur-[160px] animate-glow-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] animate-glow-slow" style={{ animationDelay: '5s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:36px_36px]"></div>
      </div>

      <div className="relative z-10">
        <Navbar profil={veri.profil} now={veri.now} />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6">
          <Hero profil={veri.profil} sutunlar={veri.sutunlar} now={veri.now} />
          
          <div className="py-12 border-t border-white/5">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Mobil Geliştirici Masası
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                İnteraktif Android Simülatörü
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Uygulama simgelerine tıklayarak projelerin ve notların telefonun içinde canlandığını görün.
              </p>
            </div>
            <PhoneSimulator uygulamalar={veri.telefonUygulamalari} />
          </div>

          <Projects projeler={veri.projeler} />
          <NowSection now={veri.now} profil={veri.profil} />
        </main>

        <Footer profil={veri.profil} />
      </div>

    </div>
  );
}

export default function App() {
  const [veri, setVeri] = useState<PortfolyoVerisi>(varsayilanPortfolyoVerisi);
  const [yukleniyor, setYukleniyor] = useState(true);

  useEffect(() => {
    const baslat = async () => {
      const data = await veriYukle();
      if (data) setVeri(data);
      setYukleniyor(false);
    };
    baslat();
  }, []);

  if (yukleniyor) {
    return (
      <div className="min-h-screen bg-[#090c15] flex items-center justify-center text-white font-mono text-sm">
        <RefreshCw className="w-5 h-5 animate-spin text-indigo-400 mr-2" />
        Portfolyo Yükleniyor...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioAnaSayfa veri={veri} />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
