import type { ReactNode } from "react";

interface DashboardSectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

const DashboardSectionHeader = ({
  eyebrow,
  title,
  description,
  action,
}: DashboardSectionHeaderProps) => (
  <div className="mb-2 flex flex-col gap-1.5 border-b border-lightGray2 pb-2 md:flex-row md:items-end md:justify-between">
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-secondText">
        {eyebrow}
      </p>
      <h2 className="mt-1 text-base font-bold tracking-tight text-text">{title}</h2>
      {description && (
        <p className="mt-1 max-w-2xl text-xs leading-relaxed text-secondText">{description}</p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default DashboardSectionHeader;
