"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MyButton from "../ui/MyButton";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  function getVisiblePages(): (number | string)[] {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    // if (currentPage + delta < totalPages) {
    //   rangeWithDots.push("...", totalPages);
    // } else if (totalPages > 1) {
    //   rangeWithDots.push(totalPages);
    // }

    return [...new Set(rangeWithDots)];
  }

  const visiblePages = getVisiblePages();

  return (
    <nav
      className="mt-8 flex w-full items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <MyButton
        variant="secondary"
        size="sm"
        isDisabled={currentPage === 1}
        onPress={() => goToPage(currentPage - 1)}
      >
        <ArrowLeft />
      </MyButton>

      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) =>
          page === "..." ? (
            <span
              key={`dots-${index}`}
              className="px-2 text-gray-500 select-none"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <MyButton
              key={page}
              variant={page === currentPage ? "primary" : "secondary"}
              size="sm"
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              onPress={() => goToPage(page as number)}
            >
              {page}
            </MyButton>
          ),
        )}
      </div>

      <MyButton
        variant="secondary"
        size="sm"
        isDisabled={currentPage === totalPages}
        onPress={() => goToPage(currentPage + 1)}
      >
        <ArrowRight />
      </MyButton>
    </nav>
  );
}
