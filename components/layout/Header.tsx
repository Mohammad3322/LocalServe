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
  return (
    <header className="border-border bg-surface border-b">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
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

          {/* Local<span className="text-brand-600">Serve</span> */}
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-8 px-3 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-text-secondary hover:text-brand-600 text-sm font-bold md:text-lg"
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
