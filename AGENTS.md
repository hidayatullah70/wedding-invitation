# AGENTS.md — Contract for AI Coding Agent

## 1. Mission
Bangun website undangan pernikahan digital sesuai dokumen SOT di repository ini. Bertindak sebagai implementer yang disiplin: analisis singkat, perubahan terarah, validasi, dan laporan hasil.

## 2. Source of Truth
Baca dan patuhi:
1. `PRD.md` — scope dan acceptance criteria.
2. `USER-FLOW.md` — alur dan state pengguna.
3. `UI-GUIDELINE.md` — visual, responsive, accessibility.
4. `API-SPEC.md` — kontrak integrasi.
5. `IMPLEMENTATION-PLAN.md` — urutan kerja dan quality gates.

Jangan membuat dokumen SOT tambahan tanpa instruksi eksplisit. Jika ada konflik, jangan menebak: jelaskan konflik dan minta keputusan atau pilih aturan yang lebih spesifik bila konflik dapat diselesaikan dari dokumen.

## 3. Scope Guard
- Stack frontend: HTML semantik, React, Vite, Tailwind CSS.
- Fokus: website undangan satu pasangan, bukan SaaS atau dashboard admin.
- Jangan menambahkan backend/database/auth/payment/WhatsApp automation kecuali diminta.
- Jangan mengganti stack atau menambahkan library besar tanpa alasan teknis yang jelas.
- Jangan menyalin source code, aset, identitas, atau data pribadi dari repository referensi. Referensi hanya untuk pola fitur/struktur pengalaman.
- Jangan membuat data pasangan, alamat, jadwal, rekening, atau foto palsu seolah-olah nyata. Gunakan placeholder yang jelas.

## 4. Working Rules
- Sebelum mengubah file, periksa struktur dan teknologi yang sudah ada.
- Jangan menghapus atau menimpa pekerjaan pengguna yang tidak terkait.
- Implementasikan satu tahap pada satu waktu sesuai `IMPLEMENTATION-PLAN.md`.
- Gunakan komponen reusable secukupnya; hindari overengineering.
- Pisahkan data undangan dari komponen presentasi.
- Gunakan satu API/service layer untuk request.
- Semua state interaktif harus memiliki loading, success, error, dan empty state yang sesuai.
- Jangan mengklaim data tersimpan permanen jika API belum tersedia.
- Jangan mengaktifkan autoplay audio.
- Jaga aksesibilitas, responsive behavior, dan performa gambar.

## 5. Code Quality
- Gunakan nama komponen/variabel yang jelas dan konsisten.
- Hindari duplikasi markup dan logic.
- Jangan menaruh token/secret di frontend atau repository.
- Validasi input di frontend untuk UX; jangan menganggapnya pengganti validasi server.
- Hindari `any`/suppressions yang tidak perlu jika TypeScript digunakan.
- Hapus console/debug code sebelum selesai.
- Jangan menambahkan dependency jika fitur dapat dibuat sederhana dengan platform bawaan.

## 6. Design Rules
- Terapkan palet blush pink + soft blue + ivory dengan aksen rose/champagne sesuai UI guideline.
- Jangan memenuhi halaman dengan card atau ornamen.
- Prioritaskan keterbacaan teks dan foto pasangan.
- Semua section harus responsif dan tidak overflow.
- Hormati `prefers-reduced-motion`.
- Kontrol interaktif harus usable dengan keyboard dan touch.

## 7. Execution Protocol
Untuk setiap tugas:
1. Identifikasi tahap dan acceptance criteria terkait.
2. Periksa file yang relevan.
3. Berikan rencana singkat bila perubahan lintas file/berisiko.
4. Implementasikan hanya scope yang diminta.
5. Jalankan pemeriksaan yang tersedia (lint, test, build).
6. Perbaiki error yang disebabkan perubahan.
7. Laporkan hasil, file berubah, command verifikasi, dan item yang belum selesai.

## 8. Stop Conditions
Berhenti dan minta klarifikasi bila:
- Data penting (nama, tanggal, lokasi, aset) diperlukan tetapi belum tersedia.
- API backend belum tersedia dan tugas meminta penyimpanan permanen.
- Ada konflik antar dokumen SOT.
- Perubahan memerlukan layanan berbayar, kredensial, atau akses eksternal.
- Instruksi berpotensi menghapus data/proyek pengguna.

## 9. Final Response Format
- Status: selesai / parsial / terblokir.
- Ringkasan implementasi.
- File yang dibuat/diubah.
- Perintah menjalankan dan verifikasi.
- Hasil lint/test/build.
- Batasan atau keputusan yang masih menunggu.
