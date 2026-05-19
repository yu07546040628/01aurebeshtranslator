export type DonateProvider = 'creem' | 'paypal' | 'none';

export type DonateConfig = {
  enabled: boolean;
  provider: DonateProvider;
  providerLabel: string;
  href: string;
  opensInNewTab: boolean;
};

export function getDonateConfig(): DonateConfig {
  const creemDonateUrl = (process.env.NEXT_PUBLIC_CREEM_DONATE_URL || '').trim();
  const paypalHostedButtonId = (process.env.NEXT_PUBLIC_PAYPAL_DONATE_HOSTED_BUTTON_ID || '').trim();
  const paypalBusiness = (process.env.NEXT_PUBLIC_PAYPAL_DONATE_BUSINESS || '').trim();

  const paypalHref = paypalHostedButtonId
    ? `https://www.paypal.com/donate/?hosted_button_id=${encodeURIComponent(paypalHostedButtonId)}`
    : paypalBusiness
      ? `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${encodeURIComponent(paypalBusiness)}&currency_code=USD`
      : '';

  const provider: DonateProvider = creemDonateUrl ? 'creem' : paypalHref ? 'paypal' : 'none';
  const href = provider === 'creem' ? creemDonateUrl : provider === 'paypal' ? paypalHref : '/support';

  const enabled = false;

  return {
    enabled,
    provider,
    providerLabel: provider === 'creem' ? 'Creem' : provider === 'paypal' ? 'PayPal' : 'Support',
    href,
    opensInNewTab: provider !== 'none',
  };
}
