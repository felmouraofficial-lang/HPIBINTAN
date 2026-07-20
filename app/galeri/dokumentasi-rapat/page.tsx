export const dynamic = "force-dynamic";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MeetingDocumentationGallery } from "@/components/meeting-documentation-gallery";
import { prisma } from "@/lib/prisma";

export default async function MeetingDocumentationPage() {
  const photos = await prisma.gallery.findMany({ where: { isPublished: true, category: "PHOTO" }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  const mapped = photos.map((item) => ({ src: item.thumbnail || item.fileUrl, title: item.title }));
  return <><SiteHeader /><MeetingDocumentationGallery photos={mapped} /><SiteFooter /></>;
}
