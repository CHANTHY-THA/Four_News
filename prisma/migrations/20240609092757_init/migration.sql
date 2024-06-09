-- CreateTable
CREATE TABLE `Categories` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_by` VARCHAR(191) NOT NULL,
    `updated_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_by` VARCHAR(191) NOT NULL,
    `updated_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Authors` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `biography` VARCHAR(191) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_by` VARCHAR(191) NOT NULL,
    `updated_by` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `News` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `authorId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `short_description` TEXT NULL,
    `content` TEXT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_by` VARCHAR(191) NOT NULL,
    `updated_by` VARCHAR(191) NULL,
    `publish_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `profile` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Authors`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
