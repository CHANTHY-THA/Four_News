/*
  Warnings:

  - You are about to drop the column `name` on the `authors` table. All the data in the column will be lost.
  - You are about to drop the `testing` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `biography` to the `authors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `authors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `authors` DROP COLUMN `name`,
    ADD COLUMN `biography` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `testing`;

-- CreateTable
CREATE TABLE `tags` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_by` VARCHAR(191) NOT NULL,
    `updated_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
