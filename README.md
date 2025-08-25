# Gelişmiş Portföy ve Blog Platformu

Bu proje, **Next.js**, **Payload CMS** ve **Google Genkit** kullanılarak oluşturulmuş modern ve zengin özelliklere sahip bir kişisel portföy ve blog platformudur. Sadece projeleri ve yazıları sergilemekle kalmaz, aynı zamanda yapay zeka destekli özellikler ve oyunlaştırma (gamification) elementleri ile interaktif bir kullanıcı deneyimi sunar.

## ✨ Öne Çıkan Özellikler

- **Modern Frontend:** **Next.js 15 App Router** ve **React** ile oluşturulmuş hızlı ve SEO dostu bir yapı.
- **Headless CMS:** **Payload CMS** ile projeler, yazılar ve diğer veriler için esnek ve güçlü bir içerik yönetimi.
- **Yapay Zeka Entegrasyonu (Google Genkit):**
    - **Portföy Asistanı:** Projeleriniz hakkında soruları yanıtlayan ve ziyaretçilere rehberlik eden bir yapay zeka sohbet botu.
    - **Otomatik Etiketleme:** İçeriklerinize otomatik olarak ilgili etiketler öneren bir AI aracı.
- **İnteraktif Bileşenler:**
    - Filtrelenebilir portföy galerisi ve detaylı proje sayfaları.
    - Becerileri görselleştiren grafikler (`SkillsChart`).
    - Projelerin konumlarını gösteren interaktif bir harita (`ProjectMap`).
- **Oyunlaştırma (Gamification):** Kullanıcı etkileşimini artırmak için tasarlanmış rozet ve ödül sistemi.
- **Tasarım ve Arayüz:** **Tailwind CSS** ve **shadcn/ui** ile oluşturulmuş modern, duyarlı ve erişilebilir bir tasarım. Açık ve koyu tema desteği mevcuttur.
- **Google Cloud için Optimize Edildi:** `apphosting.yaml` dosyası ile Google Cloud App Hosting üzerinde kolayca dağıtılabilir.

## 🛠️ Teknoloji Stack'i

- **Frontend:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui, Radix UI
- **Backend & CMS:** Payload CMS
- **Yapay Zeka:** Google Genkit, Google AI
- **Deployment:** Google Cloud App Hosting

## 🚀 Yerel Geliştirme Ortamını Başlatma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

2.  **Gerekli Ortam Değişkenlerini (`.env.local`) Ayarlayın:**
    *   Payload CMS için bağlantı bilgileri.
    *   Google Genkit için API anahtarları.

3.  **Geliştirme Sunucusunu Başlatın:**
    Uygulamayı ve Genkit servislerini aynı anda başlatmak için:
    ```bash
    npm run dev
    ```
    Uygulama `http://localhost:9002` adresinde çalışacaktır.
