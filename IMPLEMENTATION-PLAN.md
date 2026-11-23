# IMPLEMENTATION PLAN — Wedding Invitation Website

> Status: Baseline | Versi: 1.0

## Prinsip Eksekusi
Kerjakan bertahap, validasi setiap tahap, dan jangan menambah fitur di luar `PRD.md`. Dokumen SOT menjadi acuan utama; bila ada konflik, hentikan bagian terkait dan laporkan konflik sebelum mengubah scope.

## Tahap 0 — Persiapan
- [ ] Periksa kondisi folder project dan pertahankan file pengguna.
- [ ] Pastikan Node.js dan npm tersedia.
- [ ] Siapkan React + Vite.
- [ ] Pasang dan konfigurasi Tailwind CSS sesuai versi yang dipilih.
- [ ] Buat konfigurasi environment contoh tanpa secret.
- [ ] Verifikasi dev server berjalan.

**Gate:** aplikasi React/Vite tampil tanpa error.

## Tahap 1 — Fondasi UI
- [ ] Implementasikan design tokens dan typography dari `UI-GUIDELINE.md`.
- [ ] Siapkan struktur komponen dan data konfigurasi undangan.
- [ ] Buat layout global, section wrapper, button, heading, dan responsive container.
- [ ] Terapkan semantic HTML dan accessibility baseline.

**Gate:** layout responsif dan token konsisten pada seluruh halaman.

## Tahap 2 — Konten Undangan
- [ ] Cover dan tombol buka undangan.
- [ ] Countdown dengan zona waktu eksplisit.
- [ ] Profil pasangan.
- [ ] Informasi acara dan tautan peta.
- [ ] Love story.
- [ ] Galeri dan lightbox.
- [ ] Gift section dan copy-to-clipboard.
- [ ] Footer.

**Gate:** seluruh konten utama berjalan menggunakan data konfigurasi, tanpa data contoh referensi yang dianggap data nyata.

## Tahap 3 — Interaksi
- [ ] Navigasi mobile dan anchor.
- [ ] Kontrol musik berbasis interaksi pengguna.
- [ ] Form RSVP dengan validasi.
- [ ] Guestbook dengan loading/empty/success/error state.
- [ ] Demo adapter dan API adapter sesuai `API-SPEC.md`.

**Gate:** seluruh aksi memiliki feedback dan tidak ada klaim penyimpanan palsu.

## Tahap 4 — Quality Assurance
- [ ] Uji viewport 360, 390, 768, 1024, 1440px.
- [ ] Uji keyboard navigation dan focus state.
- [ ] Uji validasi form, request gagal, timeout, dan double submit.
- [ ] Uji tanggal countdown di masa depan dan masa lalu.
- [ ] Uji link peta, copy clipboard, galeri, dan audio.
- [ ] Jalankan lint/build/test yang tersedia.
- [ ] Perbaiki error dan regression.

**Gate:** tidak ada bug blocker; build produksi berhasil.

## Tahap 5 — Handover
- [ ] Laporkan file yang dibuat/diubah.
- [ ] Laporkan command untuk menjalankan project.
- [ ] Daftarkan environment variable yang dibutuhkan.
- [ ] Nyatakan fitur yang masih demo atau menunggu backend.
- [ ] Catat keterbatasan dan keputusan yang belum ditentukan.

## Struktur Folder Awal yang Disarankan
```text
project/
├── public/
│   ├── images/
│   └── audio/
├── src/
│   ├── components/
│   ├── sections/
│   ├── data/
│   │   └── invitation.js
│   ├── services/
│   │   ├── api.js
│   │   └── invitationService.js
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```
Struktur boleh disesuaikan dengan kebutuhan nyata, tetapi jangan membuat lapisan abstraksi berlebihan untuk aplikasi satu undangan.

## Definition of Done
- Fitur sesuai PRD dan user flow.
- Tampilan sesuai UI guideline dan responsif.
- API integration mengikuti API-SPEC atau jelas ditandai demo.
- Tidak ada data rahasia atau data referensi yang tertinggal.
- Build berhasil dan hasil QA dilaporkan.
