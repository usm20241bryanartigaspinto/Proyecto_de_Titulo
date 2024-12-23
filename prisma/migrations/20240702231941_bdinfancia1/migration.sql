/*
  Warnings:

  - You are about to drop the column `description` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `item` table. All the data in the column will be lost.
  - Added the required column `cantidad` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` DROP COLUMN `description`,
    DROP COLUMN `quantity`,
    ADD COLUMN `cantidad` INTEGER NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;
