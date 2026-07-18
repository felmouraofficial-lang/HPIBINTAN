"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type MeetingPhoto = {
  src: string;
  title: string;
};

export function MeetingDocumentationGallery({ photos }: { photos: MeetingPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : photos[active];

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (active === null || photos.length === 0) return;
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % photos.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + photos.length) % photos.length);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, photos.length]);

  return (
    <>
      <main className="min-h-screen bg-[#fbf6ed] pt-28 text-[#2f2119] dark:bg-zinc-950 dark:text-white md:pt-32">
        <section className="container pb-10 pt-8">
          <Link href="/galeri" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#2f2119] shadow-soft transition hover:-translate-y-0.5 hover:text-primary dark:bg-white/10 dark:text-white">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Galeri
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[.32em] text-[#c78010]">Album Kegiatan</p>
              <h1 className="mt-4 text-5xl font-black leading-[.95] md:text-7xl">Dokumentasi Rapat</h1>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#6b5a48] dark:text-zinc-300">Kumpulan dokumentasi rapat pengurus dan koordinasi anggota DPC HPI Kepulauan Bintan. Foto-foto ini menampilkan suasana diskusi, penyampaian agenda, evaluasi program, dan kebersamaan anggota dalam memperkuat pelayanan pramuwisata di Bintan.</p>
          </div>
        </section>

        <section className="container pb-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <button key={`${photo.src}-${index}`} type="button" onClick={() => setActive(index)} className={`group overflow-hidden rounded-[1.75rem] bg-white p-3 text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(47,33,25,.16)] dark:bg-white/8 ${index % 5 === 0 ? "lg:row-span-2" : ""}`}>
                <div className={`relative overflow-hidden rounded-[1.35rem] bg-[#f0dfbf] ${index % 5 === 0 ? "h-[520px]" : "h-72"}`}>
                  <Image src={photo.src} alt={photo.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-80" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-black uppercase tracking-[.16em] text-primary shadow-sm">Foto {index + 1}</span>
                  <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[#2f2119]/88 px-4 py-2 text-xs font-black text-white backdrop-blur"><Camera className="h-4 w-4" /> Lihat Foto</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      {current && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4" role="dialog" aria-modal="true">
          <button type="button" onClick={() => setActive(null)} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-zinc-950"><X className="h-5 w-5" /></button>
          <button type="button" onClick={() => setActive((active! - 1 + photos.length) % photos.length)} className="absolute left-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white backdrop-blur"><ChevronLeft /></button>
          <button type="button" onClick={() => setActive((active! + 1) % photos.length)} className="absolute right-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white backdrop-blur"><ChevronRight /></button>
          <div className="w-full max-w-6xl">
            <div className="relative h-[78vh] overflow-hidden rounded-3xl bg-zinc-900">
              <Image src={current.src} alt={current.title} fill sizes="100vw" className="object-contain" />
            </div>
            <p className="mt-4 text-center text-lg font-black text-white">{current.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
