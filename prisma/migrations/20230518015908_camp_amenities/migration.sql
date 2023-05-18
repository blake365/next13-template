-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "addonIds" TEXT[];

-- AlterTable
ALTER TABLE "Campsite" ADD COLUMN     "cancellation" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "directions" TEXT,
ADD COLUMN     "firePit" BOOLEAN,
ADD COLUMN     "image2" TEXT,
ADD COLUMN     "image3" TEXT,
ADD COLUMN     "mapImage" TEXT,
ADD COLUMN     "picnicTable" BOOLEAN,
ADD COLUMN     "potableWater" BOOLEAN,
ADD COLUMN     "primitive" BOOLEAN,
ADD COLUMN     "rules" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "streetAddress" TEXT,
ADD COLUMN     "toilets" BOOLEAN,
ADD COLUMN     "zip" TEXT;

-- CreateTable
CREATE TABLE "Addon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "campId" TEXT NOT NULL,

    CONSTRAINT "Addon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AddonToBooking" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Addon_id_key" ON "Addon"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AddonToBooking_AB_unique" ON "_AddonToBooking"("A", "B");

-- CreateIndex
CREATE INDEX "_AddonToBooking_B_index" ON "_AddonToBooking"("B");

-- AddForeignKey
ALTER TABLE "Addon" ADD CONSTRAINT "Addon_campId_fkey" FOREIGN KEY ("campId") REFERENCES "Campsite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddonToBooking" ADD CONSTRAINT "_AddonToBooking_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddonToBooking" ADD CONSTRAINT "_AddonToBooking_B_fkey" FOREIGN KEY ("B") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
