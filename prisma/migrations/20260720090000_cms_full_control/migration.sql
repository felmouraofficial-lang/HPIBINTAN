CREATE TABLE "HomeContent" (
  "id" TEXT NOT NULL,
  "heroTitle" TEXT NOT NULL DEFAULT 'DPC HPI Kabupaten Bintan',
  "heroSubtitle" TEXT NOT NULL DEFAULT '',
  "heroCtaText" TEXT NOT NULL DEFAULT 'Guide Booking',
  "heroCtaUrl" TEXT NOT NULL DEFAULT 'https://wa.me/6281275657026',
  "heroImage" TEXT,
  "aboutTitle" TEXT NOT NULL DEFAULT 'Tentang Organisasi',
  "aboutContent" TEXT NOT NULL DEFAULT '',
  "visionTitle" TEXT NOT NULL DEFAULT 'Visi',
  "visionContent" TEXT NOT NULL DEFAULT '',
  "missionTitle" TEXT NOT NULL DEFAULT 'Misi',
  "missionContent" TEXT NOT NULL DEFAULT '',
  "footerText" TEXT NOT NULL DEFAULT '',
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "HomeContent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WebsiteSetting" (
  "id" TEXT NOT NULL,
  "websiteName" TEXT NOT NULL DEFAULT 'HPI Bintan',
  "logo" TEXT,
  "favicon" TEXT,
  "address" TEXT NOT NULL DEFAULT '',
  "email" TEXT,
  "phone" TEXT,
  "whatsapp" TEXT,
  "socials" TEXT NOT NULL DEFAULT '',
  "footer" TEXT NOT NULL DEFAULT '',
  "copyright" TEXT NOT NULL DEFAULT 'Copyright 2026 HPI Bintan',
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "WebsiteSetting_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MediaItem" (
  "id" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "filename" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "size" INTEGER NOT NULL,
  "alt" TEXT,
  "folder" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MediaItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Destination" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "latitude" DOUBLE PRECISION,
  "longitude" DOUBLE PRECISION,
  "googleMapsUrl" TEXT,
  "thumbnail" TEXT,
  "gallery" TEXT NOT NULL DEFAULT '[]',
  "shortDescription" TEXT NOT NULL,
  "longDescription" TEXT NOT NULL,
  "facilities" TEXT,
  "openingHours" TEXT,
  "ticketPrice" TEXT,
  "contact" TEXT,
  "whatsapp" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Agenda" (
  "id" TEXT NOT NULL,
  "coverImage" TEXT,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "badge" TEXT,
  "shortDescription" TEXT NOT NULL,
  "longDescription" TEXT NOT NULL,
  "date" TIMESTAMP(3) NOT NULL,
  "time" TEXT,
  "location" TEXT,
  "registrationUrl" TEXT,
  "contactPerson" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Agenda_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Destination_slug_key" ON "Destination"("slug");
CREATE UNIQUE INDEX "Agenda_slug_key" ON "Agenda"("slug");

ALTER TABLE "Gallery" ADD COLUMN "caption" TEXT,
ADD COLUMN "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Documentation" ADD COLUMN "thumbnail" TEXT,
ADD COLUMN "category" TEXT;

ALTER TABLE "Transportation" ADD COLUMN "category" TEXT,
ADD COLUMN "contact" TEXT,
ADD COLUMN "whatsapp" TEXT,
ADD COLUMN "price" TEXT,
ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Announcement" ADD COLUMN "slug" TEXT,
ADD COLUMN "cover" TEXT,
ADD COLUMN "thumbnail" TEXT,
ADD COLUMN "fullContent" TEXT,
ADD COLUMN "pdfUrl" TEXT;

CREATE UNIQUE INDEX "Announcement_slug_key" ON "Announcement"("slug");
