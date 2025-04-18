-- CreateEnum
CREATE TYPE "CriticType" AS ENUM ('influencer', 'magazine', 'blogger');

-- CreateEnum
CREATE TYPE "CollectionType" AS ENUM ('resort', 'pre_fall', 'spring_summer_ready_to_wear', 'fall_winter_ready_to_wear', 'fall_couture', 'spring_couture', 'couture', 'capsule', 'collaboration', 'bridal');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('female', 'male', 'unisex');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'user',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "designers" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "date_of_death" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "validated" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "designers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "runways" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "slug" VARCHAR(150) NOT NULL,
    "collection" "CollectionType" NOT NULL,
    "brandId" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "validated" BOOLEAN NOT NULL DEFAULT true,
    "year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "runways_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "runway_images" (
    "id" TEXT NOT NULL,
    "runwayId" TEXT NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "publicId" VARCHAR(300) NOT NULL,
    "format" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "runway_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "runway_contributors" (
    "id" TEXT NOT NULL,
    "runway_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "runway_contributors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "designer_runways" (
    "id" TEXT NOT NULL,
    "designer_id" TEXT NOT NULL,
    "runway_id" TEXT NOT NULL,

    CONSTRAINT "designer_runways_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unfound_runways" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unfound_runways_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "critics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "instagram" TEXT,
    "youtube" TEXT,
    "website" TEXT,
    "description" TEXT NOT NULL,
    "type" "CriticType" NOT NULL DEFAULT 'influencer',

    CONSTRAINT "critics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "source_link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(50) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "runway_tags" (
    "id" TEXT NOT NULL,
    "runway_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "runway_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "designers_slug_key" ON "designers"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "runways_link_key" ON "runways"("link");

-- CreateIndex
CREATE UNIQUE INDEX "runways_slug_key" ON "runways"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "designer_runways_designer_id_runway_id_key" ON "designer_runways"("designer_id", "runway_id");

-- CreateIndex
CREATE UNIQUE INDEX "brands_slug_key" ON "brands"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "unfound_runways_link_key" ON "unfound_runways"("link");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "runway_tags_runway_id_tag_id_key" ON "runway_tags"("runway_id", "tag_id");

-- AddForeignKey
ALTER TABLE "runways" ADD CONSTRAINT "runways_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "runway_images" ADD CONSTRAINT "runway_images_runwayId_fkey" FOREIGN KEY ("runwayId") REFERENCES "runways"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "runway_contributors" ADD CONSTRAINT "runway_contributors_runway_id_fkey" FOREIGN KEY ("runway_id") REFERENCES "runways"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "runway_contributors" ADD CONSTRAINT "runway_contributors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "designer_runways" ADD CONSTRAINT "designer_runways_designer_id_fkey" FOREIGN KEY ("designer_id") REFERENCES "designers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "designer_runways" ADD CONSTRAINT "designer_runways_runway_id_fkey" FOREIGN KEY ("runway_id") REFERENCES "runways"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "runway_tags" ADD CONSTRAINT "runway_tags_runway_id_fkey" FOREIGN KEY ("runway_id") REFERENCES "runways"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "runway_tags" ADD CONSTRAINT "runway_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
