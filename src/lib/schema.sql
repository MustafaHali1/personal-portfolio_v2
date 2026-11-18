-- ========================================================
-- Mustafa Hali Portfolio v2 — Supabase PostgreSQL Şeması
-- Supabase Dashboard -> SQL Editor kısmına yapıştırıp RUN diyebilirsiniz.
-- ========================================================

-- 1. Ayarlar ve Portfolyo Verisi Tablosu
CREATE TABLE IF NOT EXISTS portfolyo_ayarlar (
  id TEXT PRIMARY KEY,
  icerik JSONB NOT NULL,
  guncellenme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Güvenlik ve Okuma Politikası (RLS)
ALTER TABLE portfolyo_ayarlar ENABLE ROW LEVEL SECURITY;

-- Herkes okuyabilir (Portfolyo halka açık)
CREATE POLICY "Portfolyo verisini herkes okuyabilir" 
ON portfolyo_ayarlar FOR SELECT 
USING (true);

-- Anon key ile güncelleme izni (veya oturum açmış kullanıcı)
CREATE POLICY "Anon key veya admin güncelleyebilir" 
ON portfolyo_ayarlar FOR ALL 
USING (true)
WITH CHECK (true);
