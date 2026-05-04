import type { ReactNode } from "react";

interface DashboardPanelProps {
  children: ReactNode;
  className?: string;
  pad?: "none" | "sm" | "md" | "lg";
}

const padClass = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
};

const DashboardPanel = ({ children, className = "", pad = "md" }: DashboardPanelProps) => (
  <div
    className={`rounded-lg border border-lightGray2 bg-white accentuedDropShadow ${padClass[pad]} ${className}`}
  >
    {children}
  </div>
);

export default DashboardPanel;
