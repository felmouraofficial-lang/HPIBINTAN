export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
  response.cookies.delete("hpi_admin");
  return response;
}
