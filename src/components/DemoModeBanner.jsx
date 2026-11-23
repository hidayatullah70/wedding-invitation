export function DemoModeBanner() {
  return (
    <div
      role="status"
      className="mb-6 rounded-2xl border border-champagne bg-ivory px-4 py-3 text-xs leading-relaxed text-ink sm:text-sm"
    >
      <span className="font-semibold text-rose-dark">Mode demo</span> — data
      tidak dikirim ke server dan tidak tersimpan permanen. Sambungkan{' '}
      <code className="rounded bg-blush-soft px-1.5 py-0.5 text-xs">
        VITE_API_BASE_URL
      </code>{' '}
      untuk penyimpanan permanen sesuai{' '}
      <code className="rounded bg-blush-soft px-1.5 py-0.5 text-xs">
        API-SPEC.md
      </code>
      .
    </div>
  );
}
