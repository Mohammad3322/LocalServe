import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LocalServe",
    template: "%s | LocalServe",
  },
  description:
    "Find trusted local professionals, compare services, and book appointments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
