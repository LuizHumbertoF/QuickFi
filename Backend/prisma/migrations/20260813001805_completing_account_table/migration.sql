/*
  Warnings:

  - You are about to drop the column `balance` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institution` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "balance",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "institution" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");
