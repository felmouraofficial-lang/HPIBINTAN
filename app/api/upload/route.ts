export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "video/mp4", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !allowed.has(file.type)) return NextResponse.json({ error: "Format file tidak didukung" }, { status: 400 });
  const bytes = Buffer.from(await file.arrayBuffer());
  if (process.env.VERCEL) {
    const maxInlineSize = 4 * 1024 * 1024;
    if (bytes.length > maxInlineSize) return NextResponse.json({ error: "File terlalu besar untuk upload langsung. Gunakan file maksimal 4MB atau sambungkan storage permanen." }, { status: 413 });
    const url = `data:${file.type};base64,${bytes.toString("base64")}`;
    await prisma.mediaItem.create({ data: { url, filename: file.name, mimeType: file.type, size: bytes.length } }).catch(() => null);
    return NextResponse.json({ url });
  }
  const ext = path.extname(file.name) || ".bin";
  const name = `${Date.now()}-${crypto.randomUUID()}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);
  const url = `/uploads/${name}`;
  await prisma.mediaItem.create({ data: { url, filename: file.name, mimeType: file.type, size: bytes.length } }).catch(() => null);
  return NextResponse.json({ url });
}
