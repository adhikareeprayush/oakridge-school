import type { ReactNode } from "react";

type BadgeTone = "neutral" | "success" | "warning" | "danger";

const tones: Record<BadgeTone, string> = {
  neutral: "border-lightGray2 bg-lightGray text-text",
  success: "border-primary/30 bg-fadedPrimary text-success",
  warning: "border-secondary/25 bg-fadedSecondary2 text-alert",
  danger: "border-danger/25 bg-fadedSecondary2 text-danger",
};

interface StatusBadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

const StatusBadge = ({ children, tone = "neutral" }: StatusBadgeProps) => (
  <span
    className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tones[tone]}`}
  >
    {children}
  </span>
);

export default StatusBadge;
