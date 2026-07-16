"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, EyeOff, MapPin } from "lucide-react";

type Destination = { category: string; name: string; description: string; location: string; image: string; mapUrl?: string };

const categoryStyle = [
  "border-sky-400 text-sky-700",
  "border-amber-400 text-amber-700",
  "border-emerald-400 text-emerald-700",
  "border-violet-400 text-violet-700",
  "border-rose-400 text-rose-700",
];

const categoryIcon: Record<string, string> = {
  "Wisata Pantai": "🌊",
  "Wisata Alam": "🌿",
  "Wisata Sejarah & Budaya": "🏛️",
};

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-black uppercase tracking-[.22em] text-gold">{eyebrow}</p><h2 className="mt-3 text-balance text-4xl font-black leading-tight text-white md:text-5xl">{title}</h2>{subtitle && <p className="mt-4 text-lg text-zinc-200">{subtitle}</p>}</div>;
}

export function DestinationSection({ destinations, mapImage, mapText }: { destinations: Destination[]; mapImage: string; mapText?: string }) {
  const categories = useMemo(() => Array.from(new Set(destinations.map((item) => item.category))).filter(Boolean), [destinations]);
  const [selected, setSelected] = useState<string | null>(categories[0] ?? null);
  const visible = selected ? destinations.filter((item) => item.category === selected) : destinations;

  return <section id="destinasi" className="bg-[#8a4719] py-20 text-white">
    <div className="container">
      <SectionTitle eyebrow="Destinasi Wisata" title="Peta Wisata Pulau Bintan" subtitle="Jelajahi destinasi pantai, alam, sejarah, dan budaya Pulau Bintan." />
      <div className="mt-10 rounded-[1.75rem] border border-white/12 bg-white/6 p-5 shadow-[0_28px_90px_rgba(41,20,8,.18)] backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-black uppercase tracking-[.16em] text-white/85">Filter Kategori</h3>
          <button type="button" onClick={() => setSelected(null)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition duration-300 ${selected === null ? "bg-white text-[#8a4719]" : "bg-white/12 text-white hover:bg-white/20"}`}><EyeOff className="h-4 w-4" />Tampilkan Semua</button>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {categories.map((category, index) => {
            const active = selected === category;
            const count = destinations.filter((item) => item.category === category).length;
            return <button key={category} type="button" onClick={() => setSelected(active ? null : category)} className={`inline-flex min-h-14 items-center gap-3 rounded-full border-2 bg-white px-5 py-3 text-base font-black shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,.16)] ${active ? "scale-[1.02] ring-4 ring-white/25 " + categoryStyle[index % categoryStyle.length] : "border-white/50 text-[#8a4719]"}`}><span className="text-xl">{categoryIcon[category] ?? "📍"}</span><span>{category}</span><span className="rounded-full bg-[#f5eadf] px-3 py-1 text-sm text-[#8a4719]">{count}</span></button>;
          })}
        </div>
        <p className="mt-5 text-center text-sm font-semibold text-white/65">Menampilkan {visible.length} dari {destinations.length} destinasi</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[.86fr_1.14fr]">
        <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
          <div className="grid max-h-[650px] gap-4 overflow-auto pr-2">
            {visible.map((item) => <article key={item.name} className="grid gap-4 rounded-3xl bg-white p-4 text-zinc-900 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(34,18,8,.24)] sm:grid-cols-[160px_1fr]"><Image src={item.image} alt={item.name} width={320} height={220} className="h-40 w-full rounded-2xl object-cover" /><div><p className="text-xs font-black uppercase tracking-[.16em] text-gold">{item.category}</p><h3 className="mt-2 text-xl font-black">{item.name}</h3><p className="mt-2 flex items-center gap-2 text-sm font-bold text-primary"><MapPin className="h-4 w-4" />{item.location}</p><p className="mt-2 text-sm leading-6 text-zinc-600">{item.description}</p><a href={item.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + " Bintan")}`} target="_blank" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#8a4719] px-4 py-2 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-primary">Lihat Google Maps <ArrowRight className="h-4 w-4" /></a></div></article>)}
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-white p-4 shadow-soft"><Image src={mapImage} alt="Peta Pulau Bintan" width={1000} height={740} className="h-[560px] w-full rounded-[1.35rem] object-cover" /><p className="mt-5 leading-7 text-zinc-600">{mapText}</p></div>
      </div>
    </div>
  </section>;
}