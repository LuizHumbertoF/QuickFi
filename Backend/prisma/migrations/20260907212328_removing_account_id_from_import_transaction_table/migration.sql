/*
  Warnings:

  - You are about to drop the column `accountId` on the `ImportTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `sugestedCategoryId` on the `ImportTransaction` table. All the data in the column will be lost.
  - Added the required column `balance` to the `ImportTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sugestedCategory` to the `ImportTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImportTransaction" DROP COLUMN "accountId",
DROP COLUMN "sugestedCategoryId",
ADD COLUMN     "balance" INTEGER NOT NULL,
ADD COLUMN     "sugestedCategory" TEXT NOT NULL;
