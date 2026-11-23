# UI GUIDELINE — Wedding Invitation Website

> Status: Baseline SOT | Versi: 1.0

## 1. Art Direction
Romantis, modern, ringan, editorial, dan youthful (Gen Z) tanpa terasa kekanak-kanakan. Kombinasikan tipografi serif/display yang ekspresif dengan sans-serif yang bersih. Gunakan ornamen floral/line-art secara hemat; foto pasangan menjadi fokus visual utama.

## 2. Design Tokens
| Token | Nilai | Penggunaan |
|---|---|---|
| `color-blush` | `#F4B6C2` | Pink utama |
| `color-blue` | `#A9C7E8` | Biru pendamping |
| `color-rose` | `#C86B83` | Aksen dan CTA |
| `color-ivory` | `#FFF9F5` | Latar utama |
| `color-champagne` | `#E8D5B7` | Ornamen/garis |
| `color-ink` | `#374151` | Teks utama |
| `color-muted` | `#6B7280` | Teks sekunder |
| `color-white` | `#FFFFFF` | Surface |

Kontras teks harus tetap terbaca. Jangan gunakan pink muda atau biru muda sebagai warna teks kecil di atas latar putih. Gunakan `color-ink` atau `color-rose` untuk teks penting.

## 3. Typography
- Display/heading: serif elegan (contoh: Cormorant Garamond atau Playfair Display).
- Body/UI: sans-serif modern (contoh: Inter atau Manrope).
- Script dekoratif hanya untuk aksen nama/monogram, bukan paragraf atau informasi acara.
- Maksimal 2 keluarga font utama + 1 font aksen opsional.
- Gunakan ukuran responsif dan line-height nyaman dibaca.

## 4. Layout dan Komposisi
- Mobile-first, container terpusat, lebar baca paragraf dibatasi.
- Hero/cover memiliki focal point jelas, overlay cukup untuk keterbacaan.
- Gunakan whitespace; hindari semua section memakai card.
- Variasikan latar ivory, putih, blush sangat lembut, dan biru pucat.
- Section berurutan: Cover, Intro/Profil, Detail Acara, Love Story, Gallery, RSVP & Ucapan, Gift, Footer.
- Sticky/bottom navigation opsional hanya jika tidak menutupi konten atau CTA.

## 5. Komponen
- **Cover:** foto/tekstur latar, overlay, monogram/nama, tanggal, penerima opsional, CTA.
- **Countdown:** unit hari/jam/menit/detik; angka mudah dibaca; fallback ketika acara lewat.
- **Couple profile:** foto konsisten rasio/aspect, nama, orang tua opsional.
- **Event card:** label akad/resepsi, tanggal, jam, lokasi, CTA peta.
- **Timeline:** urutan kronologis, tanggal, judul, deskripsi, foto opsional.
- **Gallery:** grid responsif, lazy loading, lightbox dengan tombol close dan navigasi keyboard.
- **Form:** label permanen, helper/error text, focus ring, disabled/loading state.
- **Guestbook:** list ucapan dengan wrapping teks dan empty state.
- **Gift item:** nama bank/e-wallet, nomor, pemilik, tombol salin; data sensitif hanya tampil jika pemilik mengaktifkan.
- **Audio control:** tombol play/pause yang memiliki accessible name dan status.
- **Footer:** ucapan penutup dan kredit opsional.

## 6. Interaksi dan Motion
- Transisi singkat dan halus; hindari animasi berlebihan.
- Reveal-on-scroll opsional dan tidak boleh menyembunyikan konten jika JavaScript gagal.
- Hormati `prefers-reduced-motion`.
- Tidak ada autoplay audio.
- Semua kontrol memiliki hover, focus-visible, active, disabled, dan loading state yang relevan.

## 7. Responsive Rules
- 360–639px: satu kolom utama, tombol lebar memadai, teks tidak terlalu kecil.
- 640–1023px: grid 2 kolom bila sesuai.
- 1024px ke atas: container terukur, profil pasangan dan event dapat berdampingan.
- Hindari fixed width yang menyebabkan overflow.
- Uji minimal 360px, 390px, 768px, 1024px, dan 1440px.

## 8. Accessibility
- Gunakan landmark dan heading berurutan.
- Semua gambar informatif memiliki alt; gambar dekoratif alt kosong.
- Form memakai label dan pesan error yang terhubung.
- Focus keyboard terlihat; lightbox dapat ditutup dengan Escape.
- Kontras memenuhi WCAG AA sejauh memungkinkan.
- Jangan menyampaikan status hanya melalui warna.
- Tombol dan link memiliki nama aksesibel.

## 9. Asset Rules
- Foto pasangan milik pemilik undangan; jangan mengambil foto dari repository contoh.
- Gunakan format WebP/AVIF bila tersedia, fallback yang sesuai.
- Berikan dimensi eksplisit, lazy-load gambar di luar viewport awal.
- Jangan mengandalkan URL gambar acak atau sumber yang tidak stabil.
