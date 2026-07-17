"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type GalleryItem = { id: string; title: string; fileUrl: string; category?: string };

export function HomeGalleryGrid({ items }: { items: GalleryItem[] }) {
  const meetingPhotos = items.filter((item) => item.fileUrl.includes("/foto-rapat/"));
  const meetingCover = meetingPhotos[0]?.fileUrl ?? "/foto-rapat/rapat-01.jpeg";
  const regularItems = items.filter((item) => !item.fileUrl.includes("/foto-rapat/"));
  const displayItems = regularItems.slice(0, 5);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (active === null) return;
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % displayItems.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + displayItems.length) % displayItems.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, displayItems.length]);

  const current = active === null ? null : displayItems[active];

  return (
    <>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {(
          <Link href="/galeri/dokumentasi-rapat" className="group overflow-hidden rounded-[2rem] bg-white text-left shadow-soft outline-none transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(31,41,55,.16)]">
            <div className="relative h-72 overflow-hidden">
              <Image src={meetingCover} alt="Dokumentasi Rapat" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/10 to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-[#f4e2bf] px-4 py-2 text-xs font-black uppercase tracking-[.18em] text-[#8a4719] shadow-sm">Album Rapat</span>
              <span className="absolute bottom-5 right-5 rounded-full bg-white/94 px-4 py-2 text-xs font-black text-zinc-950 shadow-sm">15 Foto</span>
            </div>
            <div className="p-5">
              <Camera className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-xl font-black text-[#2f2119]">Dokumentasi Rapat</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">Kumpulan dokumentasi rapat pengurus dan koordinasi anggota DPC HPI Kabupaten Bintan.</p>
            </div>
          </Link>
        )}
        {displayItems.map((item, index) => (
          <button key={item.id} type="button" onClick={() => setActive(index)} className="group overflow-hidden rounded-[2rem] bg-white text-left shadow-soft outline-none transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(31,41,55,.14)]">
            <div className="relative h-72 overflow-hidden">
              <Image src={item.fileUrl} alt={item.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-110" />
            </div>
            <div className="p-5"><Camera className="h-5 w-5 text-primary" /><h3 className="mt-3 font-black text-[#2f2119]">{item.title}</h3></div>
          </button>
        ))}
      </div>

      {current && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/88 p-4" role="dialog" aria-modal="true">
          <button type="button" onClick={() => setActive(null)} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-zinc-950"><X className="h-5 w-5" /></button>
          <button type="button" onClick={() => setActive((active! - 1 + displayItems.length) % displayItems.length)} className="absolute left-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white backdrop-blur"><ChevronLeft /></button>
          <button type="button" onClick={() => setActive((active! + 1) % displayItems.length)} className="absolute right-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white backdrop-blur"><ChevronRight /></button>
          <div className="w-full max-w-6xl">
            <div className="relative h-[76vh] overflow-hidden rounded-3xl bg-zinc-900">
              <Image src={current.fileUrl} alt={current.title} fill sizes="100vw" className="object-contain" />
            </div>
            <p className="mt-4 text-center text-lg font-black text-white">{current.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
