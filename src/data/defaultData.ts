import { PortfolyoVerisi } from '../types';

export const varsayilanPortfolyoVerisi: PortfolyoVerisi = {
  profil: {
    isim: "Mustafa Hali",
    unvan: "Bilgisayar Mühendisliği Öğrencisi & Yazılım Geliştirici",
    universite: "İstanbul Gedik Üniversitesi",
    biyografi: "Robotik PR sloganları yerine doğrudan gerçeği söyleyeyim: Zamanımın bir kısmı C ve C++ ile bellek sızıntıları, veri yapıları ve algoritmaları çözerek makineyi anlamakla geçiyor. Diğer yarısında ise Kotlin ve Android ekosisteminde, modern yapay zeka modellerini insan hayatını kolaylaştıracak mobil araçlara dönüştürüyorum.",
    avatarUrl: "https://images.unsplash.com/photo-1534972195531-a756b1129f63?q=80&w=800",
    eposta: "241041127@stu.gedik.edu.tr",
    lokasyon: "İstanbul, Türkiye",
    sosyalMedya: [
      {
        platform: "GitHub",
        link: "https://github.com/MustafaHali1",
        ikon: "Github"
      },
      {
        platform: "LinkedIn",
        link: "https://www.linkedin.com/in/mustafa-hali-54270b367/",
        ikon: "Linkedin"
      },
      {
        platform: "Instagram",
        link: "https://www.instagram.com/15mustiiii17/",
        ikon: "Instagram"
      }
    ]
  },
  now: {
    calisilanKonu: "Android SDK & Jetpack Compose Mimarileri",
    calanMuzik: "Synthwave / Lo-Fi Beats",
    kahveSayisi: 3,
    okunanKaynak: "Modern Android Architecture & Coroutines Docs",
    durumMesaji: "Staj ve yenilikçi projelere açık",
    kampus: "Gedik Kampüsü, Kartal"
  },
  sutunlar: [
    {
      id: "genel-yazilim",
      baslik: "Genel Yazılım & Mühendislik",
      ikon: "Terminal",
      kisaAciklama: "C, C++, C# ile algoritmik derinlik, bellek yönetimi ve sistem tasarımı.",
      detay: "Düşük seviyeli bellek kontrolleri, işaretçiler, veri yapıları (ağaçlar, bağlı listeler) ve nesne yönelimli mimariler.",
      etiketler: ["C", "C++", "C#", "Algoritmalar", "Veri Yapıları", "Clean Code"]
    },
    {
      id: "mobil-yazilim",
      baslik: "Mobil Uygulama Geliştirme",
      ikon: "Smartphone",
      kisaAciklama: "Kotlin ve Android SDK ile kullanıcı dostu, akıcı ve kararlı mobil deneyimler.",
      detay: "Modern Android geliştirme: Jetpack Compose, MVVM mimarisi, Coroutines, Room ve arka plan servisleri.",
      etiketler: ["Kotlin", "Android SDK", "Jetpack Compose", "MVVM", "Coroutines"]
    },
    {
      id: "yapay-zeka",
      baslik: "Yapay Zeka (AI) Entegrasyonları",
      ikon: "Brain",
      kisaAciklama: "Büyük dil modelleri (LLM) ve yapay zeka ajanlarını gerçek mobil & web sistemlerine bağlama.",
      detay: "Uygulamalara zeka katan API entegrasyonları, akıllı asistanlar ve veri işleme çözümleri.",
      etiketler: ["GenAI", "LLM APIs", "Model Integration", "Prompt Engineering"]
    }
  ],
  projeler: [
    {
      id: "dogum-gunu-kutlama",
      baslik: "Doğum Günü Kutlama Sitesi",
      kategori: "Web & Etkileşim",
      kisaOzet: "Dinamik görsel efektler ve kişiselleştirilmiş mesajlarla hazırlanan etkileşimli web projesi.",
      hikaye: "Bir arkadaşımın doğum günü için standart hazır bir hediye almak ya da sıradan bir mesaj atmak yerine, tarayıcıda açtığında konfetiler patlatan, etkileşimli ve kişisel bir sayfa kodlamak istedim. HTML5 Canvas ve JavaScript kullanarak sıfırdan geliştirdim.",
      teknolojiler: ["HTML5", "CSS3 Canvas", "JavaScript ES6", "Vercel"],
      resimUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000",
      canliLink: "https://dogumgunu-zeta.vercel.app/",
      githubLink: "https://github.com/MustafaHali1/dogum-gunu-sitesi",
      oneCikan: true
    },
    {
      id: "algoritma-ve-lab",
      baslik: "Algoritma ve Veri Yapıları Deposu",
      kategori: "Bilgisayar Mühendisliği",
      kisaOzet: "C ve C++ ile geliştirilmiş temel veri yapıları ve algoritma uygulamaları.",
      hikaye: "Üniversite derslerinde öğrendiğim teorik bilgisayar bilimi kavramlarını sadece sınav için değil, gerçekten kalıcı olması için kodlayarak açık kaynak tuttuğum laboratuvar kütüphanesi.",
      teknolojiler: ["C", "C++", "Veri Yapıları", "Algoritmalar"],
      resimUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000",
      githubLink: "https://github.com/MustafaHali1",
      oneCikan: true
    }
  ],
  telefonUygulamalari: [
    {
      id: "dogumgunu",
      isim: "Kutlama App",
      ikon: "🎂",
      baslik: "Doğum Günü Kutlama Projesi",
      icerik: "Arkadaşıma kodla hazırladığım sürpriz kutlama sitesi. Basit ama çok samimi ve tebessüm ettiren bir çalışma oldu.",
      baglantiUrl: "https://dogumgunu-zeta.vercel.app/",
      baglantiMetni: "Siteyi Canlı Gör ↗"
    },
    {
      id: "notlar",
      isim: "Geliştirici Notu",
      ikon: "📝",
      baslik: "Bugünkü Geliştirici Notu",
      icerik: "C++'ta bellek işaretçileriyle çalışırken segfault almamak için dikkat etmem gereken bellek tahsisi ve serbest bırakma kurallarını not aldım.",
      baglantiMetni: "Notları İncele"
    },
    {
      id: "araclar",
      isim: "Araçlarım",
      ikon: "🛠️",
      baslik: "Aktif Kullandığım Ortam",
      icerik: "Android Studio, Jetpack, GCC/Clang, VS Code, Git, Supabase, Linux.",
      baglantiMetni: "Stack Bilgisi"
    },
    {
      id: "kahve",
      isim: "Kahve & Sohbet",
      ikon: "☕",
      baslik: "Bir Kahve İçelim",
      icerik: "Staj fırsatları, mobil projeler, yapay zeka veya sadece yazılım sohbeti için her zaman açığım.",
      baglantiUrl: "mailto:241041127@stu.gedik.edu.tr",
      baglantiMetni: "Bana E-Posta Yaz ✉️"
    }
  ],
  tema: {
    vurguRengi: "#6366f1",
    ikincilRenk: "#06b6d4",
    koyuMod: true
  }
};
