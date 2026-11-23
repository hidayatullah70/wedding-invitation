/**
 * Membaca parameter nama tamu opsional dari query string (?to=Nama%20Tamu).
 * Mendukung karakter "&" yang belum di-encode (mis. ?to=Juli%20Priyanto%20&%20Istri)
 * selama potongan setelah "&" bukan pasangan parameter lain (key=value).
 */
export function parseGuestNameFromSearch(search, fallbackName = '') {
  if (!search || typeof search !== 'string') return fallbackName;

  const trimmed = search.startsWith('?') ? search.slice(1) : search;
  if (!trimmed) return fallbackName;

  const segments = trimmed.split('&');
  const toIndex = segments.findIndex((seg) => /^to=/i.test(seg));
  if (toIndex === -1) return fallbackName;

  const collected = [segments[toIndex].slice(3)];
  for (let i = toIndex + 1; i < segments.length; i += 1) {
    if (segments[i].includes('=')) break;
    collected.push(segments[i]);
  }

  const rawJoined = collected.join('&').replace(/\+/g, ' ');
  let decoded = rawJoined;
  try {
    decoded = decodeURIComponent(rawJoined);
  } catch {
    decoded = rawJoined;
  }

  const cleaned = decoded.trim().replace(/\s+/g, ' ').slice(0, 80);
  return cleaned.length > 0 ? cleaned : fallbackName;
}

export function getGuestNameFromUrl(fallbackName = '') {
  if (typeof window === 'undefined') return fallbackName;
  return parseGuestNameFromSearch(window.location.search, fallbackName);
}

/**
 * Menentukan sapaan/pronoun tamu berdasarkan inputan ?to=
 * - Mengandung "& Istri", "dan Istri", "& Suami", "dan Suami" -> "Bapak/Ibu"
 * - Diawali "Bapak", "Ibu", "Saudara", atau "Saudari" -> pakai nilai ?to= apa adanya
 * - Selain itu / kosong -> fallback default ("Bapak/Ibu/Saudara/i")
 */
export function resolveGuestPronoun(
  urlGuestName,
  defaultPronoun = 'Bapak/Ibu/Saudara/i'
) {
  if (!urlGuestName || typeof urlGuestName !== 'string') {
    return defaultPronoun;
  }

  const cleaned = urlGuestName.trim().replace(/\s+/g, ' ');
  if (!cleaned) return defaultPronoun;

  if (/(?:\s|^)(?:&|dan)\s+(?:istri|suami)\b/i.test(cleaned)) {
    return 'Bapak/Ibu';
  }

  if (/^(?:bapak|ibu|saudara|saudari)\b/i.test(cleaned)) {
    return cleaned;
  }

  return defaultPronoun;
}

export function applyGuestPronoun(template, pronoun) {
  if (!template) return '';
  return template.replaceAll('{guestPronoun}', pronoun);
}

export function formatWishDate(isoString, timezone = 'Asia/Jakarta') {
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: timezone,
    }).format(date);
  } catch {
    return '';
  }
}
