"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MyButton from "../ui/MyButton";

const navigation = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`border-border bg-surface fixed top-0 right-0 left-0 z-50 border-b transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link
          href="/"
          className="text-text-primary flex items-center justify-center gap-3 text-xl font-bold tracking-tight"
        >
          <Image
            src="/Logo/Vector.svg"
            alt=""
            width={200}
            height={200}
            className="w-10 lg:hidden"
          />
          <Image
            src="/Logo/LogoWithBrandName.svg"
            alt=""
            width={200}
            height={200}
            className="hidden lg:block"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-8 px-3 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-text-secondary hover:text-brand-600 text-center text-sm font-bold md:text-lg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/search">
          <MyButton variant="primary" className="hidden md:block">
            Find a Professional
          </MyButton>
        </Link>
      </div>
    </header>
  );
}
