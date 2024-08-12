-- DropIndex
DROP INDEX `News_authorId_fkey` ON `news`;

-- DropIndex
DROP INDEX `News_categoryId_fkey` ON `news`;

-- DropIndex
DROP INDEX `News_userId_fkey` ON `news`;

-- DropIndex
DROP INDEX `NewsTags_newsId_fkey` ON `newstags`;

-- DropIndex
DROP INDEX `NewsTags_tagId_fkey` ON `newstags`;

-- AddForeignKey
ALTER TABLE `NewsTags` ADD CONSTRAINT `NewsTags_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `News`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NewsTags` ADD CONSTRAINT `NewsTags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tags`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Authors`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
