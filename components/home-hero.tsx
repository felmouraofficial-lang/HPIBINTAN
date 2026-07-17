"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Handshake, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function HomeHero({ image }: { image: string }) {
  const [src, setSrc] = useState(image);

  return (
    <section className="relative min-h-[860px] overflow-hidden bg-zinc-950 text-white md:min-h-screen">
      <Image src={src} alt="Pantai dan resort Pulau Bintan" fill priority sizes="100vw" className="object-cover cinematic-hero-still" onError={() => setSrc("/hero-bintan.jpg")} />
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={src} aria-label="Video cinematic Pulau Bintan">
        <source src="/video-cinematic.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0b2745]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#173a58]/82 via-[#173a58]/50 to-[#173a58]/18" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fffaf3] to-transparent" />

      <div className="container relative flex min-h-[860px] items-center pb-20 pt-32 md:min-h-screen">
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-3xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/28 bg-white/16 px-5 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(0,0,0,.16)] backdrop-blur-xl"><span className="h-3 w-3 rounded-full bg-[#ff9900]" />Organisasi Profesi Pramuwisata</div>
          <h1 className="mt-9 text-balance text-[clamp(3rem,6vw,5.6rem)] font-black uppercase leading-[.98] tracking-normal drop-shadow-[0_20px_55px_rgba(0,0,0,.32)]">
            Himpunan<br />Pramuwisata<br />Indonesia<br /><span className="text-[#ff9900]">Bintan</span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.65 }} className="mt-7 max-w-2xl text-base font-semibold leading-8 text-white/86 md:text-xl">
            Organisasi profesi pramuwisata Pulau Bintan untuk pelayanan wisata profesional, beretika, dan berkelas internasional.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.65 }} className="mt-9 flex flex-wrap gap-3">
            <Link href="/anggota" className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#ff9900] px-7 py-3 text-base font-black text-white shadow-[0_24px_60px_rgba(255,153,0,.32)] transition hover:-translate-y-1 hover:bg-primary">Daftar Anggota <ArrowRight className="h-5 w-5" /></Link>
            <Link href="/tentang-kami" className="inline-flex min-h-14 items-center gap-3 rounded-full border-2 border-white/34 bg-white/10 px-7 py-3 text-base font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:text-zinc-950">Tentang Kami</Link>
          </motion.div>
          <div className="mt-12 h-px max-w-2xl bg-white/24" />
          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-5">
            {[[Users, "50+", "Anggota Aktif"], [CalendarDays, "60+", "Kegiatan/Tahun"], [Handshake, "46+", "Mitra Kerja"]].map(([Icon, value, label]) => <div key={label as string} className="min-w-0 rounded-3xl border border-white/14 bg-white/10 p-4 backdrop-blur-md"><Icon className="h-8 w-8 text-[#ff9900]" /><div className="mt-2 text-4xl font-black md:text-5xl">{value as string}</div><p className="mt-1 text-[11px] font-black uppercase tracking-[.16em] text-white/76 md:text-xs">{label as string}</p></div>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
