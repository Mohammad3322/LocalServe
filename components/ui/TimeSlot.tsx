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
        "w-32 rounded-xl border px-4 py-3 text-sm font-medium transition",
        "hover:bg-brand-500 hover:text-surface",
        !available
          ? "border-border bg-muted text-text-secondary cursor-not-allowed opacity-60"
          : selected
            ? "border-brand-600 bg-brand-600 text-surface ring-brand-500 ring-1"
            : "border-brand-500 bg-background text-brand-700 hover:border-brand-300",
      ].join(" ")}
    >
      {time}
      {!available && <span className="mt-1 block text-xs">Unavailable</span>}
    </button>
  );
}
