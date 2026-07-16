import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: { default: "Sistem Informasi HPI Bintan", template: "%s | HPI Bintan" }, description: "Company profile dan sistem informasi HPI Pulau Bintan Kepulauan Riau.", openGraph: { title: "Sistem Informasi HPI Bintan", description: "Website resmi HPI DPD Bintan", type: "website" }, twitter: { card: "summary_large_image" } };

export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="id"><body>{children}</body></html>; }