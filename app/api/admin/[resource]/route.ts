export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
const map = { members: prisma.member, announcements: prisma.announcement, gallery: prisma.gallery, documents: prisma.documentation, transportation: prisma.transportation, meetings: prisma.meeting, attendance: prisma.attendance, destinations: prisma.destination, agendas: prisma.agenda, media: prisma.mediaItem, websiteSettings: prisma.websiteSetting, homeContent: prisma.homeContent } as const;
type Resource = keyof typeof map;
type Context = { params: Promise<{ resource: string }> };

async function guard() { return Boolean((await cookies()).get("hpi_admin")?.value); }
function isResource(resource: string): resource is Resource { return resource in map; }
function normalize(data: any) { const out = { ...data }; ["isActive", "isPublished", "featured"].forEach((key) => { if (key in out) out[key] = out[key] === true || out[key] === "true"; }); ["capacity", "sortOrder"].forEach((key) => { if (key in out && out[key] !== "") out[key] = Number(out[key]); }); ["latitude", "longitude"].forEach((key) => { if (key in out && out[key] !== "") out[key] = Number(out[key]); }); ["date", "publishedAt"].forEach((key) => { if (key in out && out[key]) out[key] = new Date(out[key]); }); if ("gallery" in out && Array.isArray(out.gallery)) out.gallery = JSON.stringify(out.gallery); Object.keys(out).forEach((k) => out[k] === "" && (out[k] = null)); return out; }
function revalidateWebsite(resource: Resource) { ["/", "/anggota", "/galeri", "/dokumentasi", "/transportasi", "/pengumuman", "/destinasi", "/kontak", "/tentang-kami"].forEach((path) => revalidatePath(path)); revalidatePath(`/admin/${resource}`); }
function json(data: unknown, init?: ResponseInit) { const response = NextResponse.json(data, init); response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate"); return response; }

export async function GET(_: Request, context: Context) {
  const { resource } = await context.params;
  if (!isResource(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const model = map[resource];
  try {
    const rows = await (model as any).findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return json(rows);
  } catch {
    return json({ error: "Database belum siap. Periksa DATABASE_URL, migration, dan seed di Vercel.", rows: [] }, { status: 503 });
  }
}

export async function POST(request: Request, context: Context) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource } = await context.params;
  if (!isResource(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const model = map[resource];
  try {
    const created = await (model as any).create({ data: normalize(await request.json()) });
    revalidateWebsite(resource);
    return json({ ok: true, message: "Data berhasil ditambahkan dan halaman utama sudah disinkronkan.", row: created });
  } catch {
    return json({ error: "Database belum siap. Periksa DATABASE_URL, migration, dan seed di Vercel." }, { status: 503 });
  }
}
