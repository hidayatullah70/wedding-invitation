import { ApiError } from './api.js';

/**
 * Adapter Google Sheets (tanpa backend server) via Google Apps Script Web App.
 * - URL dibaca dari VITE_GOOGLE_SHEET_RSVP_URL di environment (.env lokal).
 * - Menggunakan Content-Type text/plain;charset=utf-8 agar tidak terblokir CORS preflight
 *   oleh Google Apps Script Web App.
 */

const DEFAULT_TIMEOUT_MS = 12000;

export function getGoogleSheetRsvpUrl() {
  const raw = import.meta.env.VITE_GOOGLE_SHEET_RSVP_URL;
  if (!raw || typeof raw !== 'string') return '';
  return raw.trim();
}

export function isGoogleSheetRsvpConfigured() {
  return getGoogleSheetRsvpUrl().length > 0;
}

export async function submitRsvpToGoogleSheet(payload) {
  const endpointUrl = getGoogleSheetRsvpUrl();
  if (!endpointUrl) {
    throw new ApiError({
      code: 'GOOGLE_SHEET_NOT_CONFIGURED',
      message: 'URL Google Sheets RSVP belum dikonfigurasi.',
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        guestName: payload.guestName,
        attendance: payload.attendance,
        guestCount: payload.guestCount,
        message: payload.message || '',
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok || data?.status === 'error') {
      throw new ApiError({
        code: data?.code || `HTTP_${response.status}`,
        message:
          data?.message ||
          'Gagal menyimpan RSVP ke Google Sheets. Silakan coba lagi.',
        status: response.status,
      });
    }

    return {
      data: {
        id: data?.id || `sheet-${Date.now()}`,
        status: 'received',
        mode: 'google_sheets',
      },
    };
  } catch (err) {
    if (err instanceof ApiError) throw err;

    if (err?.name === 'AbortError') {
      throw new ApiError({
        code: 'TIMEOUT_ERROR',
        message: 'Permintaan ke Google Sheets melebihi batas waktu. Coba lagi.',
      });
    }

    throw new ApiError({
      code: 'NETWORK_ERROR',
      message:
        'Tidak dapat terhubung ke Google Sheets. Periksa koneksi atau pengaturan Web App.',
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
