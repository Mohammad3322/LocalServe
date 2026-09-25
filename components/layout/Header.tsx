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
            src="/Logo/LogoWithBrandName.svg"
            alt=""
            width={200}
            height={200}
          />
          {/* Local<span className="text-brand-600">Serve</span> */}
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-text-secondary hover:text-brand-600 text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/search">
          <MyButton variant="primary" className="hidden lg:block">
            Find a Professional
          </MyButton>
        </Link>

        <Link
          href="/search"
          aria-label="Search services"
          className="text-text-secondary hover:bg-background hover:text-text-primary rounded-lg p-2 lg:hidden"
        >
          Search
        </Link>
      </div>
    </header>
  );
}
