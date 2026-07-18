export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { Compass, Gem, Lightbulb, Navigation } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomeHero } from "@/components/home-hero";
import { HomeAgendaSection } from "@/components/home-agenda-section";
import { HomeGalleryGrid } from "@/components/home-gallery-grid";
import { PartnerMarquee } from "@/components/partner-marquee";
import { Card } from "@/components/ui/card";
import { OrganizationMotion } from "@/components/organization-motion";
import { DestinationSection } from "@/components/destination-section";
import { prisma } from "@/lib/prisma";
import { logos } from "@/lib/utils";
import {
  fallbackAnnouncements,
  fallbackContact,
  fallbackDestinations,
  fallbackGallery,
  fallbackMeetings,
  fallbackMembers,
  fallbackPartners,
  fallbackProfile,
  fallbackSettings,
  fallbackTransportation,
} from "@/lib/fallback-data";

type Destination = { category: string; name: string; description: string; location: string; image: string; mapUrl?: string };

async function getHomeData() {
  try {
    const [profile, members, announcements, meetings, gallery, docs, transport, contact, settings] = await Promise.all([
      prisma.organizationProfile.findFirst(),
      prisma.member.findMany({ where: { isActive: true }, orderBy: { createdAt: "asc" }, take: 4 }),
      prisma.announcement.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" }, take: 3 }),
      prisma.meeting.findMany({ orderBy: { date: "asc" }, take: 3 }),
      prisma.gallery.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
      prisma.documentation.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
      prisma.transportation.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
      prisma.contact.findFirst(),
      prisma.settings.findMany(),
    ]);
    const setting = Object.fromEntries(settings.map((s) => [s.key, s.value]));
    return {
      profile: profile ?? fallbackProfile,
      members: members.length ? members : fallbackMembers.slice(0, 4),
      announcements: announcements.length ? announcements : fallbackAnnouncements,
      meetings: meetings.length ? meetings.map((meeting) => ({ ...meeting, description: meeting.description ?? "" })) : fallbackMeetings,
      gallery: gallery.length ? gallery : fallbackGallery,
      docs,
      transport: transport.length ? transport : fallbackTransportation,
      contact: contact ?? fallbackContact,
      setting: { ...fallbackSettings, ...setting },
      destinations: parseArray<Destination>(setting.destinations, fallbackDestinations),
      partners: parseArray<string>(setting.partners, fallbackPartners),
    };
  } catch {
    return {
      profile: fallbackProfile,
      members: fallbackMembers.slice(0, 4),
      announcements: fallbackAnnouncements,
      meetings: fallbackMeetings,
      gallery: fallbackGallery,
      docs: [],
      transport: fallbackTransportation,
      contact: fallbackContact,
      setting: fallbackSettings,
      destinations: fallbackDestinations,
      partners: fallbackPartners,
    };
  }
}

function parseJson<T>(value: string | undefined, fallback: T): T {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function parseArray<T>(value: string | undefined, fallback: T[]): T[] {
  const parsed = parseJson<T[]>(value, fallback);
  return parsed.length ? parsed : fallback;
}

export default async function HomePage() {
  const { profile, members, announcements, meetings, gallery, transport, contact, setting, destinations, partners } = await getHomeData();
  const profileContent = {
    history: profile.history?.trim() || fallbackProfile.history,
    vision: profile.vision?.trim() || fallbackProfile.vision,
    mission: profile.mission?.trim() || fallbackProfile.mission,
  };
  const heroImage = ["/hero-bintan.jpg", "https://upload.wikimedia.org/wikipedia/commons/7/74/Banyan_Tree_Bintan.jpg", ""].includes(setting.hero_image ?? "")
    ? fallbackSettings.hero_image
    : setting.hero_image;

  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-[#fffaf3]">
        <HomeHero image={heroImage || fallbackSettings.hero_image} />

        <section className="bg-white py-20">
          <div className="container grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <SectionTitle eyebrow="Tentang Organisasi" title="DPC HPI Kabupaten Bintan mengawal profesionalisme pramuwisata Bintan." />
              <p className="mt-6 text-lg leading-9 text-zinc-600">{profileContent.history}</p>
              <Link href="/tentang-kami" className="mt-8 inline-flex rounded-full bg-[#8a4719] px-7 py-4 font-black text-white">Selengkapnya</Link>
            </div>
            <div className="grid gap-5">
              {[
                { title: "Visi", text: profileContent.vision, Icon: Compass, gradient: "from-sky-500 to-cyan-400" },
                { title: "Misi", text: profileContent.mission, Icon: Lightbulb, gradient: "from-amber-500 to-orange-400" },
                { title: "Nilai", text: "Profesionalisme, integritas, pelayanan prima, kolaborasi, dan pengembangan berkelanjutan.", Icon: Gem, gradient: "from-emerald-500 to-teal-400" },
              ].map(({ title, text, Icon, gradient }) => (
                <Card key={title} className="group flex gap-5 p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(41,20,8,.12)]">
                  <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-soft transition duration-300 group-hover:scale-110`}><Icon className="h-8 w-8" /></div>
                  <div><h3 className="text-2xl font-black">{title}</h3><p className="mt-2 leading-7 text-zinc-600">{text}</p></div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container">
            <SectionTitle center eyebrow="Struktur Organisasi" title="DPC HPI Kabupaten Bintan" subtitle="Sinergi profesional untuk pariwisata unggul" />
            <OrganizationMotion members={members} />
            <div className="mt-10 text-center">
              <Link href="/anggota" className="inline-flex h-14 items-center justify-center rounded-full border border-[#ead6bc] bg-white px-8 text-sm font-black uppercase tracking-[.14em] text-[#8a4719] shadow-sm transition hover:-translate-y-1 hover:border-[#ff9900] hover:text-primary">Lihat Seluruh Anggota</Link>
            </div>
          </div>
        </section>

        <DestinationSection destinations={destinations} mapImage={setting.map_image ?? "/peta-pulau-bintan.jpg"} mapText={setting.map_text} />
        <HomeAgendaSection announcements={announcements} meetings={meetings} />

        <section className="py-20">
          <div className="container">
            <SectionTitle center eyebrow="Galeri" title="Dokumentasi Kegiatan" />
            <HomeGalleryGrid items={gallery} />
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="container">
            <SectionTitle center eyebrow="Transportasi" title="Layanan Transportasi Mitra" />
            <div className="mt-10 grid gap-5 md:grid-cols-4">
              {transport.map((t) => (
                <Card key={t.id} className="overflow-hidden p-0">
                  <Image src={t.photo || logos[1]} alt={t.name} width={700} height={430} className="h-44 w-full object-cover" />
                  <div className="p-5"><span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-800">{t.status === "AVAILABLE" ? "Tersedia" : "Tidak tersedia"}</span><h3 className="mt-4 font-black">{t.name}</h3><p className="mt-2 text-sm text-zinc-500">{t.vehicleType} - {t.capacity} penumpang</p></div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <PartnerMarquee partners={partners} />

        <section className="bg-primary py-16 text-white">
          <div className="container grid gap-8 lg:grid-cols-[1fr_auto]">
            <div><SectionTitle inverse eyebrow="Kontak" title="Guide booking dan informasi resmi." /><p className="mt-5 flex items-center gap-2 text-lg font-bold"><Navigation className="h-5 w-5" />{contact.address}</p><p className="mt-2 text-red-50">{contact.email} - {contact.whatsapp}</p></div>
            <Link href="https://wa.me/6281275657026?text=Halo%20HPI%20Bintan%2C%20saya%20ingin%20booking%20guide." target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-black uppercase tracking-[.18em] text-primary">Hubungi Sekretariat</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function SectionTitle({ eyebrow, title, subtitle, inverse = false, center = false }: { eyebrow: string; title: string; subtitle?: string; inverse?: boolean; center?: boolean }) {
  return <div className={center ? "mx-auto max-w-3xl text-center" : ""}><p className={`text-sm font-black uppercase tracking-[.22em] ${inverse ? "text-gold" : "text-gold-deep"}`}>{eyebrow}</p><h2 className={`mt-3 text-balance text-4xl font-black leading-tight md:text-5xl ${inverse ? "text-white" : "text-[#2f2119]"}`}>{title}</h2>{subtitle && <p className={`mt-4 text-lg ${inverse ? "text-zinc-200" : "text-zinc-500"}`}>{subtitle}</p>}</div>;
}
