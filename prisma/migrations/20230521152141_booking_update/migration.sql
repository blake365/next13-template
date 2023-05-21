-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "adults" DROP NOT NULL,
ALTER COLUMN "children" DROP NOT NULL,
ALTER COLUMN "pets" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Campsite" ADD COLUMN     "subtitle" TEXT;
