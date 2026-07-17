export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { fallbackAnnouncements, fallbackDocuments, fallbackGallery, fallbackMeetings, fallbackMembers, fallbackTransportation } from "@/lib/fallback-data";

const map = { members: prisma.member, announcements: prisma.announcement, gallery: prisma.gallery, documents: prisma.documentation, transportation: prisma.transportation, meetings: prisma.meeting, attendance: prisma.attendance } as const;
const fallbackMap = { members: fallbackMembers, announcements: fallbackAnnouncements, gallery: fallbackGallery, documents: fallbackDocuments, transportation: fallbackTransportation, meetings: fallbackMeetings, attendance: [] } as const;
type Resource = keyof typeof map;
type Context = { params: Promise<{ resource: string }> };

async function guard() { return Boolean((await cookies()).get("hpi_admin")?.value); }
function isResource(resource: string): resource is Resource { return resource in map; }
function normalize(data: any) { const out = { ...data }; if ("isActive" in out) out.isActive = out.isActive === true || out.isActive === "true"; if ("isPublished" in out) out.isPublished = out.isPublished === true || out.isPublished === "true"; if ("capacity" in out) out.capacity = Number(out.capacity); if ("date" in out && out.date) out.date = new Date(out.date); Object.keys(out).forEach((k) => out[k] === "" && (out[k] = null)); return out; }

export async function GET(_: Request, context: Context) {
  const { resource } = await context.params;
  if (!isResource(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const model = map[resource];
  try {
    const rows = await (model as any).findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return NextResponse.json(rows.length ? rows : fallbackMap[resource]);
  } catch {
    return NextResponse.json(fallbackMap[resource]);
  }
}

export async function POST(request: Request, context: Context) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource } = await context.params;
  if (!isResource(resource)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const model = map[resource];
  try {
    return NextResponse.json(await (model as any).create({ data: normalize(await request.json()) }));
  } catch {
    return NextResponse.json({ error: "Database belum siap. Periksa DATABASE_URL, migration, dan seed di Vercel." }, { status: 503 });
  }
}
