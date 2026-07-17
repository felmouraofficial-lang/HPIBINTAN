export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }
  const response = NextResponse.redirect(new URL("/admin/dashboard", request.url), 303);
  response.cookies.set("hpi_admin", admin.id, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}
