/*
  Warnings:

  - You are about to drop the column `collection` on the `runways` table. All the data in the column will be lost.
  - Added the required column `collection_type` to the `runways` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "runways" DROP COLUMN "collection",
ADD COLUMN     "collection_type" "CollectionType" NOT NULL;
