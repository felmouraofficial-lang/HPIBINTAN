export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const map = { members: prisma.member, announcements: prisma.announcement, gallery: prisma.gallery, documents: prisma.documentation, transportation: prisma.transportation, meetings: prisma.meeting, attendance: prisma.attendance } as const;
type Resource = keyof typeof map;
type Context = { params: Promise<{ resource: string; id: string }> };

async function guard() { return Boolean((await cookies()).get("hpi_admin")?.value); }
function isResource(resource: string): resource is Resource { return resource in map; }
function normalize(data: any) { const out = { ...data }; if ("isActive" in out) out.isActive = out.isActive === true || out.isActive === "true"; if ("isPublished" in out) out.isPublished = out.isPublished === true || out.isPublished === "true"; if ("capacity" in out) out.capacity = Number(out.capacity); if ("date" in out && out.date) out.date = new Date(out.date); Object.keys(out).forEach((k) => out[k] === "" && (out[k] = null)); return out; }

export async function PUT(request: Request, context: Context) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource, id } = await context.params;
  if (!isResource(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const model = map[resource];
  try {
    return NextResponse.json(await (model as any).update({ where: { id }, data: normalize(await request.json()) }));
  } catch {
    return NextResponse.json({ error: "Database belum siap. Periksa DATABASE_URL, migration, dan seed di Vercel." }, { status: 503 });
  }
}

export async function DELETE(_: Request, context: Context) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource, id } = await context.params;
  if (!isResource(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const model = map[resource];
  try {
    await (model as any).delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Database belum siap. Periksa DATABASE_URL, migration, dan seed di Vercel." }, { status: 503 });
  }
}
