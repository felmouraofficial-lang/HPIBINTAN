import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { fallbackDestinations } from "@/lib/fallback-data";
import { fromPrismaDestination, normalizePublicDestination, parseStoredDestinations, toPrismaDestination, type PublicDestination } from "@/lib/destinations";

export async function GET() {
  try {
    const [dbDestinations, setting] = await Promise.all([
      prisma.destination.findMany({ where: { isPublished: true }, orderBy: [{ featured: "desc" }, { createdAt: "desc" }] }),
      prisma.settings.findUnique({ where: { key: "destinations" } }),
    ]);
    const fromDatabase = dbDestinations.map(fromPrismaDestination);
    const fromSettings = parseStoredDestinations(setting?.value);
    const destinations = fromDatabase.length ? fromDatabase : fromSettings.length ? fromSettings : fallbackDestinations;
    return NextResponse.json(destinations, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Destinasi belum bisa dimuat", destinations: fallbackDestinations }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const items = Array.isArray(body?.destinations) ? body.destinations : [];
    const destinations: PublicDestination[] = items.map(normalizePublicDestination).filter((item: PublicDestination) => item.name.trim());

    await prisma.$transaction(async (tx) => {
      await tx.settings.upsert({
        where: { key: "destinations" },
        update: { value: JSON.stringify(destinations) },
        create: { key: "destinations", value: JSON.stringify(destinations) },
      });
      await tx.destination.deleteMany({});
      if (destinations.length) await tx.destination.createMany({ data: destinations.map(toPrismaDestination) });
    });

    revalidatePath("/");
    revalidatePath("/destinasi");
    revalidatePath("/admin/destinations");
    revalidatePath("/admin/content");

    return NextResponse.json({ message: "Destinasi berhasil disimpan dan halaman utama sudah diperbarui.", destinations });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Destinasi gagal disimpan" }, { status: 500 });
  }
}
