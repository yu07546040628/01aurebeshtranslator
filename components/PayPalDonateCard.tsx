'use client';

import { getDonateConfig } from '@/lib/donate';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type DonateCardProps = {
  id?: string;
  className?: string;
};

export default function PayPalDonateCard({ id, className }: DonateCardProps) {
  const donate = getDonateConfig();
  if (!donate.enabled) return null;

  return (
    <section id={id} className={`donate-card${className ? ` ${className}` : ''}`} aria-label="Support this project">
      <div className="donate-card__icon" aria-hidden>
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" />
          <path d="M12 4.4l2.2 4.5 5 .7-3.6 3.5.9 4.9L12 15.7 7.5 18l.9-4.9-3.6-3.5 5-.7L12 4.4z" />
        </svg>
      </div>
      <div className="donate-card__head">
        <span className="donate-card__badge">Support This Project</span>
        <h3 className="donate-card__title">Keep These Star Wars Tools Free</h3>
        <p className="donate-card__desc">
          If this translator helped your tattoos, props, or fan art, a small donation helps keep it online.
        </p>
      </div>

      <div className="donate-card__actions">
        <a
          href={donate.href}
          target="_blank"
          rel="noopener noreferrer"
          className="donate-card__link"
          onClick={() => {
            window.gtag?.('event', 'donate_click', { placement: id || 'footer', provider: donate.provider });
          }}
        >
          {`Donate with ${donate.providerLabel}`}
        </a>
      </div>

      {donate.provider === 'creem' ? (
        <p className="donate-card__hint">
          Secure checkout is handled by Creem.
        </p>
      ) : donate.provider === 'paypal' ? (
        <p className="donate-card__hint">
          Secure checkout is handled by PayPal.
        </p>
      ) : null}
    </section>
  );
}
