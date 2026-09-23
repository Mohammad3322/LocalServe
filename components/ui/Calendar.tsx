"use client";
import type { DateValue } from "@internationalized/date";
import { Calendar } from "@heroui/react";
import { isWeekend } from "@internationalized/date";
import { useLocale } from "react-aria-components";

export function ChooseDates({ ...props }) {
  const { locale } = useLocale();
  const isDateUnavailable = (date: DateValue) => isWeekend(date, locale);
  return (
    <Calendar
      {...props}
      isDateUnavailable={isDateUnavailable}
      className="border-border/80 bg-surface ring-accent/5 dark:border-border/90 dark:ring-accent/10 w-63 rounded-2xl border p-3 shadow-sm ring-1"
    >
      <Calendar.Header className="px-0.5 pb-4">
        <Calendar.Heading className="text-foreground text-sm font-medium" />
        <Calendar.NavButton
          className="text-accent-soft-foreground hover:bg-default hover:text-accent-soft-foreground active:scale-95"
          slot="previous"
        />
        <Calendar.NavButton
          className="text-accent-soft-foreground hover:bg-default hover:text-accent-soft-foreground active:scale-95"
          slot="next"
        />
      </Calendar.Header>
      <Calendar.Grid>
        <Calendar.GridHeader>
          {(day) => (
            <Calendar.HeaderCell className="text-muted pb-2 text-xs font-medium">
              {day}
            </Calendar.HeaderCell>
          )}
        </Calendar.GridHeader>
        <Calendar.GridBody>
          {(date) => (
            <Calendar.Cell
              className="hover:bg-default data-[hovered=true]:bg-default data-[outside-month=true]:text-muted data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[selected=true]:hover:bg-accent-hover data-[selected=true]:data-[hovered=true]:bg-accent-hover data-[selected=true]:data-[outside-month=true]:bg-default data-[today=true]:bg-accent-soft data-[today=true]:text-accent-soft-foreground data-[today=true]:hover:bg-accent-soft-hover data-[today=true]:data-[hovered=true]:bg-accent-soft-hover data-[selected=true]:data-[today=true]:bg-accent data-[selected=true]:data-[today=true]:hover:bg-accent-hover rounded-3xl data-[outside-month=true]:opacity-50"
              date={date}
            />
          )}
        </Calendar.GridBody>
      </Calendar.Grid>
    </Calendar>
  );
}
