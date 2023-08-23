/*
  Warnings:

  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_name_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "description" TEXT NOT NULL;
