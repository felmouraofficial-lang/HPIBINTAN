import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, ChevronDown, Menu } from "lucide-react";
import { logos } from "@/lib/utils";

const nav = [["Beranda", "/", false], ["Profil", "/tentang-kami", true], ["Destinasi", "/#destinasi", false], ["Galeri", "/galeri", false], ["Dokumen", "/dokumentasi", true], ["Kontak", "/kontak", true]] as const;

export function SiteHeader() {
  return <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-zinc-950/12 text-white shadow-[0_16px_50px_rgba(0,0,0,.10)] backdrop-blur-xl">
    <div className="container flex h-[88px] items-center justify-between gap-4">
      <Link href="/" className="flex min-w-0 items-center gap-3">
        <span className="grid h-16 w-32 shrink-0 place-items-center">
          <Image src={logos[0]} alt="Logo HPI Bintan" width={128} height={64} className="h-auto max-h-16 w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,.32)]" priority />
        </span>
        <span className="hidden min-w-0 sm:block drop-shadow">
          <span className="block whitespace-nowrap text-lg font-black leading-tight xl:text-xl">HPI Pulau Bintan</span>
          <span className="mt-0.5 block text-[10px] font-black uppercase tracking-[.2em] text-white/72">Kepulauan Riau</span>
        </span>
      </Link>
      <nav className="hidden items-center gap-1 text-sm font-black text-white/88 lg:flex">
        {nav.map(([label, href, dropdown]) => <Link key={href} href={href} className="inline-flex items-center gap-1 rounded-full px-3 py-2 transition duration-300 hover:-translate-y-0.5 hover:bg-white/14 hover:text-white">{label}{dropdown && <ChevronDown className="h-4 w-4" />}</Link>)}
        <Link href="/kontak" className="ml-2 inline-flex items-center gap-2 rounded-full bg-[#ff9900] px-5 py-3 text-xs font-black uppercase tracking-[.12em] text-white shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-primary"><CalendarCheck className="h-4 w-4" />Guide Booking</Link>
      </nav>
      <Menu className="lg:hidden" aria-label="Menu" />
    </div>
  </header>;
}