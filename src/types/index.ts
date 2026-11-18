export interface SosyalMedya {
  platform: string;
  link: string;
  ikon: string;
}

export interface ProfilVerisi {
  isim: string;
  unvan: string;
  universite: string;
  biyografi: string;
  avatarUrl: string;
  eposta: string;
  lokasyon: string;
  sosyalMedya: SosyalMedya[];
}

export interface NowStatus {
  calisilanKonu: string;
  calanMuzik: string;
  kahveSayisi: number;
  okunanKaynak: string;
  durumMesaji: string;
  kampus: string;
}

export interface SutunBecerisi {
  id: string;
  baslik: string;
  ikon: string;
  kisaAciklama: string;
  detay: string;
  etiketler: string[];
}

export interface Proje {
  id: string;
  baslik: string;
  kategori: string;
  kisaOzet: string;
  hikaye: string; // "Neden yaptım?" hikayesi
  teknolojiler: string[];
  resimUrl: string;
  canliLink?: string;
  githubLink?: string;
  oneCikan: boolean;
}

export interface TelefonUygulamasi {
  id: string;
  isim: string;
  ikon: string;
  baslik: string;
  icerik: string;
  baglantiUrl?: string;
  baglantiMetni?: string;
}

export interface TemaAyarlari {
  vurguRengi: string; // hex
  ikincilRenk: string;
  koyuMod: boolean;
}

export interface PortfolyoVerisi {
  profil: ProfilVerisi;
  now: NowStatus;
  sutunlar: SutunBecerisi[];
  projeler: Proje[];
  telefonUygulamalari: TelefonUygulamasi[];
  tema: TemaAyarlari;
}
