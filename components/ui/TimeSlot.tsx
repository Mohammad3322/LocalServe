export function TimeSlot({
  time,
  selected,
  available,
  onSelect,
}: {
  time: string;
  selected: boolean;
  available: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!available}
      className={[
        "rounded-xl border px-4 py-3 text-sm font-medium transition",
        !available
          ? "border-border bg-background text-text-secondary cursor-not-allowed opacity-60"
          : selected
            ? "border-brand-500 bg-brand-50 text-brand-700 ring-brand-500 ring-1"
            : "border-border bg-background text-text-primary hover:border-brand-300",
      ].join(" ")}
    >
      {time}
      {!available && <span className="mt-1 block text-xs">Unavailable</span>}
    </button>
  );
}
