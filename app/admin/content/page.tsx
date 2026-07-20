export const dynamic = "force-dynamic";

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { fallbackProfile, fallbackSettings, fallbackPartners } from "@/lib/fallback-data";
import type { ReactNode } from "react";

async function saveUploadedFile(file: FormDataEntryValue | null, fallback: string) {
  if (!(file instanceof File) || file.size === 0) return fallback;
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".bin";
  const name = `${Date.now()}-${crypto.randomUUID()}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);
  return `/uploads/${name}`;
}

async function save(form: FormData) {
  "use server";
  const heroImage = await saveUploadedFile(form.get("hero_image_file"), String(form.get("hero_image_current") || fallbackSettings.hero_image));
  const mapImage = await saveUploadedFile(form.get("map_image_file"), String(form.get("map_image_current") || fallbackSettings.map_image));

  await prisma.organizationProfile.upsert({
    where: { id: "main" },
    update: { heroTitle: String(form.get("heroTitle") || fallbackProfile.heroTitle), heroSubtitle: String(form.get("heroSubtitle") || fallbackProfile.heroSubtitle), history: String(form.get("history") || fallbackProfile.history), vision: String(form.get("vision") || fallbackProfile.vision), mission: String(form.get("mission") || fallbackProfile.mission), structure: String(form.get("structure") || fallbackProfile.structure) },
    create: { id: "main", heroTitle: String(form.get("heroTitle") || fallbackProfile.heroTitle), heroSubtitle: String(form.get("heroSubtitle") || fallbackProfile.heroSubtitle), history: String(form.get("history") || fallbackProfile.history), vision: String(form.get("vision") || fallbackProfile.vision), mission: String(form.get("mission") || fallbackProfile.mission), structure: String(form.get("structure") || fallbackProfile.structure) },
  });

  const values: Record<string, string> = {
    hero_image: heroImage,
    map_image: mapImage,
    map_text: String(form.get("map_text") || fallbackSettings.map_text),
    partners: String(form.get("partners") || JSON.stringify(fallbackPartners)),
  };

  for (const [key, value] of Object.entries(values)) {
    await prisma.settings.upsert({ where: { key }, update: { value }, create: { key, value } });
  }

  ["/", "/tentang-kami", "/admin/content"].forEach((target) => revalidatePath(target));
}

export default async function ContentPage() {
  const [p, settings] = await Promise.all([prisma.organizationProfile.findFirst().catch(() => null), prisma.settings.findMany().catch(() => [])]);
  const setting = Object.fromEntries(settings.map((item) => [item.key, item.value]));
  const profile = { ...fallbackProfile, ...p };

  return <AdminShell><div className="rounded-[2rem] bg-zinc-950 p-8 text-white"><p className="text-sm font-black uppercase tracking-[.2em] text-gold">CMS Website</p><h1 className="mt-3 text-4xl font-black">Beranda, profil, peta, dan partner</h1><p className="mt-3 max-w-3xl text-zinc-300">Konten lama tetap menjadi baseline. Perubahan dari CMS akan langsung menimpa bagian yang diedit.</p></div><form action={save} className="mt-6 grid gap-5 rounded-[2rem] bg-white p-6 shadow-soft"><Section title="Hero & Profil"><input name="heroTitle" defaultValue={profile.heroTitle} placeholder="Hero title" className="h-12 rounded-xl border px-4" /><textarea name="heroSubtitle" defaultValue={profile.heroSubtitle} placeholder="Hero subtitle" className="min-h-24 rounded-xl border p-4" /><FileInput name="hero_image_file" currentName="hero_image_current" currentValue={setting.hero_image ?? fallbackSettings.hero_image} label="Upload Foto Hero" /><textarea name="history" defaultValue={profile.history} placeholder="Sejarah" className="min-h-32 rounded-xl border p-4" /><textarea name="vision" defaultValue={profile.vision} placeholder="Visi" className="min-h-24 rounded-xl border p-4" /><textarea name="mission" defaultValue={profile.mission} placeholder="Misi" className="min-h-24 rounded-xl border p-4" /><textarea name="structure" defaultValue={profile.structure} placeholder="Struktur organisasi" className="min-h-24 rounded-xl border p-4" /></Section><Section title="Peta Pulau"><FileInput name="map_image_file" currentName="map_image_current" currentValue={setting.map_image ?? fallbackSettings.map_image} label="Upload Gambar Peta" /><textarea name="map_text" defaultValue={setting.map_text ?? fallbackSettings.map_text} placeholder="Penjelasan peta" className="min-h-28 rounded-xl border p-4" /></Section><Section title="Partner"><textarea name="partners" defaultValue={setting.partners ?? JSON.stringify(fallbackPartners)} placeholder="JSON partner" className="min-h-32 rounded-xl border p-4 font-mono text-xs" /></Section><Button type="submit" className="w-fit">Simpan Konten CMS</Button></form></AdminShell>;
}

function Section({ title, children }: { title: string; children: ReactNode }) { return <section className="grid gap-4 border-b border-zinc-200 pb-5 last:border-0"><h2 className="text-xl font-black">{title}</h2>{children}</section>; }
function FileInput({ name, currentName, currentValue, label }: { name: string; currentName: string; currentValue: string; label: string }) { return <label className="grid gap-2 rounded-xl border border-dashed border-zinc-300 p-4 text-sm font-semibold">{label}<input type="hidden" name={currentName} value={currentValue} /><input name={name} type="file" accept="image/*" className="rounded-lg border p-2" /><span className="truncate text-xs text-zinc-500">File saat ini: {currentValue}</span></label>; }
