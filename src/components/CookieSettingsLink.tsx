import { OPEN_COOKIE_SETTINGS_EVENT } from "./CookieBanner";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const CookieSettingsLink = ({ className, children }: Props) => (
  <button
    type="button"
    onClick={() => window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT))}
    className={className}
  >
    {children ?? "Cookie settings"}
  </button>
);
