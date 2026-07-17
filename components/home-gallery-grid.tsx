"use client";

import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type GalleryItem = { id: string; title: string; fileUrl: string; category?: string };

export function HomeGalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (active === null) return;
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % items.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, items.length]);

  const current = active === null ? null : items[active];

  return (
    <>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((item, index) => (
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
          <button type="button" onClick={() => setActive((active! - 1 + items.length) % items.length)} className="absolute left-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white backdrop-blur"><ChevronLeft /></button>
          <button type="button" onClick={() => setActive((active! + 1) % items.length)} className="absolute right-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/12 text-white backdrop-blur"><ChevronRight /></button>
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
