import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export const logos = ["/logos/logo-utama.png", "/logos/hpi-logo-1.jpeg", "/logos/hpi-logo-2.jpeg", "/logos/hpi-logo-3.jpeg"];
export function formatDate(value: Date | string) { return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(value)); }