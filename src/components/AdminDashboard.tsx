import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PortfolyoVerisi, Proje, TelefonUygulamasi } from '../types';
import { veriYukle, veriKaydet, getSupabaseConfig, saveSupabaseConfig, isSupabaseConfigured } from '../lib/supabase';
import { 
  Save, 
  ArrowLeft, 
  User, 
  Compass, 
  Terminal, 
  FolderGit2, 
  Smartphone, 
  Database, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Copy,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [veri, setVeri] = useState<PortfolyoVerisi | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [aktifSekme, setAktifSekme] = useState<string>('profil');
  const [bildirim, setBildirim] = useState<{ tip: 'basari' | 'hata' | ''; metin: string }>({ tip: '', metin: '' });
  
  // Supabase ayarları
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [supabaseAktif, setSupabaseAktif] = useState(false);

  useEffect(() => {
    const baslat = async () => {
      const data = await veriYukle();
      setVeri(data);
      const sbConfig = getSupabaseConfig();
      setSupabaseUrl(sbConfig.url || '');
      setSupabaseKey(sbConfig.anonKey || '');
      setSupabaseAktif(isSupabaseConfigured());
      setYukleniyor(false);
    };
    baslat();
  }, []);

  const bildirimGoster = (tip: 'basari' | 'hata', metin: string) => {
    setBildirim({ tip, metin });
    setTimeout(() => setBildirim({ tip: '', metin: '' }), 4000);
  };

  const kaydet = async () => {
    if (!veri) return;
    setKaydediliyor(true);
    
    // Varsa Supabase yapılandırmasını kaydet
    if (supabaseUrl || supabaseKey) {
      saveSupabaseConfig(supabaseUrl, supabaseKey);
      setSupabaseAktif(isSupabaseConfigured());
    }

    const sonuc = await veriKaydet(veri);
    setKaydediliyor(false);

    if (sonuc.basarili) {
      if (sonuc.supabaseGuncellendi) {
        bildirimGoster('basari', '🎉 Tüm değişiklikler Supabase bulutuna ve yerel belleğe kaydedildi!');
      } else {
        bildirimGoster('basari', '✅ Değişiklikler başarıyla kaydedildi!');
      }
    } else {
      bildirimGoster('hata', `Kayıt sırasında hata oluştu: ${sonuc.hata}`);
    }
  };

  const jsonIndir = () => {
    if (!veri) return;
    const blob = new Blob([JSON.stringify(veri, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mustafa_hali_portfolyo_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    bildirimGoster('basari', 'JSON yedeği başarıyla indirildi.');
  };

  const jsonYukle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setVeri(parsed);
        bildirimGoster('basari', 'Yedek JSON başarıyla yüklendi! Kaydet butonuna basmayı unutmayın.');
      } catch (err) {
        bildirimGoster('hata', 'Geçersiz JSON dosyası!');
      }
    };
    reader.readAsText(file);
  };

  // Proje işlemleri
  const yeniProjeEkle = () => {
    if (!veri) return;
    const yeni: Proje = {
      id: 'proje-' + Date.now(),
      baslik: 'Yeni Proje Başlığı',
      kategori: 'Mobil / Web',
      kisaOzet: 'Projenin kısa özeti buraya yazılır.',
      hikaye: 'Bu projeyi neden yaptım, hangi problemi çözdüm?',
      teknolojiler: ['Kotlin', 'Android'],
      resimUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800',
      oneCikan: true
    };
    setVeri({
      ...veri,
      projeler: [yeni, ...veri.projeler]
    });
  };

  const projeSil = (id: string) => {
    if (!veri) return;
    if (confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      setVeri({
        ...veri,
        projeler: veri.projeler.filter(p => p.id !== id)
      });
    }
  };

  if (yukleniyor || !veri) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090c15] text-white font-mono text-sm">
        <RefreshCw className="w-5 h-5 animate-spin text-indigo-400 mr-2" />
        Sarayın Divanı Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090c15] text-slate-200">
      
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#0d1222]/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 text-xs font-medium flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolyoya Dön</span>
            </Link>
            <div className="h-4 w-[1px] bg-white/10"></div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Yönetim Divanı (Dashboard)</span>
                {supabaseAktif ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    ● Supabase Canlı
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                    ● Yerel Kayıt Aktif
                  </span>
                )}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={jsonIndir}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs flex items-center gap-1.5 transition"
              title="JSON Olarak Yedek İndir"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Yedekle</span>
            </button>

            <label className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs flex items-center gap-1.5 transition cursor-pointer" title="JSON Yedeği Yükle">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Yükle</span>
              <input type="file" accept=".json" onChange={jsonYukle} className="hidden" />
            </label>

            <button
              onClick={kaydet}
              disabled={kaydediliyor}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
            >
              {kaydediliyor ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Kaydediliyor...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Değişiklikleri Kaydet</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Notification Toast */}
      {bildirim.metin && (
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <div className={`p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-medium border ${
            bildirim.tip === 'basari' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            {bildirim.tip === 'basari' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{bildirim.metin}</span>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-1.5">
            {[
              { id: 'profil', etiket: 'Profil & Biyografi', ikon: <User className="w-4 h-4" /> },
              { id: 'now', etiket: 'Canlı Durum (Şu An)', ikon: <Compass className="w-4 h-4" /> },
              { id: 'sutunlar', etiket: 'Mühendislik Sütunları', ikon: <Terminal className="w-4 h-4" /> },
              { id: 'projeler', etiket: 'Projeler Yönetimi', ikon: <FolderGit2 className="w-4 h-4" /> },
              { id: 'telefon', etiket: 'Mobil Simülatör Notları', ikon: <Smartphone className="w-4 h-4" /> },
              { id: 'supabase', etiket: 'Supabase & Bulut Ayarı', ikon: <Database className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setAktifSekme(tab.id)}
                className={`w-full p-3 rounded-2xl text-xs font-medium flex items-center gap-3 transition-all ${
                  aktifSekme === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 font-semibold'
                    : 'bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.ikon}
                <span>{tab.etiket}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div className="lg:col-span-9 bg-[#101524] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
            
            {/* ================= TAB 1: PROFİL ================= */}
            {aktifSekme === 'profil' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Profil & İletişim Bilgileri</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Sitenin en üstünde yer alan ana kimlik ve iletişim bilgileri.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Ad Soyad</label>
                    <input
                      type="text"
                      value={veri.profil.isim}
                      onChange={(e) => setVeri({ ...veri, profil: { ...veri.profil, isim: e.target.value } })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Unvan</label>
                    <input
                      type="text"
                      value={veri.profil.unvan}
                      onChange={(e) => setVeri({ ...veri, profil: { ...veri.profil, unvan: e.target.value } })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Üniversite</label>
                    <input
                      type="text"
                      value={veri.profil.universite}
                      onChange={(e) => setVeri({ ...veri, profil: { ...veri.profil, universite: e.target.value } })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Kurumsal E-posta</label>
                    <input
                      type="text"
                      value={veri.profil.eposta}
                      onChange={(e) => setVeri({ ...veri, profil: { ...veri.profil, eposta: e.target.value } })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Avatar / Profil Fotoğrafı URL</label>
                    <input
                      type="text"
                      value={veri.profil.avatarUrl}
                      onChange={(e) => setVeri({ ...veri, profil: { ...veri.profil, avatarUrl: e.target.value } })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Samimi Biyografi (İnsansı Anlatım)</label>
                    <textarea
                      rows={4}
                      value={veri.profil.biyografi}
                      onChange={(e) => setVeri({ ...veri, profil: { ...veri.profil, biyografi: e.target.value } })}
                      className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 2: NOW ================= */}
            {aktifSekme === 'now' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Canlı Durum ("Şu Anda Masamda Ne Var?")</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Ziyaretçiye samimi ve insansı bir hava veren anlık çalışma bilgileri.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Odak Konusu</label>
                    <input
                      type="text"
                      value={veri.now.calisilanKonu}
                      onChange={(e) => setVeri({ ...veri, now: { ...veri.now, calisilanKonu: e.target.value } })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Çalan Müzik</label>
                    <input
                      type="text"
                      value={veri.now.calanMuzik}
                      onChange={(e) => setVeri({ ...veri, now: { ...veri.now, calanMuzik: e.target.value } })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Kahve Sayısı (Kupa)</label>
                    <input
                      type="number"
                      value={veri.now.kahveSayisi}
                      onChange={(e) => setVeri({ ...veri, now: { ...veri.now, kahveSayisi: Number(e.target.value) } })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">İncelenen Dökümantasyon / Kitap</label>
                    <input
                      type="text"
                      value={veri.now.okunanKaynak}
                      onChange={(e) => setVeri({ ...veri, now: { ...veri.now, okunanKaynak: e.target.value } })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Durum Rozeti (Navbar'daki yeşil yazı)</label>
                    <input
                      type="text"
                      value={veri.now.durumMesaji}
                      onChange={(e) => setVeri({ ...veri, now: { ...veri.now, durumMesaji: e.target.value } })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Kampüs / Lokasyon Detayı</label>
                    <input
                      type="text"
                      value={veri.now.kampus}
                      onChange={(e) => setVeri({ ...veri, now: { ...veri.now, kampus: e.target.value } })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ================= TAB 3: SUTUNLAR ================= */}
            {aktifSekme === 'sutunlar' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Mühendislik Sütunları</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Genel Yazılım, Mobil ve Yapay Zeka alanlarındaki derinliğinizi anlatan kartlar.</p>
                </div>

                <div className="space-y-4">
                  {veri.sutunlar.map((sutun, index) => (
                    <div key={sutun.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-slate-400 mb-1">Sütun Başlığı</label>
                          <input
                            type="text"
                            value={sutun.baslik}
                            onChange={(e) => {
                              const yeniSutunlar = [...veri.sutunlar];
                              yeniSutunlar[index].baslik = e.target.value;
                              setVeri({ ...veri, sutunlar: yeniSutunlar });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 mb-1">Kısa Açıklama</label>
                          <input
                            type="text"
                            value={sutun.kisaAciklama}
                            onChange={(e) => {
                              const yeniSutunlar = [...veri.sutunlar];
                              yeniSutunlar[index].kisaAciklama = e.target.value;
                              setVeri({ ...veri, sutunlar: yeniSutunlar });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-slate-400 mb-1">Detaylı Açıklama</label>
                          <textarea
                            rows={2}
                            value={sutun.detay}
                            onChange={(e) => {
                              const yeniSutunlar = [...veri.sutunlar];
                              yeniSutunlar[index].detay = e.target.value;
                              setVeri({ ...veri, sutunlar: yeniSutunlar });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-slate-400 mb-1">Etiketler (Virgülle ayırın: C, C++, Kotlin)</label>
                          <input
                            type="text"
                            value={sutun.etiketler.join(', ')}
                            onChange={(e) => {
                              const yeniSutunlar = [...veri.sutunlar];
                              yeniSutunlar[index].etiketler = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                              setVeri({ ...veri, sutunlar: yeniSutunlar });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 4: PROJELER ================= */}
            {aktifSekme === 'projeler' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">Projeler Yönetimi</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Projeleri ekleyin, düzenleyin ve arkasındaki gerçek hikayeyi anlatın.</p>
                  </div>
                  <button
                    onClick={yeniProjeEkle}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yeni Proje Ekle</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {veri.projeler.map((proje, index) => (
                    <div key={proje.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <span className="font-bold text-sm text-white">{proje.baslik || "İsimsiz Proje"}</span>
                        <button
                          onClick={() => projeSil(proje.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition"
                          title="Projeyi Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-slate-400 mb-1">Proje Başlığı</label>
                          <input
                            type="text"
                            value={proje.baslik}
                            onChange={(e) => {
                              const y = [...veri.projeler];
                              y[index].baslik = e.target.value;
                              setVeri({ ...veri, projeler: y });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1">Kategori</label>
                          <input
                            type="text"
                            value={proje.kategori}
                            onChange={(e) => {
                              const y = [...veri.projeler];
                              y[index].kategori = e.target.value;
                              setVeri({ ...veri, projeler: y });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1">Canlı Demo URL</label>
                          <input
                            type="text"
                            value={proje.canliLink || ''}
                            onChange={(e) => {
                              const y = [...veri.projeler];
                              y[index].canliLink = e.target.value;
                              setVeri({ ...veri, projeler: y });
                            }}
                            placeholder="https://..."
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1">GitHub Repo URL</label>
                          <input
                            type="text"
                            value={proje.githubLink || ''}
                            onChange={(e) => {
                              const y = [...veri.projeler];
                              y[index].githubLink = e.target.value;
                              setVeri({ ...veri, projeler: y });
                            }}
                            placeholder="https://github.com/..."
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-400 mb-1">Kapak Görseli URL</label>
                          <input
                            type="text"
                            value={proje.resimUrl}
                            onChange={(e) => {
                              const y = [...veri.projeler];
                              y[index].resimUrl = e.target.value;
                              setVeri({ ...veri, projeler: y });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-400 mb-1">Kısa Özet</label>
                          <input
                            type="text"
                            value={proje.kisaOzet}
                            onChange={(e) => {
                              const y = [...veri.projeler];
                              y[index].kisaOzet = e.target.value;
                              setVeri({ ...veri, projeler: y });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-400 mb-1">"Neden Yaptım?" Hikayesi (İnsansı ve Samimi Anlatım)</label>
                          <textarea
                            rows={3}
                            value={proje.hikaye}
                            onChange={(e) => {
                              const y = [...veri.projeler];
                              y[index].hikaye = e.target.value;
                              setVeri({ ...veri, projeler: y });
                            }}
                            className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-400 mb-1">Teknolojiler (Virgülle ayırın: HTML5, CSS3, JS)</label>
                          <input
                            type="text"
                            value={proje.teknolojiler.join(', ')}
                            onChange={(e) => {
                              const y = [...veri.projeler];
                              y[index].teknolojiler = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                              setVeri({ ...veri, projeler: y });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 5: TELEFON SİMÜLATÖRÜ ================= */}
            {aktifSekme === 'telefon' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Mobil Simülatör Uygulamaları & Notları</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Ziyaretçilerin ekrandaki Android telefon simülatöründe gördüğü uygulamalar ve günlük notlar.</p>
                </div>

                <div className="space-y-4">
                  {veri.telefonUygulamalari.map((app, index) => (
                    <div key={app.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 text-xs">
                      <div className="flex items-center gap-2 font-bold text-white text-sm">
                        <span>{app.ikon}</span>
                        <span>{app.isim}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 mb-1">Uygulama Adı</label>
                          <input
                            type="text"
                            value={app.isim}
                            onChange={(e) => {
                              const y = [...veri.telefonUygulamalari];
                              y[index].isim = e.target.value;
                              setVeri({ ...veri, telefonUygulamalari: y });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1">İkon (Emoji)</label>
                          <input
                            type="text"
                            value={app.ikon}
                            onChange={(e) => {
                              const y = [...veri.telefonUygulamalari];
                              y[index].ikon = e.target.value;
                              setVeri({ ...veri, telefonUygulamalari: y });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-400 mb-1">Detay Başlığı</label>
                          <input
                            type="text"
                            value={app.baslik}
                            onChange={(e) => {
                              const y = [...veri.telefonUygulamalari];
                              y[index].baslik = e.target.value;
                              setVeri({ ...veri, telefonUygulamalari: y });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-400 mb-1">Telefonda Görünen İçerik / Not</label>
                          <textarea
                            rows={3}
                            value={app.icerik}
                            onChange={(e) => {
                              const y = [...veri.telefonUygulamalari];
                              y[index].icerik = e.target.value;
                              setVeri({ ...veri, telefonUygulamalari: y });
                            }}
                            className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1">Varsa Buton Linki</label>
                          <input
                            type="text"
                            value={app.baglantiUrl || ''}
                            onChange={(e) => {
                              const y = [...veri.telefonUygulamalari];
                              y[index].baglantiUrl = e.target.value;
                              setVeri({ ...veri, telefonUygulamalari: y });
                            }}
                            placeholder="https://..."
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1">Buton Metni</label>
                          <input
                            type="text"
                            value={app.baglantiMetni || ''}
                            onChange={(e) => {
                              const y = [...veri.telefonUygulamalari];
                              y[index].baglantiMetni = e.target.value;
                              setVeri({ ...veri, telefonUygulamalari: y });
                            }}
                            className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 6: SUPABASE AYARI ================= */}
            {aktifSekme === 'supabase' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Supabase Bulut Veritabanı Entegrasyonu</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    İstediğiniz zaman Supabase üzerinden oluşturacağınız projenin bilgilerini buraya girerek bulut senkronizasyonunu anında başlatabilirsiniz.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <span>💡</span> Nasıl Bağlanır?
                  </div>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-300">
                    <li><a href="https://supabase.com" target="_blank" className="underline text-cyan-400">supabase.com</a> adresinde ücretsiz bir proje açın.</li>
                    <li>Supabase sol menüsünden <strong>Project Settings → API</strong> kısmına gidin.</li>
                    <li><strong>Project URL</strong> ve <strong>anon public</strong> anahtarını aşağıdaki kutulara yapıştırın.</li>
                    <li>Aşağıdaki SQL şemasını kopyalayıp Supabase <strong>SQL Editor</strong> bölümünde çalıştırın.</li>
                  </ol>
                </div>

                <div className="grid grid-cols-1 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Supabase Project URL</label>
                    <input
                      type="text"
                      placeholder="https://xyzcompany.supabase.co"
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Supabase Anon Public Key</label>
                    <input
                      type="password"
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      value={supabaseKey}
                      onChange={(e) => setSupabaseKey(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono"
                    />
                  </div>
                </div>

                {/* Ready SQL Schema Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400">Gerekli SQL Şeması (Tek tıkla kopyalayın):</span>
                    <button
                      onClick={() => {
                        const sql = `CREATE TABLE IF NOT EXISTS portfolyo_ayarlar (
  id TEXT PRIMARY KEY,
  icerik JSONB NOT NULL,
  guncellenme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE portfolyo_ayarlar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Portfolyo verisini herkes okuyabilir" 
ON portfolyo_ayarlar FOR SELECT 
USING (true);

CREATE POLICY "Anon key veya admin güncelleyebilir" 
ON portfolyo_ayarlar FOR ALL 
USING (true)
WITH CHECK (true);`;
                        navigator.clipboard.writeText(sql);
                        bildirimGoster('basari', 'SQL şeması panoya kopyalandı!');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 flex items-center gap-1 transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>SQL'i Kopyala</span>
                    </button>
                  </div>

                  <pre className="p-3 rounded-2xl bg-black/60 border border-white/10 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`CREATE TABLE IF NOT EXISTS portfolyo_ayarlar (
  id TEXT PRIMARY KEY,
  icerik JSONB NOT NULL,
  guncellenme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE portfolyo_ayarlar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Portfolyo verisini herkes okuyabilir" 
ON portfolyo_ayarlar FOR SELECT 
USING (true);

CREATE POLICY "Anon key veya admin güncelleyebilir" 
ON portfolyo_ayarlar FOR ALL 
USING (true)
WITH CHECK (true);`}
                  </pre>
                </div>

              </div>
            )}

          </div>

        </div>
      </main>

    </div>
  );
};
