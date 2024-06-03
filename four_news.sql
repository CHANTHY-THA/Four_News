-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 03, 2024 at 04:08 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `four_news`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_by` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID`, `name`, `description`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'title 1', 'description 1', 1, 'admin', NULL, '2024-06-03 03:06:18.118', '2024-06-03 03:06:18.118'),
(2, 'title 2', 'description 2', 1, 'admin', NULL, '2024-06-03 03:06:24.616', '2024-06-03 03:06:24.616'),
(3, 'title 3', 'description 3', 1, 'admin', NULL, '2024-06-03 03:06:44.735', '2024-06-03 03:06:44.735'),
(4, 'title 4', 'description 4', 0, 'admin', NULL, '2024-06-03 03:06:51.802', '2024-06-03 03:14:33.405'),
(5, 'title 5 updated', 'description 5', 0, 'admin', 'admin', '2024-06-03 03:06:57.479', '2024-06-03 03:12:43.153');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_by` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`ID`, `name`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'name 1 updated', 0, 'admin', 'admin', '2024-06-03 03:30:39.828', '2024-06-03 03:33:50.306'),
(2, 'name 2', 1, 'admin', NULL, '2024-06-03 03:30:45.399', '2024-06-03 03:30:45.399'),
(3, 'name 3', 1, 'admin', NULL, '2024-06-03 03:30:49.033', '2024-06-03 03:30:49.033'),
(4, 'name 4', 1, 'admin', NULL, '2024-06-03 03:30:51.844', '2024-06-03 03:30:51.844'),
(5, 'name 5', 1, 'admin', NULL, '2024-06-03 03:30:55.676', '2024-06-03 03:30:55.676');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('00487e3a-739a-4c2b-be68-5882e9aace89', 'cca10efd29ab5925b48c337c62c9f05ef4dd02cb214819799f26ae7f4df0d94a', '2024-06-03 02:42:14.927', '20240603024214_category', NULL, NULL, '2024-06-03 02:42:14.918', 1),
('6fbc495f-68f7-40bf-8d95-89905b60a906', 'af7b4310ffa5e9c369a8657ea0435cc7e7cb0b135fc73f822f5488945f14c06d', '2024-06-03 03:17:12.884', '20240603031712_tag', NULL, NULL, '2024-06-03 03:17:12.877', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
