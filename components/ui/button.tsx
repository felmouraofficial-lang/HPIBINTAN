import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-[0_16px_40px_rgba(215,25,32,.24)] transition hover:-translate-y-0.5 hover:bg-red-700 disabled:opacity-50", className)} {...props} />;
}
