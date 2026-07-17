export const dynamic = "force-dynamic";

import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { fallbackContact } from "@/lib/fallback-data";

const guideBookingUrl = "https://wa.me/6281275657026?text=Halo%20HPI%20Bintan%2C%20saya%20ingin%20booking%20guide.";

export default async function ContactPage() {
  let contact = fallbackContact;

  try {
    const savedContact = await prisma.contact.findFirst();
    contact = savedContact
      ? {
          id: savedContact.id,
          address: savedContact.address || fallbackContact.address,
          email: savedContact.email || fallbackContact.email,
          whatsapp: savedContact.whatsapp || fallbackContact.whatsapp,
          mapUrl: savedContact.mapUrl || fallbackContact.mapUrl,
        }
      : fallbackContact;
  } catch {}

  return (
    <>
      <SiteHeader />
      <PageHero title="Kontak" description="Hubungi DPC HPI Kabupaten Bintan Kepulauan Riau untuk informasi organisasi dan layanan pramuwisata." />
      <main className="container grid gap-5 py-12 lg:grid-cols-3">
        <Card>
          <MapPin className="text-primary" />
          <h2 className="mt-4 font-black">Alamat</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{contact.address}</p>
        </Card>
        <Card>
          <MessageCircle className="text-primary" />
          <h2 className="mt-4 font-black">WhatsApp</h2>
          <p className="mt-2 text-sm text-zinc-600">{contact.whatsapp}</p>
          <Link href={guideBookingUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-primary px-5 py-3 text-xs font-black uppercase tracking-[.16em] text-white">
            Booking Guide
          </Link>
        </Card>
        <Card>
          <Mail className="text-primary" />
          <h2 className="mt-4 font-black">Email</h2>
          <p className="mt-2 text-sm text-zinc-600">{contact.email}</p>
        </Card>
        {contact.mapUrl && <iframe title="Peta Sekretariat HPI Bintan" src={contact.mapUrl} className="h-96 w-full rounded-xl border lg:col-span-3" loading="lazy" />}
      </main>
      <SiteFooter />
    </>
  );
}
