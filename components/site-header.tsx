"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Menu, Moon, Sun, X } from "lucide-react";
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

const guideBookingUrl = "https://wa.me/6281275657026?text=Halo%20HPI%20Bintan%2C%20saya%20ingin%20booking%20guide.";

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("hpi-theme");
    const enabled = saved ? saved === "dark" : false;
    setDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("hpi-theme", next ? "dark" : "light");
  }

  return (
    <header className="fixed left-0 right-0 top-3 z-50 text-white transition duration-500 md:top-4">
      <div className={`container flex h-[60px] items-center justify-between gap-3 rounded-[1.75rem] px-4 transition duration-500 md:h-[68px] md:rounded-[2rem] ${solid ? "bg-white/86 text-zinc-950 shadow-[0_18px_70px_rgba(15,23,42,.14)] ring-1 ring-black/5 backdrop-blur-2xl dark:bg-zinc-950/82 dark:text-white dark:ring-white/10" : "bg-white/14 shadow-[0_18px_70px_rgba(0,0,0,.14)] ring-1 ring-white/18 backdrop-blur-2xl"}`}>
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-12 w-24 shrink-0 place-items-center transition md:h-14">
            <Image src={logos[0]} alt="Logo HPI Bintan" width={100} height={54} className="h-auto max-h-12 w-full object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,.26)] md:max-h-14" priority />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block whitespace-nowrap text-sm font-black leading-tight tracking-wide xl:text-base">DPC HPI Kabupaten Bintan</span>
            <span className={`mt-0.5 block text-[9px] font-black uppercase tracking-[.22em] ${solid ? "text-zinc-500 dark:text-white/62" : "text-white/78"}`}>Kepulauan Riau</span>
          </span>
        </Link>

        <nav className={`hidden items-center gap-1 rounded-full p-1 text-[13px] font-black lg:flex ${solid ? "bg-zinc-100/80 dark:bg-white/8" : "bg-white/10"}`}>
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={`rounded-full px-3.5 py-2 transition duration-300 hover:-translate-y-0.5 ${label === "Beranda" ? "bg-white/22 shadow-sm" : ""} ${solid ? "text-zinc-700 hover:bg-white hover:text-primary dark:text-white/82 dark:hover:bg-white/12" : "text-white/92 hover:bg-white/16 hover:text-white"}`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button type="button" onClick={toggleTheme} className={`grid h-11 w-11 place-items-center rounded-full transition ${solid ? "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-white/10 dark:text-white" : "bg-white/12 text-white hover:bg-white/20"}`} aria-label="Ganti mode tampilan">
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link href={guideBookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#ff9900] px-5 py-3 text-xs font-black uppercase tracking-[.12em] text-white shadow-[0_18px_45px_rgba(255,153,0,.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary xl:px-6">
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
            <Link href={guideBookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff9900] px-4 py-3 text-sm font-black text-white">Guide Booking</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
