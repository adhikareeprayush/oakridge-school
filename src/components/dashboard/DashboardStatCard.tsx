import type { ReactNode } from "react";

interface DashboardStatCardProps {
  title: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  delta?: { label: string; positive?: boolean };
}

const DashboardStatCard = ({
  title,
  value,
  hint,
  icon,
  delta,
}: DashboardStatCardProps) => (
  <div className="group relative min-h-0 w-full min-w-0 overflow-hidden rounded-lg border border-lightGray2 bg-white accentuedDropShadow transition-shadow hover:shadow-md">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    <div className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-secondText">
            {title}
          </p>
          <p className="mt-1.5 tabular-nums text-2xl font-bold leading-none tracking-tight text-text">
            {value}
          </p>
          {delta && (
            <p
              className={`mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold tabular-nums ${
                delta.positive === false ? "text-danger" : "text-success"
              }`}
            >
              <span aria-hidden>{delta.positive === false ? "↓" : "↑"}</span>
              {delta.label}
            </p>
          )}
          {hint && <p className="mt-1.5 text-xs leading-snug text-secondText">{hint}</p>}
        </div>
        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-lightGray2 bg-fadedPrimary text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default DashboardStatCard;
