export const dynamic = "force-dynamic";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MeetingDocumentationGallery } from "@/components/meeting-documentation-gallery";
import { prisma } from "@/lib/prisma";

const fallbackPhotos = Array.from({ length: 43 }, (_, index) => ({
  src: `/foto-rapat/rapat-${String(index + 1).padStart(2, "0")}.jpeg`,
  title: `Dokumentasi Rapat ${String(index + 1).padStart(2, "0")}`,
}));

function isMeetingPhoto(item: { title: string; fileUrl: string; description?: string | null }) {
  const text = `${item.title} ${item.fileUrl} ${item.description ?? ""}`.toLowerCase();
  return text.includes("rapat") || text.includes("meeting") || text.includes("/foto-rapat/");
}

export default async function MeetingDocumentationPage() {
  let photos = fallbackPhotos;

  try {
    const dbPhotos = await prisma.gallery.findMany({
      where: { category: "PHOTO" },
      orderBy: { createdAt: "asc" },
    });

    const meetingPhotos = dbPhotos.filter(isMeetingPhoto).map((item) => ({
      src: item.fileUrl,
      title: item.title,
    }));

    if (meetingPhotos.length) {
      const existing = new Set(meetingPhotos.map((photo) => photo.src));
      const missingFallback = fallbackPhotos.filter((photo) => !existing.has(photo.src));
      photos = [...meetingPhotos, ...missingFallback];
    }
  } catch {}

  return (
    <>
      <SiteHeader />
      <MeetingDocumentationGallery photos={photos} />
      <SiteFooter />
    </>
  );
}
