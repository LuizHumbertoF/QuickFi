-- CreateTable
CREATE TABLE "Import" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Import_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImportTransaction" (
    "id" SERIAL NOT NULL,
    "importId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "paymentType" TEXT,
    "sugestedCategoryId" INTEGER NOT NULL,
    "finalCategoryId" INTEGER NOT NULL,
    "confidente" TEXT NOT NULL,
    "isDuplicate" BOOLEAN NOT NULL,
    "selected" BOOLEAN NOT NULL,

    CONSTRAINT "ImportTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Import" ADD CONSTRAINT "Import_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImportTransaction" ADD CONSTRAINT "ImportTransaction_importId_fkey" FOREIGN KEY ("importId") REFERENCES "Import"("id") ON DELETE CASCADE ON UPDATE CASCADE;
