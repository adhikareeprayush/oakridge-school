interface ProgressBarProps {
  value: number;
  label?: string;
}

const ProgressBar = ({ value, label }: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-lightGray2 ring-1 ring-black/[0.04]"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-300"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};

export default ProgressBar;
