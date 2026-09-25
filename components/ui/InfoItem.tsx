type InfoItemProps = {
  icon: React.ReactNode;
  label: string | undefined;
  value: string | undefined;
};

export function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-brand-50 text-brand-600 flex size-9 shrink-0 items-center justify-center rounded-full">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-text-secondary text-xs font-medium tracking-wide uppercase">
          {label}
        </p>

        <p className="text-text-primary mt-1 text-sm font-medium wrap-break-word">
          {value}
        </p>
      </div>
    </div>
  );
}
