import { z } from "zod";

export const memberSchema = z.object({ name: z.string().min(2), position: z.string().min(2), contact: z.string().optional(), photo: z.string().optional(), isActive: z.coerce.boolean().default(true) });
export const announcementSchema = z.object({ title: z.string().min(3), content: z.string().min(10), isPublished: z.coerce.boolean().default(true) });
export const gallerySchema = z.object({ title: z.string().min(3), category: z.enum(["PHOTO", "VIDEO"]), fileUrl: z.string().min(1), thumbnail: z.string().optional(), description: z.string().optional() });
export const documentSchema = z.object({ title: z.string().min(3), fileUrl: z.string().min(1), fileType: z.string().min(2), description: z.string().optional() });
export const transportSchema = z.object({ name: z.string().min(2), vehicleType: z.string().min(2), capacity: z.coerce.number().int().positive(), status: z.enum(["AVAILABLE", "UNAVAILABLE"]), photo: z.string().optional(), description: z.string().optional() });
export const meetingSchema = z.object({ title: z.string().min(3), date: z.coerce.date(), time: z.string().min(3), location: z.string().min(2), description: z.string().optional() });
export const contactSchema = z.object({ address: z.string().min(5), mapUrl: z.string().optional(), whatsapp: z.string().optional(), email: z.string().email().optional().or(z.literal("")) });
export const profileSchema = z.object({ history: z.string().min(10), vision: z.string().min(5), mission: z.string().min(5), structure: z.string().min(5), heroTitle: z.string().min(3), heroSubtitle: z.string().min(10) });
