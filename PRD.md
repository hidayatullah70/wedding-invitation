# PRD — Wedding Invitation Website

> Status: Baseline SOT | Versi: 1.0 | Bahasa: Indonesia

## 1. Ringkasan Produk
Website undangan pernikahan digital satu halaman (single-page experience) yang romantis, modern, responsif, dan mudah dibagikan melalui tautan. Pengalaman utama dimulai dari sampul undangan, lalu tamu membuka undangan untuk melihat detail acara, mengenal pasangan, melihat galeri, mengirim RSVP, dan membaca ucapan.

## 2. Tujuan
- Menyajikan undangan digital yang personal dan mudah diakses melalui ponsel.
- Menyampaikan informasi acara secara jelas.
- Memudahkan tamu mengonfirmasi kehadiran dan mengirim ucapan.
- Menyediakan informasi hadiah digital secara opsional.
- Menjaga performa, aksesibilitas, dan kemudahan kustomisasi konten.

## 3. Target Pengguna
1. **Tamu undangan:** membuka tautan, membaca detail acara, melihat lokasi, mengirim RSVP/ucapan.
2. **Pasangan/pemilik undangan:** menyediakan data pasangan, jadwal, foto, rekening/tautan hadiah, dan tautan undangan untuk dibagikan.

## 4. Ruang Lingkup MVP
### Termasuk
- Cover/hero pembuka dengan nama pasangan, tanggal, nama penerima opsional, dan tombol "Buka Undangan".
- Countdown menuju tanggal acara.
- Navigasi anchor yang ramah mobile.
- Profil mempelai pria dan wanita.
- Detail akad/resepsi: tanggal, waktu, alamat, tautan peta.
- Love story berbentuk timeline.
- Galeri foto dengan tampilan pembesar/lightbox.
- RSVP: nama, status hadir/tidak hadir, jumlah tamu, catatan opsional.
- Ucapan dan doa.
- Hadiah digital: rekening/e-wallet/QR opsional dengan tombol salin.
- Musik latar opsional dengan kontrol play/pause; tidak autoplay sebelum interaksi pengguna.
- Footer dan tautan sosial opsional.
- Metadata dasar, responsive layout, loading/error/empty states.

### Tidak termasuk
- Dashboard admin/CMS.
- Login dan manajemen akun.
- Pembayaran online atau pemrosesan transaksi hadiah.
- Sistem multi-tenant atau generator undangan massal.
- Backend/database yang sudah berjalan, hosting, domain, dan integrasi layanan pihak ketiga.
- Fitur chat real-time, analytics lanjutan, dan notifikasi WhatsApp otomatis.

## 5. Prinsip Produk
- Mobile-first: mayoritas interaksi harus nyaman di layar ponsel.
- Content-first: informasi acara harus mudah ditemukan.
- Personalizable: konten pasangan dan acara dipisahkan dari komponen presentasi.
- Progressive enhancement: konten utama tetap dapat dibaca ketika fitur opsional gagal.
- Privacy-aware: data RSVP/ucapan tidak menampilkan data pribadi yang tidak diperlukan.

## 6. Konten dan Data Konfigurasi
Data minimal: nama pasangan, foto pasangan, nama orang tua (opsional), tanggal/waktu acara, zona waktu, lokasi, koordinat/tautan peta, deskripsi cerita, daftar foto, pengaturan RSVP, daftar ucapan, data hadiah opsional, musik opsional, dan tautan sosial.

Nama pasangan, tanggal, lokasi, rekening, foto, dan teks contoh wajib dianggap placeholder sampai diganti pemilik undangan. Jangan memakai data pribadi dari repository referensi.

## 7. Kriteria Keberhasilan
- Semua bagian utama dapat diakses di viewport mobile 360px dan desktop.
- Tombol buka undangan, navigasi, peta, salin rekening, kontrol musik, RSVP, dan ucapan berfungsi sesuai kontrak.
- Tidak ada overflow horizontal pada ukuran layar yang didukung.
- Form memberikan validasi dan feedback yang jelas.
- Countdown menghitung berdasarkan tanggal dan zona waktu yang dikonfigurasi.
- Build produksi berhasil tanpa error atau warning kritis.

## 8. Asumsi dan Keputusan
- Frontend: HTML semantik, React, Vite, Tailwind CSS.
- Bahasa konten awal: Bahasa Indonesia.
- Satu undangan untuk satu pasangan (single instance).
- Data konten awal dapat disimpan dalam konfigurasi lokal. Pengiriman RSVP/ucapan membutuhkan endpoint API sesuai `API-SPEC.md`; bila backend belum tersedia, gunakan mode demo yang dinyatakan jelas dan jangan berpura-pura data telah tersimpan permanen.
- Zona waktu acara wajib eksplisit, default konfigurasi `Asia/Jakarta` hanya sebagai nilai awal yang dapat diubah.

## 9. Acceptance Criteria
- [ ] Tamu dapat membuka cover dan masuk ke konten undangan.
- [ ] Semua section pada daftar MVP tampil dan responsif.
- [ ] Detail acara dan tautan peta menggunakan data konfigurasi, bukan teks hardcoded tersebar.
- [ ] Countdown menangani tanggal lampau dengan status acara telah berlangsung.
- [ ] RSVP memvalidasi input sebelum request.
- [ ] Ucapan dapat dikirim dan daftar ucapan memiliki loading, empty, success, dan error state.
- [ ] Data rekening dapat disalin dan memberikan feedback.
- [ ] Musik hanya berjalan setelah interaksi eksplisit pengguna.
- [ ] Gambar memiliki alt text yang relevan dan ukuran yang dioptimalkan.
