import { useEffect, useState } from "react";
import { getConsent, saveConsent, loadAnalytics } from "@/lib/analytics";

interface CookieBannerProps {
  text: string;
  acceptLabel: string;
  rejectLabel: string;
  /** Increment to show the banner again (e.g. from a "Cookies" footer link). */
  reopenSignal?: number;
}

const CookieBanner = ({ text, acceptLabel, rejectLabel, reopenSignal = 0 }: CookieBannerProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === "accepted") loadAnalytics();
    if (consent === null) setVisible(true);
  }, []);

  useEffect(() => {
    if (reopenSignal > 0) setVisible(true);
  }, [reopenSignal]);

  if (!visible) return null;

  const choose = (value: "accepted" | "rejected") => {
    saveConsent(value);
    if (value === "accepted") {
      loadAnalytics();
    } else if (window.gtag) {
      // Already loaded earlier in this visit: reload so tracking stops.
      window.location.reload();
    }
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4">
      <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-sm text-gray-600 flex-1">{text}</p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => choose("rejected")}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {rejectLabel}
          </button>
          <button
            onClick={() => choose("accepted")}
            className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
