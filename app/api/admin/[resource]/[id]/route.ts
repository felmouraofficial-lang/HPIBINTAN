export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const map = { members: prisma.member, announcements: prisma.announcement, gallery: prisma.gallery, documents: prisma.documentation, transportation: prisma.transportation, meetings: prisma.meeting, attendance: prisma.attendance } as const;
type Resource = keyof typeof map;
type Context = { params: Promise<{ resource: string; id: string }> };

async function guard() { return Boolean((await cookies()).get("hpi_admin")?.value); }
function isResource(resource: string): resource is Resource { return resource in map; }
function normalize(data: any) { const out = { ...data }; if ("isActive" in out) out.isActive = out.isActive === true || out.isActive === "true"; if ("isPublished" in out) out.isPublished = out.isPublished === true || out.isPublished === "true"; if ("capacity" in out) out.capacity = Number(out.capacity); if ("date" in out && out.date) out.date = new Date(out.date); if ("publishedAt" in out && out.publishedAt) out.publishedAt = new Date(out.publishedAt); Object.keys(out).forEach((k) => out[k] === "" && (out[k] = null)); return out; }
function revalidateWebsite(resource: Resource) { ["/", "/anggota", "/galeri", "/dokumentasi", "/transportasi", "/pengumuman"].forEach((path) => revalidatePath(path)); revalidatePath(`/admin/${resource}`); }
function json(data: unknown, init?: ResponseInit) { const response = NextResponse.json(data, init); response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate"); return response; }

export async function PUT(request: Request, context: Context) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource, id } = await context.params;
  if (!isResource(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const model = map[resource];
  try {
    const updated = await (model as any).update({ where: { id }, data: normalize(await request.json()) });
    revalidateWebsite(resource);
    return json({ ok: true, message: "Update berhasil. Halaman utama sudah disinkronkan.", row: updated });
  } catch {
    return json({ error: "Database belum siap atau data belum ada di database. Klik refresh, lalu coba edit lagi." }, { status: 503 });
  }
}

export async function DELETE(_: Request, context: Context) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource, id } = await context.params;
  if (!isResource(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const model = map[resource];
  try {
    await (model as any).delete({ where: { id } });
    revalidateWebsite(resource);
    return json({ ok: true, message: "Data berhasil dihapus dan halaman utama sudah disinkronkan." });
  } catch {
    return json({ error: "Database belum siap atau data tidak ditemukan." }, { status: 503 });
  }
}
