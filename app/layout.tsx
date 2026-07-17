import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: { default: "DPC HPI Kabupaten Bintan", template: "%s | DPC HPI Kabupaten Bintan" }, description: "Website resmi Himpunan Pramuwisata Indonesia Kabupaten Bintan untuk informasi organisasi, anggota, agenda, dokumentasi, dan layanan guide booking.", openGraph: { title: "DPC HPI Kabupaten Bintan", description: "Website resmi DPC HPI Kabupaten Bintan", type: "website" }, twitter: { card: "summary_large_image" } };

export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="id"><body>{children}</body></html>; }
