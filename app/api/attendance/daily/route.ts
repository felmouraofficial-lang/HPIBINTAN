import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const form = await request.formData();
  const memberId = String(form.get("memberId") ?? "");
  const type = String(form.get("type") ?? "checkin");
  const photoUrl = String(form.get("photoUrl") ?? "");
  const notes = String(form.get("notes") ?? "");
  if (!memberId || !photoUrl) return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  const now = new Date();
  await prisma.attendance.create({ data: { memberId, date: now, checkIn: type === "checkin" ? now : null, checkOut: type === "checkout" ? now : null, status: "PRESENT", notes: JSON.stringify({ notes, photoUrl, type }) } });
  return NextResponse.json({ ok: true });
}
