/**
 * Konfigurasi Konten Undangan Pernikahan (Single Source of Config)
 *
 * PENTING:
 * Seluruh data di bawah ini adalah PLACEHOLDER sesuai PRD.md & AGENTS.md.
 * Ganti setiap nilai placeholder dengan data asli milik pasangan sebelum produksi.
 * Jangan menaruh nomor rekening nyata, token, atau rahasia di source control.
 */

export const invitationConfig = {
  slug: 'nama-pasangan-placeholder',
  meta: {
    title: 'Undangan Pernikahan — [Nama A] & [Nama B]',
    description:
      'Undangan pernikahan digital [Nama Mempelai Wanita] & [Nama Mempelai Pria].',
  },
  cover: {
    eyebrow: 'Undangan Pernikahan',
    monogram: 'A & B',
    partnerOneShort: '[Nama A]',
    partnerTwoShort: '[Nama B]',
    dateLabel: '[Hari, 12 Juni 2027]',
    greetingPrefix: 'Kepada Yth.',
    defaultGuestName: 'Bapak/Ibu/Saudara/i',
    openButtonLabel: 'Buka Undangan',
    coverImage: null, // Ganti dengan '/images/cover.webp' saat foto tersedia
    coverImageAlt: 'Foto sampul pasangan [Nama A] dan [Nama B]',
  },
  intro: {
    eyebrow: 'Bismillahirrahmanirrahim / Salam Hangat',
    quote:
      '[Teks pembuka atau kutipan pilihan pasangan — ganti sesuai preferensi acara Anda.]',
    description:
      'Dengan memohon rahmat dan rida Tuhan Yang Maha Esa, kami bermaksud mengundang {guestPronoun} untuk menghadiri hari bahagia kami.',
  },
  couple: [
    {
      id: 'partner-one',
      role: 'Mempelai Wanita',
      fullName: '[Nama Lengkap Mempelai Wanita]',
      parents: 'Putri dari Bapak [Nama Ayah] & Ibu [Nama Ibu]',
      bio: '[Deskripsi singkat opsional mengenai mempelai wanita.]',
      instagram: '', // Opsional: 'https://instagram.com/username'
      photo: null, // Ganti dengan '/images/partner-one.webp'
      photoAlt: 'Potret [Nama Lengkap Mempelai Wanita]',
    },
    {
      id: 'partner-two',
      role: 'Mempelai Pria',
      fullName: '[Nama Lengkap Mempelai Pria]',
      parents: 'Putra dari Bapak [Nama Ayah] & Ibu [Nama Ibu]',
      bio: '[Deskripsi singkat opsional mengenai mempelai pria.]',
      instagram: '', // Opsional: 'https://instagram.com/username'
      photo: null, // Ganti dengan '/images/partner-two.webp'
      photoAlt: 'Potret [Nama Lengkap Mempelai Pria]',
    },
  ],
  event: {
    timezone: 'Asia/Jakarta',
    timezoneLabel: 'WIB (Asia/Jakarta)',
    // Format ISO 8601 dengan offset zona waktu eksplisit
    targetDateIso: '2027-06-12T08:00:00+07:00',
    passedMessage: 'Acara telah berlangsung. Terima kasih atas doa dan kehadirannya.',
    schedules: [
      {
        id: 'ceremony',
        label: 'Akad Nikah / Pemberkatan',
        dateText: '[Sabtu, 12 Juni 2027]',
        timeText: '[08.00 – 10.00 WIB]',
        venueName: '[Nama Gedung / Masjid / Gereja Placeholder]',
        address: '[Alamat Lengkap Lokasi Akad, Kota, Provinsi]',
        mapUrl: '', // Ganti dengan URL Google Maps resmi milik pemilik undangan
      },
      {
        id: 'reception',
        label: 'Resepsi Pernikahan',
        dateText: '[Sabtu, 12 Juni 2027]',
        timeText: '[11.00 – 14.00 WIB]',
        venueName: '[Nama Ballroom / Venue Resepsi Placeholder]',
        address: '[Alamat Lengkap Lokasi Resepsi, Kota, Provinsi]',
        mapUrl: '', // Ganti dengan URL Google Maps resmi milik pemilik undangan
      },
    ],
  },
  story: {
    eyebrow: 'Perjalanan Kami',
    title: 'Kisah Singkat',
    subtitle: 'Momen-momen bermakna yang membawa kami ke hari ini.',
    items: [
      {
        id: 'story-1',
        date: '[Tahun / Bulan 1]',
        title: '[Pertemuan Pertama]',
        description:
          '[Ceritakan singkat bagaimana kalian pertama kali bertemu. Ganti teks placeholder ini.]',
      },
      {
        id: 'story-2',
        date: '[Tahun / Bulan 2]',
        title: '[Langkah Lebih Dekat]',
        description:
          '[Ceritakan momen penting saat hubungan mulai serius. Ganti teks placeholder ini.]',
      },
      {
        id: 'story-3',
        date: '[Tahun / Bulan 3]',
        title: '[Lamaran & Menuju Hari Bahagia]',
        description:
          '[Ceritakan momen lamaran dan persiapan menuju pernikahan. Ganti teks placeholder ini.]',
      },
    ],
  },
  gallery: {
    eyebrow: 'Galeri Momen',
    title: 'Potret Kebersamaan',
    subtitle: 'Klik foto untuk melihat tampilan penuh.',
    items: [
      {
        id: 'gal-1',
        src: null, // Ganti dengan '/images/gallery-1.webp'
        alt: 'Placeholder foto prewedding 1 — [Nama A] dan [Nama B]',
        caption: '[Keterangan Foto 1 — opsional]',
        aspect: 'aspect-[4/5]',
      },
      {
        id: 'gal-2',
        src: null,
        alt: 'Placeholder foto prewedding 2 — [Nama A] dan [Nama B]',
        caption: '[Keterangan Foto 2 — opsional]',
        aspect: 'aspect-[4/5]',
      },
      {
        id: 'gal-3',
        src: null,
        alt: 'Placeholder foto prewedding 3 — [Nama A] dan [Nama B]',
        caption: '[Keterangan Foto 3 — opsional]',
        aspect: 'aspect-[4/5]',
      },
      {
        id: 'gal-4',
        src: null,
        alt: 'Placeholder foto prewedding 4 — [Nama A] dan [Nama B]',
        caption: '[Keterangan Foto 4 — opsional]',
        aspect: 'aspect-[4/5]',
      },
    ],
  },
  rsvp: {
    enabled: true,
    maxGuests: 5,
    eyebrow: 'Konfirmasi Kehadiran',
    title: 'RSVP',
    subtitle:
      'Mohon bantu kami mempersiapkan acara dengan mengonfirmasi kehadiran Anda.',
  },
  guestbook: {
    enabled: true,
    pageSize: 10,
    eyebrow: 'Ucapan & Doa',
    title: 'Doa untuk Kami',
    subtitle: 'Tinggalkan pesan hangat atau doa terbaik untuk perjalanan baru kami.',
  },
  gift: {
    enabled: true,
    eyebrow: 'Tanda Kasih',
    title: 'Hadiah Digital',
    subtitle:
      'Kehadiran dan doa restu Anda adalah hadiah terindah. Bila berkenan memberikan tanda kasih, informasi di bawah ini dapat diaktifkan pemilik undangan.',
    notice:
      'Data di bawah ini adalah placeholder. Jangan memasukkan nomor rekening nyata ke repository publik.',
    accounts: [
      {
        id: 'gift-bank-1',
        provider: '[Nama Bank Placeholder]',
        accountNumber: '[NOMOR-REKENING-PLACEHOLDER]',
        accountHolder: 'a.n. [Nama Pemilik Rekening]',
      },
      {
        id: 'gift-ewallet-1',
        provider: '[Nama E-Wallet Placeholder]',
        accountNumber: '[NOMOR-EWALLET-PLACEHOLDER]',
        accountHolder: 'a.n. [Nama Pemilik E-Wallet]',
      },
    ],
  },
  audio: {
    enabled: true,
    title: 'Beautiful in White',
    // File berada di public/audio/wedding-beautiful-in-white.mp3
    src: '/audio/wedding-beautiful-in-white.mp3',
  },
  footer: {
    closingMessage:
      'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila {guestPronoun} berkenan hadir dan memberikan doa restu.',
    coupleSignature: '[Nama A] & [Nama B]',
    creditPrefix: 'Dibuat dengan ❤️ oleh ',
    creditLinkBrand: 'bionora',
    creditLinkAccent: 'Dev',
    creditLinkUrl: 'https://bionora.my.id/',
    socials: [
      // Opsional: tambahkan tautan sosial pasangan jika diinginkan
    ],
  },
  navigation: [
    { id: 'couple', label: 'Pasangan' },
    { id: 'event', label: 'Acara' },
    { id: 'story', label: 'Kisah' },
    { id: 'gallery', label: 'Galeri' },
    { id: 'rsvp', label: 'RSVP' },
    { id: 'guestbook', label: 'Ucapan' },
    { id: 'gift', label: 'Hadiah' },
  ],
};
