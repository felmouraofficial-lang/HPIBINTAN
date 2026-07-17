import Image from "next/image";
import { logos } from "@/lib/utils";

export function PartnerMarquee({ partners }: { partners: string[] }) {
  const items = [...partners, ...logos, ...partners, ...logos];
  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="container">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[.22em] text-[#c99213]">Kolaborasi</p>
          <h2 className="mt-3 text-4xl font-black text-[#2f2119] md:text-5xl">Ekosistem wisata Bintan</h2>
        </div>
      </div>
      <div className="mt-10 flex w-max animate-marquee gap-5">
        {items.map((partner, index) => (
          <div key={`${partner}-${index}`} className="grid h-24 w-72 shrink-0 place-items-center rounded-[1.5rem] border border-zinc-200 bg-white px-8 text-center text-lg font-black text-zinc-700 grayscale transition hover:grayscale-0">
            {partner.startsWith("/") ? <Image src={partner} alt="Logo partner" width={96} height={70} className="max-h-16 object-contain" /> : partner}
          </div>
        ))}
      </div>
    </section>
  );
}
