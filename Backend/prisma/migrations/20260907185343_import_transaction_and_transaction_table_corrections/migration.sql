/*
  Warnings:

  - You are about to drop the column `confidente` on the `ImportTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `finalCategoryId` on the `ImportTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `isDuplicate` on the `ImportTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `selected` on the `ImportTransaction` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Import` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `ImportTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ImportTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Import" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ImportTransaction" DROP COLUMN "confidente",
DROP COLUMN "finalCategoryId",
DROP COLUMN "isDuplicate",
DROP COLUMN "selected",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "sugestedCategoryId" SET DATA TYPE TEXT;
