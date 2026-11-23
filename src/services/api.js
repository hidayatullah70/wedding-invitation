/**
 * API Client Terpusat sesuai API-SPEC.md
 * - Base URL dibaca dari VITE_API_BASE_URL (tanpa hardcode)
 * - Prefix versi: /api/v1
 * - Menangani timeout, network error, dan normalisasi error contract
 */

const DEFAULT_TIMEOUT_MS = 10000;

export function getApiBaseUrl() {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (!raw || typeof raw !== 'string') return '';
  return raw.trim().replace(/\/+$/, '');
}

export function isDemoModeEnabled() {
  return getApiBaseUrl().length === 0;
}

export class ApiError extends Error {
  constructor({ code, message, status = 0, fields = null }) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.fields = fields;
  }
}

export async function apiRequest(path, options = {}) {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    throw new ApiError({
      code: 'API_NOT_CONFIGURED',
      message: 'API belum dikonfigurasi. Aplikasi berjalan dalam Mode Demo.',
    });
  }

  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const url = `${baseUrl}/api/v1${path}`;
  const headers = {
    Accept: 'application/json',
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const apiErr = payload?.error;
      throw new ApiError({
        code: apiErr?.code || `HTTP_${response.status}`,
        message:
          apiErr?.message ||
          getFallbackErrorMessage(response.status),
        status: response.status,
        fields: apiErr?.fields || null,
      });
    }

    return payload;
  } catch (err) {
    if (err instanceof ApiError) throw err;

    if (err?.name === 'AbortError') {
      throw new ApiError({
        code: 'TIMEOUT_ERROR',
        message: 'Permintaan melebihi batas waktu. Silakan coba lagi.',
      });
    }

    throw new ApiError({
      code: 'NETWORK_ERROR',
      message: 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function getFallbackErrorMessage(status) {
  if (status === 400) return 'Format permintaan tidak valid.';
  if (status === 422) return 'Periksa kembali data yang Anda kirim.';
  if (status === 429) return 'Terlalu banyak permintaan. Tunggu beberapa saat lalu coba lagi.';
  if (status === 503) return 'Layanan sedang tidak tersedia. Coba beberapa saat lagi.';
  return 'Terjadi kendala pada server. Silakan coba lagi nanti.';
}
