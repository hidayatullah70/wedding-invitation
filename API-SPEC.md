# API SPEC — Wedding Invitation Website

> Status: Kontrak awal, backend belum termasuk implementasi | Versi: 1.0

## 1. Tujuan dan Batas
Dokumen ini menetapkan kontrak integrasi frontend untuk RSVP dan ucapan. Frontend dibangun dengan React + Vite + Tailwind CSS. Backend, database, autentikasi admin, deployment API, dan penyedia layanan belum ditentukan dan tidak termasuk pekerjaan awal frontend.

Jika API belum tersedia, aplikasi boleh berjalan dalam **demo mode** dengan data contoh lokal. Demo mode wajib diberi penanda dan tidak boleh mengklaim data telah tersimpan ke server.

## 2. Konvensi
- Base URL dari environment: `VITE_API_BASE_URL`.
- Prefix versi: `/api/v1`.
- Format request/response: JSON UTF-8.
- Tanggal/waktu API: ISO 8601; waktu acara menyertakan zona waktu.
- HTTPS wajib pada production.
- ID berupa string/UUID.
- Semua endpoint publik tetap menerapkan rate limiting dan validasi server.

## 3. Endpoint Publik

### GET `/public/invitation`
Mengambil konfigurasi undangan yang boleh dipublikasikan.

Response `200`:
```json
{
  "data": {
    "slug": "nama-pasangan",
    "couple": { "partnerOne": "Nama A", "partnerTwo": "Nama B" },
    "event": {
      "timezone": "Asia/Jakarta",
      "ceremonyAt": "2027-06-12T08:00:00+07:00",
      "receptionAt": "2027-06-12T11:00:00+07:00",
      "venueName": "Nama Gedung",
      "address": "Alamat acara",
      "mapUrl": "https://maps.google.com/..."
    },
    "rsvp": { "enabled": true, "maxGuests": 5 },
    "guestbook": { "enabled": true }
  }
}
```

### POST `/public/rsvps`
Request:
```json
{
  "guestName": "Nama Tamu",
  "attendance": "attending",
  "guestCount": 2,
  "message": "Sampai bertemu"
}
```
Rules:
- `guestName`: wajib, 2–100 karakter.
- `attendance`: `attending` atau `not_attending`.
- `guestCount`: integer; wajib 1..maxGuests saat attending; 0 saat not_attending.
- `message`: opsional, maksimal 500 karakter.
- Server melakukan validasi ulang dan rate limiting.

Response `201`:
```json
{ "data": { "id": "uuid", "status": "received" } }
```

### GET `/public/guestbook?page=1&limit=10`
Response `200`:
```json
{
  "data": [
    { "id": "uuid", "guestName": "Nama Tamu", "message": "Selamat!", "createdAt": "2027-05-01T10:00:00+07:00" }
  ],
  "meta": { "page": 1, "limit": 10, "total": 1 }
}
```
Hanya ucapan yang disetujui/layak tampil oleh kebijakan server yang boleh dikirim.

### POST `/public/guestbook`
Request:
```json
{ "guestName": "Nama Tamu", "message": "Selamat menempuh hidup baru!" }
```
Rules: nama 2–100 karakter; pesan 2–500 karakter. Server menyimpan sebagai pending atau published sesuai kebijakan moderasi.

Response `201`:
```json
{ "data": { "id": "uuid", "status": "received" } }
```

## 4. Error Contract
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Periksa kembali data yang dikirim.",
    "fields": { "guestName": "Nama wajib diisi." }
  }
}
```
Status umum: `400` malformed request, `422` validation, `429` rate limit, `500` server error, `503` service unavailable. Frontend tidak menampilkan stack trace atau detail internal.

## 5. Frontend Integration Rules
- API client terpusat; jangan menyebar `fetch()` di komponen UI.
- Base URL dibaca dari environment, tidak hardcode.
- Tangani timeout/network failure dan parsing response.
- Disable submit selama request berjalan.
- Cegah double submit.
- Pertahankan input ketika request gagal.
- Jangan menyimpan data sensitif pada localStorage.
- Jangan masukkan nomor rekening, token, atau secret ke source control.
- Endpoint dan payload harus mengikuti kontrak ini; perubahan perlu memperbarui dokumen sebelum implementasi.

## 6. Demo Mode
- Demo mode menggunakan mock adapter/data lokal yang terisolasi dari adapter API.
- Tampilkan indikator “Mode demo — data tidak dikirim ke server”.
- RSVP/ucapan demo tidak boleh disamarkan sebagai data persisten.
- Gunakan interface/service yang sama agar perpindahan ke API tidak mengubah komponen presentasi.

## 7. Di Luar Kontrak Ini
Admin CRUD, login, dashboard, upload media, payment gateway, notifikasi WhatsApp/email, analytics, dan multi-invitation API tidak didefinisikan pada fase ini.
