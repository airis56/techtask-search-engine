/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "platform" AS ENUM ('PC', 'XBOX', 'PLAYSTATION', 'NINTENDO');

-- CreateEnum
CREATE TYPE "region" AS ENUM ('GLOBAL', 'EUROPE', 'USA', 'ASIA');

-- CreateEnum
CREATE TYPE "distributionType" AS ENUM ('KEY', 'ACCOUNT');

-- CreateEnum
CREATE TYPE "stockStatus" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK', 'LIMITED');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_gameId_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "Product";

-- DropEnum
DROP TYPE "DistributionType";

-- DropEnum
DROP TYPE "Platform";

-- DropEnum
DROP TYPE "Region";

-- DropEnum
DROP TYPE "StockStatus";

-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "baseImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "platform" "platform" NOT NULL,
    "region" "region" NOT NULL,
    "distributionType" "distributionType" NOT NULL,
    "currentPrice" DECIMAL(10,2) NOT NULL,
    "originalPrice" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "cashbackAmount" DECIMAL(10,2),
    "stockStatus" "stockStatus" NOT NULL DEFAULT 'IN_STOCK',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_gameId_idx" ON "product"("gameId");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
