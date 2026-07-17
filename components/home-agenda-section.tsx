import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

type Announcement = { id: string; title: string; content: string; publishedAt: Date };
type Meeting = { id: string; title: string; date: Date; time: string; location: string; description?: string | null };

const thumbnails = [
  "/uploads/1784221305257-f652719a-d758-47ae-ae59-a9beca92924e.jpg",
  "/head-background.jpg",
  "/uploads/1784221461556-45d0d916-4095-4a31-b7f1-8a639e67d2d9.jpg",
  "/uploads/1784221461527-66d2964b-c108-46b0-97b9-b04edec00383.jpg",
];

export function HomeAgendaSection({ announcements, meetings }: { announcements: Announcement[]; meetings: Meeting[] }) {
  const items = [
    ...announcements.map((item, index) => ({
      id: `announcement-${item.id}`,
      title: item.title,
      date: item.publishedAt,
      location: "DPC HPI Kabupaten Bintan",
      category: "Pengumuman",
      summary: item.content,
      image: thumbnails[index % thumbnails.length],
    })),
    ...meetings.map((item, index) => ({
      id: `meeting-${item.id}`,
      title: item.title,
      date: item.date,
      location: item.location,
      category: "Kegiatan",
      summary: item.description || `${item.time} - agenda kegiatan DPC HPI Kabupaten Bintan.`,
      image: thumbnails[(index + 1) % thumbnails.length],
    })),
  ].slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[.22em] text-[#ff9900]">Agenda & Info</p>
            <h2 className="mt-3 text-balance text-4xl font-black leading-tight text-[#2f2119] md:text-5xl">Kegiatan dan pengumuman terbaru.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#8f765f]">Ikuti perkembangan kegiatan organisasi dan informasi penting seputar pramuwisata Pulau Bintan.</p>
          </div>
          <Link href="/pengumuman" className="inline-flex h-14 items-center justify-center gap-3 rounded-full border border-zinc-200 bg-white px-7 text-base font-black text-zinc-950 shadow-sm transition hover:-translate-y-1 hover:border-[#ff9900]">
            Lihat Semua <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-[1.5rem] border border-zinc-100 bg-white shadow-[0_18px_60px_rgba(31,41,55,.10)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(31,41,55,.16)]">
              <div className="relative h-56 overflow-hidden">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#8f765f]">
                  <span className="rounded-full bg-[#ff9900] px-4 py-2 text-xs font-black uppercase text-white">{item.category}</span>
                  <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{formatDate(item.date)}</span>
                </div>
                <h3 className="mt-5 text-2xl font-black leading-tight text-zinc-950">{item.title}</h3>
                <p className="mt-3 flex items-center gap-2 text-sm font-bold text-primary"><MapPin className="h-4 w-4" />{item.location}</p>
                <p className="mt-4 line-clamp-3 text-base leading-7 text-[#8f765f]">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
