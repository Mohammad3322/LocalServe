import type { ReactNode } from "react";
// import { Footer } from "@/components/layout/Footer";
// import { Header } from "@/components/layout/Header";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}

      {children}

      {/* <Footer /> */}
    </div>
  );
}
