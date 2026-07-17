import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: { default: "Himpunan Pramuwisata Indonesia DPC Kabupaten Bintan", template: "%s | HPI DPC Kabupaten Bintan" }, description: "Company profile dan sistem informasi Himpunan Pramuwisata Indonesia DPC Kabupaten Bintan.", openGraph: { title: "Himpunan Pramuwisata Indonesia DPC Kabupaten Bintan", description: "Website resmi HPI DPC Kabupaten Bintan", type: "website" }, twitter: { card: "summary_large_image" } };

export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="id"><body>{children}</body></html>; }
