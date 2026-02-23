/*
  Warnings:

  - The values [CASHIER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `cost` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `total` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('OWNER', 'STAFF', 'KASIR');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'STAFF';
COMMIT;

-- DropIndex
DROP INDEX "Product_sku_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cost",
DROP COLUMN "sku";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "status",
DROP COLUMN "totalAmount",
ADD COLUMN     "total" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "TransactionStatus";
