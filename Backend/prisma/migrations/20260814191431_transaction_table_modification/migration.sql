/*
  Warnings:

  - Added the required column `recurrentTransaction` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "recurrentTransaction" BOOLEAN NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
