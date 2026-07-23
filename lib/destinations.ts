import type { Destination as PrismaDestination } from "@prisma/client";

export type PublicDestination = {
  category: string;
  name: string;
  description: string;
  location: string;
  image: string;
  mapUrl?: string;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "destinasi";
}

export function parseStoredDestinations(value?: string | null): PublicDestination[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(normalizePublicDestination).filter((item) => item.name.trim()) : [];
  } catch {
    return [];
  }
}

export function normalizePublicDestination(item: Partial<PublicDestination>): PublicDestination {
  return {
    category: String(item.category || "Wisata"),
    name: String(item.name || "Destinasi Baru"),
    description: String(item.description || "Deskripsi destinasi dapat diperbarui melalui dashboard admin."),
    location: String(item.location || "Pulau Bintan"),
    image: String(item.image || "/head-background.jpg"),
    mapUrl: String(item.mapUrl || ""),
  };
}

export function fromPrismaDestination(item: PrismaDestination): PublicDestination {
  return {
    category: item.category,
    name: item.name,
    description: item.shortDescription || item.longDescription,
    location: item.location,
    image: item.thumbnail || firstGalleryImage(item.gallery) || "/head-background.jpg",
    mapUrl: item.googleMapsUrl || undefined,
  };
}

export function toPrismaDestination(item: Partial<PublicDestination>, index = 0) {
  const normalized = normalizePublicDestination(item);
  return {
    name: normalized.name.trim() || `Destinasi ${index + 1}`,
    slug: `${slugify(normalized.name)}-${index + 1}`,
    category: normalized.category.trim() || "Wisata",
    location: normalized.location.trim() || "Pulau Bintan",
    googleMapsUrl: normalized.mapUrl?.trim() || null,
    thumbnail: normalized.image.trim() || null,
    gallery: JSON.stringify(normalized.image ? [normalized.image] : []),
    shortDescription: normalized.description.trim() || "Deskripsi destinasi dapat diperbarui melalui dashboard admin.",
    longDescription: normalized.description.trim() || "Deskripsi destinasi dapat diperbarui melalui dashboard admin.",
    isPublished: true,
    featured: index < 6,
  };
}

function firstGalleryImage(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? String(parsed[0] || "") : "";
  } catch {
    return "";
  }
}
