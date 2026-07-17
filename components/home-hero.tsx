"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

export function HomeHero({ image }: { image: string }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      <Image src={image} alt="Pantai dan resort Pulau Bintan" fill priority sizes="100vw" className="object-cover cinematic-hero-still" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/42 to-black/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fffaf3] to-transparent" />

      <div className="container relative flex min-h-screen items-center pb-24 pt-32">
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-5xl">
          <h1 className="text-balance text-[clamp(3rem,10vw,8.7rem)] font-black uppercase leading-[.82] tracking-normal drop-shadow-[0_20px_55px_rgba(0,0,0,.42)]">
            Himpunan<br />Pramuwisata<br />Indonesia<br /><span className="text-[#ff9900]">Bintan</span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.65 }} className="mt-7 max-w-2xl text-base font-semibold leading-8 text-white/90 md:text-xl">
            Organisasi profesi pramuwisata Pulau Bintan untuk pelayanan wisata profesional, beretika, dan berkelas internasional.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.65 }} className="mt-9 flex flex-wrap gap-3">
            <Link href="/anggota" className="inline-flex min-h-14 items-center gap-3 rounded-full bg-[#ff9900] px-6 py-3 text-sm font-black uppercase tracking-[.12em] text-white shadow-[0_24px_60px_rgba(255,153,0,.32)] transition hover:-translate-y-1 hover:bg-primary"><Users className="h-5 w-5" />Daftar Anggota</Link>
            <Link href="/tentang-kami" className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/40 bg-white/12 px-6 py-3 text-sm font-black uppercase tracking-[.12em] text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white hover:text-zinc-950">Tentang Kami <ArrowRight className="h-5 w-5" /></Link>
            <Link href="/kontak" className="inline-flex min-h-14 items-center gap-3 rounded-full border border-white/40 bg-black/20 px-6 py-3 text-sm font-black uppercase tracking-[.12em] text-white backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#ff9900] hover:bg-[#ff9900]"><CalendarCheck className="h-5 w-5" />Guide Booking</Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
