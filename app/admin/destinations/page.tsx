export const dynamic = "force-dynamic";

import { AdminShell } from "@/components/admin-shell";
import { AdminDestinationsManager } from "@/components/admin-destinations-manager";
import { prisma } from "@/lib/prisma";
import { fallbackDestinations } from "@/lib/fallback-data";
import { fromPrismaDestination, parseStoredDestinations, type PublicDestination } from "@/lib/destinations";

export default async function AdminDestinationsPage() {
  const [dbDestinations, setting] = await Promise.all([
    prisma.destination.findMany({ where: { isPublished: true }, orderBy: [{ featured: "desc" }, { createdAt: "desc" }] }).catch(() => []),
    prisma.settings.findUnique({ where: { key: "destinations" } }).catch(() => null),
  ]);
  const fromDatabase: PublicDestination[] = dbDestinations.map(fromPrismaDestination);
  const fromSettings = parseStoredDestinations(setting?.value);
  const destinations = fromDatabase.length ? fromDatabase : fromSettings.length ? fromSettings : fallbackDestinations;

  return <AdminShell><AdminDestinationsManager initialDestinations={destinations} /></AdminShell>;
}
