/*
  Warnings:

  - You are about to drop the column `publicId` on the `runway_images` table. All the data in the column will be lost.
  - You are about to drop the column `runwayId` on the `runway_images` table. All the data in the column will be lost.
  - You are about to drop the column `brandId` on the `runways` table. All the data in the column will be lost.
  - You are about to drop the `designer_runways` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `thumbnailUrl` to the `designers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `runway_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runway_id` to the `runway_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand_id` to the `runways` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designer_id` to the `runways` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "designer_runways" DROP CONSTRAINT "designer_runways_designer_id_fkey";

-- DropForeignKey
ALTER TABLE "designer_runways" DROP CONSTRAINT "designer_runways_runway_id_fkey";

-- DropForeignKey
ALTER TABLE "runway_images" DROP CONSTRAINT "runway_images_runwayId_fkey";

-- DropForeignKey
ALTER TABLE "runways" DROP CONSTRAINT "runways_brandId_fkey";

-- AlterTable
ALTER TABLE "brands" ALTER COLUMN "validated" SET DEFAULT false;

-- AlterTable
ALTER TABLE "designers" ADD COLUMN     "thumbnailUrl" TEXT NOT NULL,
ALTER COLUMN "validated" SET DEFAULT false;

-- AlterTable
ALTER TABLE "runway_images" DROP COLUMN "publicId",
DROP COLUMN "runwayId",
ADD COLUMN     "public_id" VARCHAR(300) NOT NULL,
ADD COLUMN     "runway_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "runways" DROP COLUMN "brandId",
ADD COLUMN     "brand_id" TEXT NOT NULL,
ADD COLUMN     "designer_id" TEXT NOT NULL,
ALTER COLUMN "validated" SET DEFAULT false;

-- DropTable
DROP TABLE "designer_runways";

-- AddForeignKey
ALTER TABLE "runways" ADD CONSTRAINT "runways_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "runways" ADD CONSTRAINT "runways_designer_id_fkey" FOREIGN KEY ("designer_id") REFERENCES "designers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "runway_images" ADD CONSTRAINT "runway_images_runway_id_fkey" FOREIGN KEY ("runway_id") REFERENCES "runways"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
