import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const form = await request.formData();
  const meetingId = String(form.get("meetingId") ?? "");
  const memberId = String(form.get("memberId") ?? "");
  const status = String(form.get("status") || "PRESENT") as "PRESENT" | "LATE" | "ABSENT";
  if (!meetingId || !memberId) return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  await prisma.meetingAttendance.upsert({ where: { meetingId_memberId: { meetingId, memberId } }, update: { status, checkedAt: new Date() }, create: { meetingId, memberId, status } });
  return NextResponse.json({ ok: true });
}
