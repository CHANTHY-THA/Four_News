-- CreateTable
CREATE TABLE `ArticleTages` (
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
ALTER TABLE `ArticleTages` ADD CONSTRAINT `ArticleTages_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `News`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleTages` ADD CONSTRAINT `ArticleTages_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tags`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
