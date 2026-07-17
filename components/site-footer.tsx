import Image from "next/image";
import Link from "next/link";
import { Globe2, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { logos } from "@/lib/utils";

const quickLinks = [
  ["Tentang Kami", "/tentang-kami"],
  ["Data Anggota", "/anggota"],
  ["Destinasi", "/#destinasi"],
  ["Galeri", "/galeri"],
  ["Dokumentasi", "/dokumentasi"],
  ["Transportasi", "/transportasi"],
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#080b12] pt-16 text-white">
      <div className="absolute inset-0 premium-grid opacity-10" />
      <div className="container relative grid gap-10 pb-12 lg:grid-cols-[1.1fr_.8fr_.9fr_1.1fr]">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <Image src={logos[0]} alt="Logo HPI Bintan" width={110} height={60} className="rounded-2xl bg-white object-contain p-2" />
          </div>
          <h2 className="text-3xl font-black leading-tight">HPI Pulau Bintan</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-zinc-300">Website resmi Himpunan Pramuwisata Indonesia Pulau Bintan untuk informasi organisasi, anggota, agenda, dokumentasi, dan layanan guide booking.</p>
          <div className="mt-6 flex gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/8"><Share2 className="h-4 w-4" /></span>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/8"><Globe2 className="h-4 w-4" /></span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[.18em] text-[#ff9900]">Quick Link</h3>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-zinc-300">
            {quickLinks.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-[#ff9900]">{label}</Link>)}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[.18em] text-[#ff9900]">Kontak</h3>
          <div className="mt-5 grid gap-4 text-sm text-zinc-300">
            <p className="flex gap-3 leading-6"><MapPin className="mt-1 h-4 w-4 shrink-0 text-[#ff9900]" />Kabupaten Bintan, Kepulauan Riau, Indonesia</p>
            <p className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-[#ff9900]" />info@hpibintan.org</p>
            <p className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-[#ff9900]" />+62 812-0000-0000</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[.18em] text-[#ff9900]">Google Maps</h3>
          <iframe title="Peta Bintan" src="https://maps.google.com/maps?q=Bintan&t=&z=9&ie=UTF8&iwloc=&output=embed" className="mt-5 h-52 w-full rounded-3xl border border-white/10 grayscale transition hover:grayscale-0" loading="lazy" />
        </div>
      </div>
      <div className="relative border-t border-white/10 py-5">
        <div className="container flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
          <span>Copyright 2026 HPI Bintan. Seluruh hak cipta dilindungi.</span>
          <Link href="/admin/login" className="font-bold uppercase tracking-[.18em] text-zinc-500 transition hover:text-[#ff9900]">Dashboard Admin</Link>
        </div>
      </div>
    </footer>
  );
}
