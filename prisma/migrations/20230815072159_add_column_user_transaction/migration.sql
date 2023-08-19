/*
  Warnings:

  - Added the required column `status` to the `User_Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `User_Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User_Transaction" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;
