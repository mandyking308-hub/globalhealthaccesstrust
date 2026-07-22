import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLegalDocument } from "@/lib/legalDocuments";

// Non-blocking in-app notice that fresh Terms are available.
// Dismissal is NOT treated as acceptance — the notice is informational only.
const DISMISS_KEY = "ghat.termsNotice.dismissed.v";

export const TermsUpdateNotice = () => {
  const doc = getLegalDocument("terms-of-use");
  const storageKey = doc ? `${DISMISS_KEY}${doc.version}` : DISMISS_KEY;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!doc) return;
    try {
      if (typeof window === "undefined") return;
      const dismissed = window.localStorage.getItem(storageKey);
      if (!dismissed) setVisible(true);
    } catch {
      /* ignore */
    }
  }, [doc, storageKey]);

  if (!doc || !visible) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(storageKey, new Date().toISOString());
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Updated terms notice"
      className="fixed bottom-4 right-4 z-40 max-w-sm bg-background border border-foreground/15 shadow-lg p-4 print:hidden"
    >
      <p className="text-[13px] font-semibold text-foreground">
        Updated Website and Portal Terms of Use are available.
      </p>
      <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
        Version {doc.version} · Effective {new Date(doc.effectiveDate).toLocaleDateString("en-GB")}
      </p>
      <div className="mt-3 flex items-center gap-2">
        <Link
          to={doc.route}
          onClick={dismiss}
          className="inline-flex items-center h-8 px-3 bg-primary text-primary-foreground text-[11px] font-semibold uppercase tracking-[0.12em]"
        >
          View Terms
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="inline-flex items-center h-8 px-3 border border-foreground/20 text-foreground/80 text-[11px] font-semibold uppercase tracking-[0.12em]"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default TermsUpdateNotice;
