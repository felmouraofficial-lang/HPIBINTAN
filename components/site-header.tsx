"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { logos } from "@/lib/utils";

const nav = [
  ["Beranda", "/"],
  ["Profil", "/tentang-kami"],
  ["Destinasi", "/#destinasi"],
  ["Galeri", "/galeri"],
  ["Dokumen", "/dokumentasi"],
  ["Transportasi", "/transportasi"],
  ["Kontak", "/kontak"],
] as const;

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition duration-500 ${solid ? "bg-white/92 text-zinc-950 shadow-[0_18px_60px_rgba(15,23,42,.12)] backdrop-blur-2xl" : "bg-white/8 text-white backdrop-blur-xl"}`}>
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className={`grid h-14 w-28 shrink-0 place-items-center rounded-2xl p-2 transition ${solid ? "bg-zinc-950" : "bg-white/14"}`}>
            <Image src={logos[0]} alt="Logo HPI Bintan" width={112} height={56} className="h-auto max-h-12 w-full object-contain" priority />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block whitespace-nowrap text-base font-black leading-tight tracking-wide xl:text-lg">HPI Pulau Bintan</span>
            <span className={`mt-0.5 block text-[10px] font-black uppercase tracking-[.24em] ${solid ? "text-zinc-500" : "text-white/72"}`}>Kepulauan Riau</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-black lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={`rounded-full px-3 py-2 transition duration-300 hover:-translate-y-0.5 ${solid ? "text-zinc-700 hover:bg-zinc-100 hover:text-primary" : "text-white/88 hover:bg-white/14 hover:text-white"}`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/kontak" className="inline-flex items-center gap-2 rounded-full bg-[#ff9900] px-5 py-3 text-xs font-black uppercase tracking-[.12em] text-white shadow-[0_18px_45px_rgba(255,153,0,.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary">
            <CalendarCheck className="h-4 w-4" />Guide Booking
          </Link>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${solid ? "border-zinc-200 bg-white text-zinc-900" : "border-white/20 bg-white/10 text-white"}`} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="container pb-4 lg:hidden">
          <nav className="grid gap-1 rounded-3xl border border-white/16 bg-zinc-950/92 p-3 text-white shadow-2xl backdrop-blur-2xl">
            {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-black hover:bg-white/10">{label}</Link>)}
            <Link href="/kontak" onClick={() => setOpen(false)} className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff9900] px-4 py-3 text-sm font-black text-white">Guide Booking</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
