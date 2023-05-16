/*
  Warnings:

  - You are about to drop the column `image` on the `Campsite` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Campsite" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "mainImage" TEXT;
