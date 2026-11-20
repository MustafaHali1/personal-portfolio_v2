import { createClient } from '@supabase/supabase-js';
import { PortfolyoVerisi } from '../types';
import { varsayilanPortfolyoVerisi } from '../data/defaultData';

const LOCAL_STORAGE_KEY = 'mustafahali_portfolio_data_v2';
const SUPABASE_CONFIG_KEY = 'mustafahali_supabase_config_v2';

const temizleUrl = (rawUrl: string): string => {
  if (!rawUrl) return '';
  return rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
};

// Local storage'dan veya env'den Supabase yapılandırmasını al
export const getSupabaseConfig = () => {
  const localConfig = localStorage.getItem(SUPABASE_CONFIG_KEY);
  if (localConfig) {
    try {
      const parsed = JSON.parse(localConfig);
      return {
        url: temizleUrl(parsed.url || ''),
        anonKey: (parsed.anonKey || '').trim()
      };
    } catch (e) {
      // fallback
    }
  }

  return {
    url: temizleUrl(import.meta.env.VITE_SUPABASE_URL || ''),
    anonKey: (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()
  };
};

export const saveSupabaseConfig = (url: string, anonKey: string) => {
  localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify({ url: temizleUrl(url), anonKey: anonKey.trim() }));
};

// İstemci oluşturucu
export const getSupabaseClient = () => {
  const config = getSupabaseConfig();
  if (config.url && config.anonKey) {
    try {
      return createClient(config.url, config.anonKey);
    } catch (err) {
      console.warn("Supabase başlatma hatası:", err);
      return null;
    }
  }
  return null;
};

export const isSupabaseConfigured = (): boolean => {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey && config.url.startsWith('https://'));
};

// Veriyi Getir (Supabase -> LocalStorage -> Varsayılan)
export const veriYukle = async (): Promise<PortfolyoVerisi> => {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('portfolyo_ayarlar')
        .select('icerik')
        .eq('id', 'ana_veri')
        .single();

      if (!error && data && data.icerik) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.icerik));
        return data.icerik as PortfolyoVerisi;
      }
    } catch (err) {
      console.warn("Supabase'den veri çekilemedi, yerel önbellek kullanılıyor:", err);
    }
  }

  // LocalStorage kontrolü
  const kayitliVeri = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (kayitliVeri) {
    try {
      return JSON.parse(kayitliVeri);
    } catch (e) {
      console.error("Yerel veri parse hatası:", e);
    }
  }

  return varsayilanPortfolyoVerisi;
};

// Veriyi Kaydet (LocalStorage + Varsa Supabase)
export const veriKaydet = async (yeniVeri: PortfolyoVerisi): Promise<{ basarili: boolean; supabaseGuncellendi: boolean; hata?: string }> => {
  try {
    // 1. Önce LocalStorage'a yaz (kesintisiz çalışır)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(yeniVeri));

    // 2. Varsa Supabase'e yaz
    const supabase = getSupabaseClient();
    if (supabase) {
      const { error } = await supabase
        .from('portfolyo_ayarlar')
        .upsert({
          id: 'ana_veri',
          icerik: yeniVeri,
          guncellenme_tarihi: new Date().toISOString()
        });

      if (error) {
        return { basarili: true, supabaseGuncellendi: false, hata: error.message };
      }
      return { basarili: true, supabaseGuncellendi: true };
    }

    return { basarili: true, supabaseGuncellendi: false };
  } catch (err: any) {
    return { basarili: false, supabaseGuncellendi: false, hata: err?.message || 'Bilinmeyen hata' };
  }
};
