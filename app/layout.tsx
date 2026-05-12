import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Corcel Logistics — Міжнародні перевезення",
  description: "Надійна міжнародна логістика з 2008 року. Авто, авіа, море, залізниця.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
