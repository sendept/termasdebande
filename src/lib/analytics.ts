// Google Analytics 4, loaded only after the visitor accepts cookies (GDPR / LSSI).
export const GA_MEASUREMENT_ID = "G-TZEPNMBVWC";

const CONSENT_KEY = "cookie-consent"; // "accepted" | "rejected"

export type Consent = "accepted" | "rejected" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const getConsent = (): Consent => {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
};

export const saveConsent = (value: "accepted" | "rejected") => {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable: choice lasts for this visit only */
  }
};

export const clearConsent = () => {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
};

let loaded = false;

export const loadAnalytics = () => {
  if (loaded || typeof window === "undefined") return;
  loaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
};
