import { Link } from "react-router-dom";
import { SITE_NAME } from "../constants/site";

/** Served from `public/logo.svg` — same asset as favicon */
export const LOGO_SRC = "/logo.svg";

type LogoSize = "sm" | "md" | "lg";

const sizeClass: Record<LogoSize, string> = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-11 w-11",
};

interface LogoMarkProps {
  size?: LogoSize;
  className?: string;
  /** Hide from assistive tech when redundant with adjacent text */
  decorative?: boolean;
}

export function LogoMark({ size = "md", className = "", decorative }: LogoMarkProps) {
  return (
    <img
      src={LOGO_SRC}
      alt={decorative ? "" : SITE_NAME}
      width={48}
      height={48}
      className={`${sizeClass[size]} shrink-0 object-contain ${className}`}
      {...(decorative ? { "aria-hidden": true as const } : {})}
    />
  );
}

interface LogoLockupProps {
  to?: string;
  size?: LogoSize;
  /** Show school name beside mark */
  showWordmark?: boolean;
  wordmarkClassName?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Logo + optional wordmark — use in Nav, auth screens, dashboard rail.
 */
export function LogoLockup({
  to = "/",
  size = "md",
  showWordmark = true,
  wordmarkClassName = "",
  className = "",
  onClick,
}: LogoLockupProps) {
  const inner = (
    <>
      <LogoMark size={size} decorative={showWordmark} />
      {showWordmark && (
        <span
          className={`truncate font-bold tracking-tight text-text ${wordmarkClassName}`}
        >
          {SITE_NAME}
        </span>
      )}
    </>
  );

  const wrapClass = `flex min-w-0 items-center gap-2 ${className}`;

  if (to) {
    return (
      <Link to={to} className={wrapClass} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <span className={wrapClass} onClick={onClick} role={onClick ? "button" : undefined}>
      {inner}
    </span>
  );
}
