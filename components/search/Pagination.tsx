"use client";

import { Button } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <Button
        variant="secondary"
        size="sm"
        isDisabled={currentPage === 1}
        onPress={() => goToPage(currentPage - 1)}
      >
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "primary" : "secondary"}
            size="sm"
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            onPress={() => goToPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="secondary"
        size="sm"
        isDisabled={currentPage === totalPages}
        onPress={() => goToPage(currentPage + 1)}
      >
        Next
      </Button>
    </nav>
  );
}
