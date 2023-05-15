/*
  Warnings:

  - You are about to drop the column `description` on the `Campsite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Campsite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Campsite" DROP COLUMN "description",
ADD COLUMN     "longDescription" TEXT,
ADD COLUMN     "shortDescription" TEXT,
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Campsite_slug_key" ON "Campsite"("slug");
