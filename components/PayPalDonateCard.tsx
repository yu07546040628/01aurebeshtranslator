'use client';

import { useEffect, useId, useMemo, useRef } from 'react';

declare global {
  interface Window {
    PayPal?: {
      Donation?: {
        Button: (config: {
          env?: 'production' | 'sandbox';
          hosted_button_id?: string;
          business?: string;
          image: { src: string; alt: string; title: string };
          onComplete?: (params: Record<string, string>) => void;
        }) => { render: (selector: string) => void };
      };
    };
    gtag?: (...args: unknown[]) => void;
  }
}

type PayPalDonateCardProps = {
  id?: string;
  className?: string;
};

export default function PayPalDonateCard({ id, className }: PayPalDonateCardProps) {
  const hostedButtonId = (process.env.NEXT_PUBLIC_PAYPAL_DONATE_HOSTED_BUTTON_ID || '').trim();
  const business = (process.env.NEXT_PUBLIC_PAYPAL_DONATE_BUSINESS || '').trim();
  const containerRef = useRef<HTMLDivElement>(null);
  const containerId = useId().replace(/:/g, '');

  const donateHref = useMemo(() => {
    if (hostedButtonId) {
      return `https://www.paypal.com/donate/?hosted_button_id=${encodeURIComponent(hostedButtonId)}`;
    }
    if (business) {
      return `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent(business)}&currency_code=USD`;
    }
    return 'https://www.paypal.com/donate/buttons';
  }, [business, hostedButtonId]);

  useEffect(() => {
    if (!hostedButtonId && !business) return;

    let cancelled = false;

    const renderButton = () => {
      if (cancelled) return;
      if (!window.PayPal?.Donation?.Button || !containerRef.current) return;

      containerRef.current.innerHTML = '';
      window.PayPal.Donation.Button({
        env: 'production',
        hosted_button_id: hostedButtonId || undefined,
        business: hostedButtonId ? undefined : business || undefined,
        image: {
          src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
          title: 'PayPal - The safer, easier way to pay online!',
          alt: 'Donate with PayPal button',
        },
        onComplete: (params) => {
          window.gtag?.('event', 'paypal_donation_complete', {
            value: params.amt || '',
            currency: params.cc || '',
            transaction_id: params.tx || '',
          });
        },
      }).render(`#${containerId}`);
    };

    const existing = document.querySelector<HTMLScriptElement>('script[data-paypal-donate-sdk="true"]');
    if (existing) {
      if (window.PayPal?.Donation?.Button) {
        renderButton();
      } else {
        existing.addEventListener('load', renderButton, { once: true });
      }
      return () => {
        cancelled = true;
        existing.removeEventListener('load', renderButton);
      };
    }

    const script = document.createElement('script');
    script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js';
    script.charset = 'UTF-8';
    script.async = true;
    script.dataset.paypalDonateSdk = 'true';
    script.addEventListener('load', renderButton, { once: true });
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      script.removeEventListener('load', renderButton);
    };
  }, [business, containerId, hostedButtonId]);

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
          If this translator helped your tattoos, props, or fan art, a small PayPal donation helps keep it online.
        </p>
      </div>

      <div className="donate-card__actions">
        <div ref={containerRef} id={containerId} className="donate-card__paypal" />
        <a
          href={donateHref}
          target="_blank"
          rel="noopener noreferrer"
          className="donate-card__link"
          onClick={() => {
            window.gtag?.('event', 'paypal_donate_click', { placement: id || 'footer' });
          }}
        >
          Open PayPal Donation Page
        </a>
      </div>

      {!hostedButtonId && !business ? (
        <p className="donate-card__hint">
          Set <code>NEXT_PUBLIC_PAYPAL_DONATE_HOSTED_BUTTON_ID</code> (or <code>NEXT_PUBLIC_PAYPAL_DONATE_BUSINESS</code>) to
          render the live button.
        </p>
      ) : null}
    </section>
  );
}
