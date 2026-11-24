import { useState } from 'react';
import { Button } from '../components/Button.jsx';
import { CheckIcon, CopyIcon } from '../components/Icons.jsx';
import { Section } from '../components/Section.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';

export function GiftSection({ gift }) {
  const [copyState, setCopyState] = useState({ id: null, status: 'idle' });

  if (!gift?.enabled) return null;

  const handleCopy = async (account) => {
    if (!navigator?.clipboard?.writeText) {
      setCopyState({ id: account.id, status: 'manual' });
      return;
    }

    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopyState({ id: account.id, status: 'copied' });
      window.setTimeout(() => {
        setCopyState((prev) =>
          prev.id === account.id ? { id: null, status: 'idle' } : prev
        );
      }, 2500);
    } catch {
      setCopyState({ id: account.id, status: 'manual' });
    }
  };

  return (
    <Section id="gift" tone="white" labelledBy="gift-heading">
      <SectionHeading
        id="gift-heading"
        eyebrow={gift.eyebrow}
        title={gift.title}
        subtitle={gift.subtitle}
      />

      {gift.notice && (
        <p className="mx-auto mb-8 max-w-xl rounded-2xl border border-champagne bg-ivory px-4 py-3 text-center text-xs text-muted">
          {gift.notice}
        </p>
      )}

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
        {gift.accounts.map((account) => {
          const isCopied =
            copyState.id === account.id && copyState.status === 'copied';
          const isManual =
            copyState.id === account.id && copyState.status === 'manual';

          return (
            <article
              key={account.id}
              className="flex min-w-0 flex-col justify-between rounded-3xl border border-champagne/80 bg-ivory p-4 sm:p-6"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.18em] text-rose-dark uppercase break-words">
                  {account.provider}
                </p>
                <p className="mt-3 font-mono text-sm font-semibold tracking-wide text-ink break-all sm:text-base">
                  {account.accountNumber}
                </p>
                <p className="mt-1 text-sm text-muted break-words">
                  {account.accountHolder}
                </p>
              </div>

              <div className="mt-5">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(account)}
                  className="w-full"
                >
                  {isCopied ? (
                    <>
                      <CheckIcon className="h-4 w-4 text-rose-dark" />
                      Berhasil Disalin
                    </>
                  ) : (
                    <>
                      <CopyIcon className="h-4 w-4" />
                      Salin Nomor
                    </>
                  )}
                </Button>

                {isManual && (
                  <p role="status" className="mt-2 text-xs text-rose-dark">
                    Clipboard tidak tersedia. Silakan blok dan salin nomor
                    secara manual.
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
