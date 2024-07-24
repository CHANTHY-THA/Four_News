-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: four_news
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('520d75a8-5f8a-4264-a38f-f14a54e18492','4c653e832fa93e230673478cb7dad66e71dbd4e3b3a8279a9f88e9e9e7a3cfc2','2024-06-09 12:25:34.900','20240609122534_init',NULL,NULL,'2024-06-09 12:25:34.409',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `biography` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Dara','Profesonal Author',1,'admin','tchanthy','2024-06-09 12:40:22.293','2024-06-10 06:31:42.388'),(2,'Lida','Amazing Author in the world!',1,'Chanry Chhoy',NULL,'2024-06-10 06:30:05.715','2024-06-10 06:30:05.715'),(3,'Buna','Author',1,'Chanry Chhoy',NULL,'2024-06-10 06:30:50.154','2024-06-10 06:30:50.154');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Sports','This category will show you about football, valeball, boxing, etc...',1,'admin','tchanthy','2024-06-09 12:39:39.854','2024-06-10 06:10:02.893'),(2,'Entertainment','This category will show you about life style, comedy, music etc...',1,'tchanthy',NULL,'2024-06-10 06:08:28.201','2024-06-10 06:08:28.201'),(3,'Technology','This category will show you about new Technology, AI, etc...',1,'tchanthy',NULL,'2024-06-10 06:09:15.184','2024-06-10 06:09:15.184'),(4,'Life and society','This category will show you about life and society etc...',1,'tchanthy',NULL,'2024-06-10 06:10:48.524','2024-06-10 06:10:48.524'),(5,'Sports1','This category will show you about football, valeball, boxing, etc...',0,'tchanthy','tchanthy','2024-06-10 14:22:23.902','2024-06-10 14:23:06.549');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `categoryId` int NOT NULL,
  `authorId` int NOT NULL,
  `userId` int NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_description` text COLLATE utf8mb4_unicode_ci,
  `content` text COLLATE utf8mb4_unicode_ci,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publish_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `News_categoryId_fkey` (`categoryId`),
  KEY `News_authorId_fkey` (`authorId`),
  KEY `News_userId_fkey` (`userId`),
  CONSTRAINT `News_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `authors` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `News_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `News_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (4,1,1,1,'INB100 Productions Releases SM After Claiming to Be Injustice','','The small group EXO-CBX of Chen, Baekhyun and Xiumin stood up against the injustice of SM Entertainment .','In June last year, EXO-CBX took legal action and obtained an exclusive contract, and raised a fair dividend claim with SM, the production said. At that time, the two sides negotiated and resolved the issue, believing that both parties agreed that EXO\'s artistic activities were the most important, and by agreement at that time, all EXO-CBX works and names would be assigned through INB100 Productions. . However, SM ignored the agreement and demanded that INB100 provide 10% of sales for the artist\'s work activities. Despite INB100 sending evidence, SM did not respond for more than two months.​We plan to report SM\'s injustice. This is what INB100 says .​However, this case seems to be a new topic for the K-Pop world . Awaiting continuous update.',1,'admin','tchanthy','2024-06-09 12:41:09.776','2024-06-09 12:41:09.776','2024-06-10 14:24:07.655'),(5,2,1,5,'ដុងសិល្បៈពេញខ្លួន ស្រីខួច កូនស្រី ពាក់មី ចាប់ដៃឪពុកធ្វើវីដេអូ vlog មានអ្នកចុចមើលរាប់លានដង','','មួយពព្រិចភ្នែកសោះកូនស្រីច្បងរបស់តារាកំប្លែង នាយពាក់មី ឈ្មោះ រឹម សុរ៉ាស៊ី ហៅ ស្រីខួច អាយុ១៥ឆ្នាំហើយ ក្លាយជាយុវតីរូបស្រស់សោភាម្នាក់។ បើនិយាយពីដុងទេពកោសល្យសិល្បៈវិញ ស្រីខួច កាតតាមឪពុកពេញទំហឹងតែម្តង មិនថា ការសម្តែង ឬលេងកំប្លែង សុទ្ធតែនាងធ្លាប់ធ្វើតាំងពីកុមារមកម៉្លេះ។','វីដេអូ vlog របស់ ស្រីខួច និង នាយពាក់មី viral ខ្លាំងមិនធម្មតា ដោយមានអ្នកចុចទស្សនារាប់លានដងលើបណ្តាញសង្គមហ្វេសប៊ុក ព្រោះភាពកំប្លុកកំប្លែង និងពាក្យពេចន៍បែបអស់សំណើចរបស់ឪពុកកូនពីរនាក់នេះ ពិសេស concetp ប្លែកៗដែលអ្នកទាំងពីរផ្តល់ឱ្យអ្នកទស្សនា។ តាមរយៈវីដេអូ vlog នេះ គេមើលឃើញថា ពាក់មី បានបើកឱកាសឱ្យកូនស្រីធ្វើនូវអ្វីដែលនាងស្រលាញ់ ក៏ដូចជាចូលរួមវិស័យសិល្បៈដូចខ្លួនផងដែរ។ ក្រៅពីការផលិតវីដេអូ ស្រីខួច ចំណាយពេលលើការសិក្សា និងជួយប្រម៉ូតអាជីវកម្មក្រុមគ្រួសារផងដែរ៕',1,'tchanthy',NULL,'2024-06-10 06:23:30.585','2024-06-10 06:23:30.585','2024-06-10 06:23:30.585'),(6,3,1,5,'ក្រុមហ៊ុន​រថយន្តខ្មែរ GTV ប្រកាស​ចេញ​ភីកអាប់ខ្នាតធំថ្មីម៉ូឌែល គោព្រៃ-KOUPREY ប្រើម៉ាស៊ីន Hybrid តម្លៃជាង ៣ម៉ឺនដុល្លារ','','ក្រុមហ៊ុន GTV Motor Cambodia នៅថ្ងៃទី៥ ខែមិថុនា ឆ្នាំ​២០២៤ បាន​ប្រកាស​ចេញរថយន្តភីកអាប់ថ្មី គឺម៉ូឌែល គោព្រៃ ដែលរួមមាន KOUPREY និង KOUPREY PRO តម្លៃជាង ៣ម៉ឺនដុល្លារ។','ទំហំរបស់​រថយន្ត KOUPREY នេះ គឺ ៥៦១៧ x ២០៩០ x ១៩១០ ដោយតួរថយន្ត ត្រូវបាន​រចនាម៉ូឌ​បែបទំនើប ជាស្ថាបត្យកម្ម​ដ៏ឆ្លាតវៃ ខណៈ​ចង្កៀងមុខក្រោយ ជាប្រភេទ LED។ វា​មាន​សមត្ថភាព​ដឹកបាន ៤,៥តោន និងកម្លាំងទាញសណ្តោងបាន ៣,៥តោន។ មិនតែប៉ុណ្ណោះ​ វាមានសមត្ថភាព​ទប់លំនឹង និងមានប្រព័ន្ធគ្រប់គ្រង​ដៃចង្កូតទន់រលូន ដោយប្រើប្រាស់​ដៃចង្កូតអេឡិចត្រូនិក។',1,'tchanthy',NULL,'2024-06-10 06:25:51.846','2024-06-10 06:25:51.846','2024-06-10 06:25:51.846');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newstags`
--

DROP TABLE IF EXISTS `newstags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newstags` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `newsId` int NOT NULL,
  `tagId` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `NewsTags_newsId_fkey` (`newsId`),
  KEY `NewsTags_tagId_fkey` (`tagId`),
  CONSTRAINT `NewsTags_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `news` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `NewsTags_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newstags`
--

LOCK TABLES `newstags` WRITE;
/*!40000 ALTER TABLE `newstags` DISABLE KEYS */;
INSERT INTO `newstags` VALUES (1,4,2,1,'admin','tchanthy','2024-06-09 12:41:09.782','2024-06-09 16:57:50.665'),(2,4,1,1,'admin',NULL,'2024-06-09 16:53:52.162','2024-06-09 16:53:52.162'),(3,4,1,1,'tchanthy',NULL,'2024-06-09 16:54:50.972','2024-06-09 16:54:50.972'),(4,5,3,1,'tchanthy',NULL,'2024-06-10 06:23:30.597','2024-06-10 06:23:30.597'),(5,6,4,1,'tchanthy',NULL,'2024-06-10 06:25:51.852','2024-06-10 06:25:51.852');
/*!40000 ALTER TABLE `newstags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Music',1,'admin','tchanthy','2024-06-09 12:35:38.279','2024-06-10 09:13:52.555'),(2,'Sport',1,'tchanthy',NULL,'2024-06-09 16:56:27.465','2024-06-09 16:56:27.465'),(3,'Life and society',1,'tchanthy',NULL,'2024-06-10 06:22:50.044','2024-06-10 06:22:50.044'),(4,'Technology',1,'tchanthy','tchanthy','2024-06-10 06:25:21.955','2024-06-10 14:07:15.255');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Chanthy Tha','$2b$10$biKPineqz4gCjQ81bhGwy./lN5yh8Bowsn4/WDrq51UCIVjr7qs96',NULL,'superAdmin',1,'2024-06-09 12:40:50.259','2024-06-09 12:40:50.259'),(2,'admin','$2b$10$fHQ4ipFvmh8.dFke4GL9juSM2QV84nnTKW7HZa6OgByQsl1DZmQBO',NULL,'superAdmin',1,'2024-06-09 14:40:06.325','2024-06-09 14:40:06.325'),(3,'admin','$2b$10$hDi4IJ3GRcrhDQ.kU/FV9emgi36aknpqxx4m6PrJqWR00G2uXa3zq',NULL,'superAdmin',1,'2024-06-09 15:47:36.819','2024-06-09 15:47:36.819'),(4,'npros','$2b$10$rSkpfgr2ysuQZ9MOHwGNJe1QpJ0bcKmyLXLe7KmpMUN24HLul44Ve',NULL,'superAdmin',1,'2024-06-09 15:49:01.551','2024-06-10 06:27:29.676'),(5,'tchanthy','$2b$10$7pFGVqZebCPltpGJSQUsBeIPB4Tosf4c0xjQlat3RClP97jjOJA0a',NULL,'superAdmin',1,'2024-06-09 16:12:05.590','2024-06-09 16:12:05.590'),(6,'cchanry','$2b$10$OIuBun/fJxqn4/KUVmWK7ODyY8KOueUHa8zjv6dqgWPmGGOoHfajG',NULL,'superAdmin',1,'2024-06-10 06:26:21.710','2024-06-10 06:26:21.710'),(7,'ssinet','$2b$10$IvtappKsZiqcx/C2DkCPZeHUb9taWfTPgUcDsHA4SC0Q3.adKiUqK',NULL,'superAdmin',1,'2024-06-10 06:26:51.109','2024-06-10 06:26:51.109'),(8,'admin','$2b$10$QRevgdcgqRlQO4J2d8j9gOVegTjTXzPV784KS0Qzbv3Hk7shbpmgy',NULL,'superAdmin',1,'2024-06-10 14:17:46.922','2024-06-10 14:17:46.922'),(9,'admin','$2b$10$Yh4u76pHCNK5.hWc4Zxkv.STJj.vGT52S5tt2ScSPlb8RIHGDzNaO',NULL,'superAdmin',1,'2024-06-10 14:17:57.960','2024-06-10 14:17:57.960'),(10,'admin','$2b$10$drsh6L1YzndNUL1hMkaM5.o9F9FCTIJRs2vFlhukCt6hdswU5Vu5W',NULL,'superAdmin',1,'2024-06-10 14:18:43.370','2024-06-10 14:18:43.370'),(11,'admin','$2b$10$32mrAtnilNX0tY0oabj8t.HmpayGTJTGYfO0.FHWoxKcQlupBTjlK',NULL,'superAdmin',1,'2024-06-10 14:19:29.325','2024-06-10 14:19:29.325');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-10 21:41:49
