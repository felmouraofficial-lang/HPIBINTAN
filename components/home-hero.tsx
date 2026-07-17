"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Handshake, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export function HomeHero({ image }: { image: string }) {
  const [src, setSrc] = useState(image);

  return (
    <section className="relative min-h-[720px] overflow-hidden bg-zinc-950 text-white sm:min-h-[760px] lg:min-h-screen">
      <Image src={src} alt="Pantai dan resort Pulau Bintan" fill priority sizes="100vw" className="object-cover cinematic-hero-still" onError={() => setSrc("/hero-bintan.jpg")} />
      <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={src} aria-label="Video cinematic Pulau Bintan">
        <source src="/video-cinematic.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0b2745]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#173a58]/82 via-[#173a58]/50 to-[#173a58]/18" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fffaf3] to-transparent" />

      <div className="container relative flex min-h-[720px] items-center pb-10 pt-24 sm:min-h-[760px] sm:pt-28 lg:min-h-screen lg:pb-16 lg:pt-32">
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-3xl">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/28 bg-white/16 px-3.5 py-2 text-[11px] font-black text-white shadow-[0_16px_40px_rgba(0,0,0,.16)] backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-2.5 sm:text-sm"><span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#ff9900] sm:h-3 sm:w-3" />Organisasi Profesi Pramuwisata</div>
          <h1 className="mt-5 text-balance text-[clamp(2.25rem,10.8vw,4.35rem)] font-black uppercase leading-[.94] tracking-normal drop-shadow-[0_20px_55px_rgba(0,0,0,.32)] sm:mt-6 md:text-[clamp(3.4rem,5.7vw,5.25rem)] md:leading-[.97] xl:text-[clamp(4rem,5.2vw,5.6rem)]">
            Himpunan<br />Pramuwisata<br />Indonesia<br /><span className="text-[#ff9900]">DPC Bintan</span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.65 }} className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/88 sm:text-base md:mt-5 md:text-lg md:leading-8">
            Himpunan Pramuwisata Indonesia DPC Kabupaten Bintan untuk pelayanan wisata profesional, beretika, dan berkelas internasional.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.65 }} className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-7">
            <Link href="/anggota" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#ff9900] px-6 py-3 text-sm font-black text-white shadow-[0_24px_60px_rgba(255,153,0,.32)] transition hover:-translate-y-1 hover:bg-primary sm:min-h-14 sm:px-7 sm:text-base">Daftar Anggota <ArrowRight className="h-5 w-5" /></Link>
            <Link href="/tentang-kami" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border-2 border-white/34 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:text-zinc-950 sm:min-h-14 sm:px-7 sm:text-base">Tentang Kami</Link>
          </motion.div>
          <div className="mt-6 h-px max-w-2xl bg-white/24 md:mt-8" />
          <div className="mt-4 grid max-w-2xl grid-cols-3 gap-2 sm:gap-3 md:mt-5 md:gap-4">
            {[[Users, "50+", "Anggota Aktif"], [CalendarDays, "60+", "Kegiatan/Tahun"], [Handshake, "350+", "Mitra Kerja"]].map(([Icon, value, label]) => <div key={label as string} className="min-w-0 rounded-2xl border border-white/18 bg-white/10 p-2.5 backdrop-blur-md sm:rounded-3xl sm:p-3.5 md:p-4"><Icon className="h-5 w-5 text-[#ff9900] sm:h-7 sm:w-7 md:h-8 md:w-8" /><div className="mt-1.5 text-2xl font-black sm:text-3xl md:text-4xl xl:text-5xl">{value as string}</div><p className="mt-1 text-[8px] font-black uppercase tracking-[.1em] text-white/76 sm:text-[10px] md:text-[11px] xl:text-xs">{label as string}</p></div>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
