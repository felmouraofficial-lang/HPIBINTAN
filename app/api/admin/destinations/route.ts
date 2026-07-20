import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { fallbackDestinations } from "@/lib/fallback-data";

type Destination = {
  category: string;
  name: string;
  description: string;
  location: string;
  image: string;
  mapUrl?: string;
};

function normalizeDestination(item: Partial<Destination>): Destination {
  return {
    category: String(item.category || "Wisata"),
    name: String(item.name || "Destinasi Baru"),
    description: String(item.description || "Deskripsi destinasi dapat diperbarui melalui dashboard admin."),
    location: String(item.location || "Pulau Bintan"),
    image: String(item.image || "/head-background.jpg"),
    mapUrl: String(item.mapUrl || ""),
  };
}

export async function GET() {
  try {
    const setting = await prisma.settings.findUnique({ where: { key: "destinations" } });
    const data = setting?.value ? JSON.parse(setting.value) : fallbackDestinations;
    return NextResponse.json(Array.isArray(data) && data.length ? data : fallbackDestinations, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json(fallbackDestinations, { headers: { "Cache-Control": "no-store" } });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const items: Partial<Destination>[] = Array.isArray(body?.destinations) ? body.destinations : [];
    const destinations = items.map(normalizeDestination).filter((item) => item.name.trim());

    await prisma.settings.upsert({
      where: { key: "destinations" },
      update: { value: JSON.stringify(destinations) },
      create: { key: "destinations", value: JSON.stringify(destinations) },
    });

    revalidatePath("/");
    revalidatePath("/admin/destinations");
    revalidatePath("/admin/content");

    return NextResponse.json({ message: "Destinasi berhasil disimpan dan halaman utama sudah diperbarui.", destinations });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Destinasi gagal disimpan" }, { status: 500 });
  }
}
