export const dynamic = "force-dynamic";

import { AdminShell } from "@/components/admin-shell";
import { AdminDestinationsManager } from "@/components/admin-destinations-manager";
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

function parseDestinations(value?: string | null): Destination[] {
  if (!value) return fallbackDestinations;
  try {
    const data = JSON.parse(value);
    return Array.isArray(data) ? data : fallbackDestinations;
  } catch {
    return fallbackDestinations;
  }
}

export default async function AdminDestinationsPage() {
  const setting = await prisma.settings.findUnique({ where: { key: "destinations" } }).catch(() => null);
  const destinations = parseDestinations(setting?.value);

  return (
    <AdminShell>
      <AdminDestinationsManager initialDestinations={destinations} />
    </AdminShell>
  );
}
