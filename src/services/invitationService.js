import { apiRequest, isDemoModeEnabled } from './api.js';
import {
  isGoogleSheetRsvpConfigured,
  submitRsvpToGoogleSheet,
} from './googleSheetsService.js';

/**
 * Service Layer untuk RSVP & Guestbook (API-SPEC.md)
 * - Interface tunggal agar perpindahan dari Mode Demo ke API tidak mengubah komponen UI.
 * - Mode Demo bersifat in-memory (hanya untuk sesi halaman saat ini) dan tidak mengklaim tersimpan permanen.
 */

const DEMO_LATENCY_MS = 450;

let demoGuestbookStore = [
  {
    id: 'demo-wish-1',
    guestName: '[Contoh Tamu 1]',
    message:
      'Selamat menempuh hidup baru! Semoga pernikahan kalian selalu dipenuhi kebahagiaan dan ketenangan.',
    createdAt: '2027-05-01T10:00:00+07:00',
  },
  {
    id: 'demo-wish-2',
    guestName: '[Contoh Tamu 2]',
    message:
      'Turut berbahagia untuk kalian berdua. Doa terbaik menyertai setiap langkah ke depan.',
    createdAt: '2027-05-02T14:30:00+07:00',
  },
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createDemoId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const isDemoMode = isDemoModeEnabled();
export const isRsvpUsingGoogleSheet = isGoogleSheetRsvpConfigured();
export const isRsvpDemoMode = !isRsvpUsingGoogleSheet && isDemoMode;

export async function submitRsvp({ guestName, attendance, guestCount, message }) {
  const normalizedPayload = {
    guestName: guestName.trim(),
    attendance,
    guestCount: attendance === 'attending' ? Number(guestCount) : 0,
    message: message ? message.trim() : '',
  };

  if (isRsvpUsingGoogleSheet) {
    return submitRsvpToGoogleSheet(normalizedPayload);
  }

  if (isDemoMode) {
    await wait(DEMO_LATENCY_MS);
    return {
      data: {
        id: createDemoId('demo-rsvp'),
        status: 'received',
        mode: 'demo',
      },
    };
  }

  return apiRequest('/public/rsvps', {
    method: 'POST',
    body: normalizedPayload,
  });
}

export async function fetchGuestbook({ page = 1, limit = 10 } = {}) {
  if (isDemoMode) {
    await wait(DEMO_LATENCY_MS);
    const start = (page - 1) * limit;
    const items = demoGuestbookStore.slice(start, start + limit);
    return {
      data: items,
      meta: {
        page,
        limit,
        total: demoGuestbookStore.length,
      },
    };
  }

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  return apiRequest(`/public/guestbook?${query.toString()}`);
}

export async function submitGuestbook({ guestName, message }) {
  const normalizedPayload = {
    guestName: guestName.trim(),
    message: message.trim(),
  };

  if (isDemoMode) {
    await wait(DEMO_LATENCY_MS);
    const newEntry = {
      id: createDemoId('demo-wish'),
      guestName: normalizedPayload.guestName,
      message: normalizedPayload.message,
      createdAt: new Date().toISOString(),
    };
    demoGuestbookStore = [newEntry, ...demoGuestbookStore];
    return {
      data: {
        id: newEntry.id,
        status: 'received',
        mode: 'demo',
        entry: newEntry,
      },
    };
  }

  return apiRequest('/public/guestbook', {
    method: 'POST',
    body: normalizedPayload,
  });
}
