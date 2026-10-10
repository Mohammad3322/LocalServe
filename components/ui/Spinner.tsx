import React from "react";

interface SpinnerProps {
  label?: string;
  className?: string;
}

export const Spinner = ({
  label = "Loading...",
  className = "",
}: SpinnerProps) => {
  const labelId = React.useId();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-labelledby={labelId}
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
    >
      <div className="my-12.5 flex justify-center">
        <div className="animate-up-and-down bg-brand-600 mx-[0.5px] h-5 w-5 rounded-full" />

        <div
          className="animate-up-and-down bg-brand-600 mx-[0.5px] h-5 w-5 rounded-full"
          style={{ animationDelay: "0.3s" }}
        />

        <div
          className="animate-up-and-down bg-brand-600 mx-[0.5px] h-5 w-5 rounded-full"
          style={{ animationDelay: "0.6s" }}
        />
      </div>
      <p
        id={labelId}
        className="mt-3 text-sm text-gray-500 dark:text-slate-400"
      >
        {label}
      </p>
    </div>
  );
};
