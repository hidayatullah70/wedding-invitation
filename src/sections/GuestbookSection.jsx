import { useCallback, useEffect, useState } from 'react';
import { Button } from '../components/Button.jsx';
import { DemoModeBanner } from '../components/DemoModeBanner.jsx';
import { Section } from '../components/Section.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';
import {
  fetchGuestbook,
  isDemoMode,
  submitGuestbook,
} from '../services/invitationService.js';
import { formatWishDate } from '../utils/url.js';

export function GuestbookSection({ guestbook, timezone }) {
  const [entries, setEntries] = useState([]);
  const [listState, setListState] = useState('loading'); // loading | ready | error
  const [listError, setListError] = useState('');

  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success | error
  const [submitFeedback, setSubmitFeedback] = useState('');

  const loadEntries = useCallback(async () => {
    setListState('loading');
    setListError('');
    try {
      const response = await fetchGuestbook({
        page: 1,
        limit: guestbook?.pageSize || 10,
      });
      setEntries(Array.isArray(response?.data) ? response.data : []);
      setListState('ready');
    } catch (err) {
      setListState('error');
      setListError(
        err?.message || 'Gagal memuat daftar ucapan. Silakan coba lagi.'
      );
    }
  }, [guestbook?.pageSize]);

  useEffect(() => {
    if (guestbook?.enabled) {
      loadEntries();
    }
  }, [guestbook?.enabled, loadEntries]);

  if (!guestbook?.enabled) return null;

  const validate = () => {
    const nextErrors = {};
    const nameLen = guestName.trim().length;
    const msgLen = message.trim().length;

    if (nameLen < 2 || nameLen > 100) {
      nextErrors.guestName = 'Nama wajib diisi (2–100 karakter).';
    }
    if (msgLen < 2 || msgLen > 500) {
      nextErrors.message = 'Ucapan wajib diisi (2–500 karakter).';
    }
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitState === 'loading') return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitState('error');
      setSubmitFeedback('Periksa kembali nama dan ucapan Anda.');
      return;
    }

    setErrors({});
    setSubmitState('loading');
    setSubmitFeedback('');

    try {
      await submitGuestbook({ guestName, message });
      setSubmitState('success');
      setSubmitFeedback(
        isDemoMode
          ? 'Ucapan ditambahkan dalam Mode Demo (hanya tampil sementara di sesi ini).'
          : 'Terima kasih! Ucapan Anda telah dikirim.'
      );
      setGuestName('');
      setMessage('');
      await loadEntries();
    } catch (err) {
      setSubmitState('error');
      setErrors(err?.fields || {});
      setSubmitFeedback(
        err?.message || 'Gagal mengirim ucapan. Silakan coba lagi.'
      );
    }
  };

  return (
    <Section id="guestbook" tone="ivory" labelledBy="guestbook-heading">
      <SectionHeading
        id="guestbook-heading"
        eyebrow={guestbook.eyebrow}
        title={guestbook.title}
        subtitle={guestbook.subtitle}
      />

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <div className="rounded-3xl border border-champagne/80 bg-white p-4 sm:p-6">
            {isDemoMode && <DemoModeBanner />}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="wish-name"
                  className="mb-1.5 block text-sm font-medium text-ink"
                >
                  Nama <span className="text-rose-dark">*</span>
                </label>
                <input
                  id="wish-name"
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  maxLength={100}
                  required
                  aria-invalid={Boolean(errors.guestName)}
                  aria-describedby={
                    errors.guestName ? 'wish-name-error' : undefined
                  }
                  placeholder="Nama Anda"
                  className="w-full rounded-xl border border-champagne bg-ivory px-4 py-3 text-sm text-ink placeholder:text-muted/70"
                />
                {errors.guestName && (
                  <p
                    id="wish-name-error"
                    className="mt-1 text-xs font-medium text-rose-dark"
                  >
                    {errors.guestName}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-1.5 flex items-baseline justify-between gap-2">
                  <label
                    htmlFor="wish-message"
                    className="block text-sm font-medium text-ink"
                  >
                    Ucapan &amp; Doa <span className="text-rose-dark">*</span>
                  </label>
                  <span className="text-xs tabular-nums text-muted">
                    {message.length}/500
                  </span>
                </div>
                <textarea
                  id="wish-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'wish-message-error' : undefined
                  }
                  placeholder="Tulis ucapan dan doa terbaik Anda..."
                  className="w-full rounded-xl border border-champagne bg-ivory px-4 py-3 text-sm text-ink placeholder:text-muted/70"
                />
                {errors.message && (
                  <p
                    id="wish-message-error"
                    className="mt-1 text-xs font-medium text-rose-dark"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {submitFeedback && (
                <div
                  role={submitState === 'error' ? 'alert' : 'status'}
                  className={`rounded-xl px-4 py-3 text-xs leading-relaxed sm:text-sm ${
                    submitState === 'success'
                      ? 'border border-blue bg-blue-soft text-ink'
                      : 'border border-rose bg-blush-soft text-rose-dark'
                  }`}
                >
                  {submitFeedback}
                </div>
              )}

              <Button
                type="submit"
                loading={submitState === 'loading'}
                className="w-full"
              >
                {submitState === 'loading' ? 'Mengirim...' : 'Kirim Ucapan'}
              </Button>
            </form>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          {listState === 'loading' && (
            <div
              role="status"
              className="rounded-3xl border border-champagne/80 bg-white p-8 text-center text-sm text-muted"
            >
              Memuat ucapan...
            </div>
          )}

          {listState === 'error' && (
            <div
              role="alert"
              className="rounded-3xl border border-rose bg-blush-soft p-8 text-center"
            >
              <p className="text-sm text-rose-dark">{listError}</p>
              <Button
                variant="secondary"
                size="sm"
                onClick={loadEntries}
                className="mt-4"
              >
                Coba Lagi
              </Button>
            </div>
          )}

          {listState === 'ready' && entries.length === 0 && (
            <div className="rounded-3xl border border-champagne/80 bg-white p-8 text-center text-sm text-muted">
              Belum ada ucapan. Jadilah yang pertama mengirimkan doa terbaik.
            </div>
          )}

          {listState === 'ready' && entries.length > 0 && (
            <ul className="space-y-4">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-2xl border border-champagne/70 bg-white p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold text-ink break-words">
                      {entry.guestName}
                    </h3>
                    {entry.createdAt && (
                      <time
                        dateTime={entry.createdAt}
                        className="text-xs text-muted"
                      >
                        {formatWishDate(entry.createdAt, timezone)}
                      </time>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted break-words">
                    {entry.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
