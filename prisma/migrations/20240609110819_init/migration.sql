/*
  Warnings:

  - You are about to drop the `articletages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `articletages` DROP FOREIGN KEY `ArticleTages_newsId_fkey`;

-- DropForeignKey
ALTER TABLE `articletages` DROP FOREIGN KEY `ArticleTages_tagId_fkey`;

-- DropTable
DROP TABLE `articletages`;

-- CreateTable
CREATE TABLE `ArticleTags` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `newsId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_by` VARCHAR(191) NOT NULL,
    `updated_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArticleTags` ADD CONSTRAINT `ArticleTags_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `News`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleTags` ADD CONSTRAINT `ArticleTags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tags`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
