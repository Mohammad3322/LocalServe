import { serviceCategories } from "@/lib/data/seed/categories";
import { Earth, ShieldCheck, Sun, Wifi } from "lucide-react";

const icons = {
  "solar-energy": Sun,
  "security-surveillance": ShieldCheck,
  "electronic-services": Wifi,
};

type CategoriesBarProps = {
  selectedCategory: string;
  onSelect: (value: string) => void;
  color?: "primary" | "white";
};

function CategoriesBar({
  selectedCategory,
  onSelect,
  color,
}: CategoriesBarProps) {
  const colorStyle = color === "white" ? "text-surface" : "text-text-secondary";

  return (
    <div className="my-5 flex w-full items-center justify-center gap-12 px-3 md:flex">
      <div
        key={"all"}
        className={`group flex cursor-pointer items-center gap-3 rounded-2xl p-3 transition-all ${color === "white" ? "hover:bg-brand-500" : ""} ${selectedCategory === "" ? "bg-brand-500" : ""}`}
        onClick={() => onSelect("")}
      >
        <Earth className={`${colorStyle} size-12 transition-all`} />
        <h2
          className={`${colorStyle} text-center font-bold transition-all md:text-lg`}
        >
          All
        </h2>
      </div>
      {serviceCategories.map((category) => {
        const Icon = icons[category.slug as keyof typeof icons];

        return (
          <div
            key={category.id}
            className={`group flex cursor-pointer items-center gap-3 rounded-2xl p-3 transition-all ${color === "white" ? "hover:bg-brand-500" : ""} ${selectedCategory === category.id ? "bg-brand-500" : ""}`}
            onClick={() => onSelect(category.id)}
          >
            <Icon className={`${colorStyle} size-12 transition-all`} />
            <h2
              className={`${colorStyle} text-center text-sm font-bold transition-all md:text-lg`}
            >
              {category.title}
            </h2>
          </div>
        );
      })}
    </div>
  );
}

export default CategoriesBar;
