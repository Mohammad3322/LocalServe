"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CategoriesBar from "../ui/CategoriesBar";
import Filters from "./Filters";

export function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") ?? "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  function handelSelectCategory(category: string) {
    setSelectedCategory(category);
    const param = new URLSearchParams(searchParams.toString());
    if (category.trim()) {
      param.set("category", category.trim());
      param.delete("service");
    } else {
      param.delete("category");
    }

    router.push(`/search?${param.toString()}`);
  }

  return (
    <section className="border-border bg-brand-700 border-b">
      <div className="md:flex-column mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-3 px-4 pb-6 sm:px-6 lg:px-8">
        <CategoriesBar
          color="white"
          onSelect={handelSelectCategory}
          selectedCategory={selectedCategory}
        />
        <div className="flex flex-col gap-5">
          <Filters />
        </div>
      </div>
    </section>
  );
}
