import { AdminShell } from "@/components/admin-shell";
import { AdminCrud } from "@/components/admin-crud";

export default function Page() {
  return <AdminShell><AdminCrud title="Beranda" resource="homeContent" fields={[
    { name: "heroImage", label: "Hero Banner", type: "file", accept: "image/*" },
    { name: "heroTitle", label: "Judul", required: true },
    { name: "heroSubtitle", label: "Subtitle", type: "textarea", required: true },
    { name: "heroCtaText", label: "CTA Text" },
    { name: "heroCtaUrl", label: "CTA Link" },
    { name: "aboutTitle", label: "Tentang Judul" },
    { name: "aboutContent", label: "Tentang", type: "textarea", required: true },
    { name: "visionTitle", label: "Visi Judul" },
    { name: "visionContent", label: "Visi", type: "textarea", required: true },
    { name: "missionTitle", label: "Misi Judul" },
    { name: "missionContent", label: "Misi", type: "textarea", required: true },
    { name: "footerText", label: "Footer Beranda", type: "textarea" },
  ]} /></AdminShell>;
}
