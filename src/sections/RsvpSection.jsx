import { useState } from 'react';
import { Button } from '../components/Button.jsx';
import { DemoModeBanner } from '../components/DemoModeBanner.jsx';
import { Section } from '../components/Section.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { isRsvpDemoMode, submitRsvp } from '../services/invitationService.js';

export function RsvpSection({ rsvp, initialGuestName = '' }) {
  const [guestName, setGuestName] = useState(initialGuestName);
  const [attendance, setAttendance] = useState('attending');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [feedback, setFeedback] = useState('');

  if (!rsvp?.enabled) return null;

  const maxGuests = rsvp.maxGuests || 5;

  const validate = () => {
    const nextErrors = {};
    const trimmedName = guestName.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      nextErrors.guestName = 'Nama wajib diisi (2–100 karakter).';
    }

    if (attendance === 'attending') {
      const parsedCount = Number(guestCount);
      if (
        !Number.isInteger(parsedCount) ||
        parsedCount < 1 ||
        parsedCount > maxGuests
      ) {
        nextErrors.guestCount = `Jumlah tamu harus antara 1 sampai ${maxGuests} orang.`;
      }
    }

    if (trimmedMessage.length > 500) {
      nextErrors.message = 'Catatan maksimal 500 karakter.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'loading') return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      setFeedback('Periksa kembali data yang Anda isi.');
      return;
    }

    setErrors({});
    setStatus('loading');
    setFeedback('');

    try {
      await submitRsvp({
        guestName,
        attendance,
        guestCount: attendance === 'attending' ? Number(guestCount) : 0,
        message,
      });

      setStatus('success');
      setFeedback(
        isRsvpDemoMode
          ? 'Konfirmasi RSVP diterima dalam Mode Demo (belum tersimpan ke Google Sheets).'
          : 'Terima kasih! Konfirmasi kehadiran Anda telah kami terima.'
      );
      setGuestName(initialGuestName);
      setAttendance('attending');
      setGuestCount(1);
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrors(err?.fields || {});
      setFeedback(
        err?.message || 'Gagal mengirim RSVP. Silakan coba lagi beberapa saat.'
      );
    }
  };

  return (
    <Section id="rsvp" tone="blush" labelledBy="rsvp-heading">
      <SectionHeading
        id="rsvp-heading"
        eyebrow={rsvp.eyebrow}
        title={rsvp.title}
        subtitle={rsvp.subtitle}
      />

      <div className="mx-auto max-w-xl rounded-3xl border border-champagne/80 bg-white p-6 sm:p-9">
        {isRsvpDemoMode && (
          <DemoModeBanner envVarName="VITE_GOOGLE_SHEET_RSVP_URL" />
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="rsvp-name"
              className="mb-1.5 block text-sm font-medium text-ink"
            >
              Nama Lengkap <span className="text-rose-dark">*</span>
            </label>
            <input
              id="rsvp-name"
              name="guestName"
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              maxLength={100}
              required
              aria-invalid={Boolean(errors.guestName)}
              aria-describedby={errors.guestName ? 'rsvp-name-error' : undefined}
              placeholder="Contoh: Nama Anda"
              className="w-full rounded-xl border border-champagne bg-ivory px-4 py-3 text-sm text-ink placeholder:text-muted/70"
            />
            {errors.guestName && (
              <p
                id="rsvp-name-error"
                className="mt-1.5 text-xs font-medium text-rose-dark"
              >
                {errors.guestName}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-ink">
              Konfirmasi Kehadiran <span className="text-rose-dark">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'attending', label: 'Hadir' },
                { value: 'not_attending', label: 'Tidak Hadir' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex min-h-11 cursor-pointer items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                    attendance === option.value
                      ? 'border-rose bg-blush-soft text-rose-dark'
                      : 'border-champagne bg-ivory text-ink hover:border-rose/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value={option.value}
                    checked={attendance === option.value}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          {attendance === 'attending' && (
            <div>
              <label
                htmlFor="rsvp-count"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                Jumlah Tamu (maks. {maxGuests} orang)
              </label>
              <select
                id="rsvp-count"
                name="guestCount"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                aria-invalid={Boolean(errors.guestCount)}
                aria-describedby={
                  errors.guestCount ? 'rsvp-count-error' : undefined
                }
                className="w-full rounded-xl border border-champagne bg-ivory px-4 py-3 text-sm text-ink"
              >
                {Array.from({ length: maxGuests }, (_, idx) => idx + 1).map(
                  (num) => (
                    <option key={num} value={num}>
                      {num} orang
                    </option>
                  )
                )}
              </select>
              {errors.guestCount && (
                <p
                  id="rsvp-count-error"
                  className="mt-1.5 text-xs font-medium text-rose-dark"
                >
                  {errors.guestCount}
                </p>
              )}
            </div>
          )}

          <div>
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <label
                htmlFor="rsvp-message"
                className="block text-sm font-medium text-ink"
              >
                Catatan Opsional
              </label>
              <span className="text-xs tabular-nums text-muted">
                {message.length}/500
              </span>
            </div>
            <textarea
              id="rsvp-message"
              name="message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? 'rsvp-message-error' : undefined
              }
              placeholder="Catatan tambahan (misal: kebutuhan khusus atau jam kedatangan)"
              className="w-full rounded-xl border border-champagne bg-ivory px-4 py-3 text-sm text-ink placeholder:text-muted/70"
            />
            {errors.message && (
              <p
                id="rsvp-message-error"
                className="mt-1.5 text-xs font-medium text-rose-dark"
              >
                {errors.message}
              </p>
            )}
          </div>

          {feedback && (
            <div
              role={status === 'error' ? 'alert' : 'status'}
              className={`rounded-xl px-4 py-3 text-sm ${
                status === 'success'
                  ? 'border border-blue bg-blue-soft text-ink'
                  : 'border border-rose bg-blush-soft text-rose-dark'
              }`}
            >
              {feedback}
            </div>
          )}

          <Button
            type="submit"
            loading={status === 'loading'}
            className="w-full"
          >
            {status === 'loading' ? 'Mengirim...' : 'Kirim Konfirmasi'}
          </Button>
        </form>
      </div>
    </Section>
  );
}
