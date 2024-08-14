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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Dara','Profesonal Author',1,'admin','tchanthy','2024-06-09 12:40:22.293','2024-06-10 06:31:42.388'),(2,'Lida','Amazing Author in the world!',1,'Chanry Chhoy',NULL,'2024-06-10 06:30:05.715','2024-06-10 06:30:05.715'),(3,'Buna','Author',1,'Chanry Chhoy',NULL,'2024-06-10 06:30:50.154','2024-06-10 06:30:50.154'),(4,'Chanthy','Professional author',0,'Chanthy Tha',NULL,'2024-08-11 08:38:14.561','2024-08-12 12:35:43.054'),(5,'fsdf242',NULL,0,'Chanthy','Chanthy','2024-08-12 11:47:02.894','2024-08-12 11:47:08.927'),(6,'test',NULL,1,'Chanthy',NULL,'2024-08-12 12:34:07.712','2024-08-12 12:34:07.712'),(7,'test123',NULL,1,'Chanthy',NULL,'2024-08-12 12:34:12.880','2024-08-12 12:34:12.880'),(8,'123',NULL,1,'Chanthy',NULL,'2024-08-12 12:34:16.609','2024-08-12 12:34:16.609'),(9,'rwer',NULL,1,'Chanthy',NULL,'2024-08-12 12:34:20.975','2024-08-12 12:34:20.975'),(10,'rwe',NULL,1,'Chanthy',NULL,'2024-08-12 12:34:23.926','2024-08-12 12:34:23.926'),(11,'1234',NULL,1,'Chanthy',NULL,'2024-08-12 12:34:33.368','2024-08-12 12:34:33.368'),(12,'fsdfs',NULL,1,'Chanthy',NULL,'2024-08-12 12:34:37.683','2024-08-12 12:34:37.683');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Sports','This category will show you about football, valeball, boxing, etc...',1,'admin','tchanthy','2024-06-09 12:39:39.854','2024-06-10 06:10:02.893'),(2,'Entertainment','This category will show you about life style, comedy, music etc...',1,'tchanthy',NULL,'2024-06-10 06:08:28.201','2024-06-10 06:08:28.201'),(3,'Technology','This category will show you about new Technology, AI, etc...',1,'tchanthy',NULL,'2024-06-10 06:09:15.184','2024-06-10 06:09:15.184'),(4,'Life and society','This category will show you about life and society etc...',1,'tchanthy',NULL,'2024-06-10 06:10:48.524','2024-06-10 06:10:48.524'),(5,'Sports1','This category will show you about football, valeball, boxing, etc...',0,'tchanthy','tchanthy','2024-06-10 14:22:23.902','2024-06-10 14:23:06.549'),(6,'Music','This is a music category',1,'Chanthy Tha','Chanthy Tha','2024-08-07 12:05:04.396','2024-08-07 12:05:20.234'),(7,'fsfs31331','fsf',0,'Chanthy','Chanthy','2024-08-12 11:46:36.292','2024-08-12 11:46:43.862');
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
  `tagId` int NOT NULL,
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
  KEY `News_tagId_fkey_idx` (`tagId`),
  CONSTRAINT `News_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `authors` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `News_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `News_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `tags` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `News_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (4,1,1,1,1,'INB100 Productions Releases SM After Claiming to Be Injustice','default-profile.jpg','The small group EXO-CBX of Chen, Baekhyun and Xiumin stood up against the injustice of SM Entertainment .','In June last year, EXO-CBX took legal action and obtained an exclusive contract, and raised a fair dividend claim with SM, the production said. At that time, the two sides negotiated and resolved the issue, believing that both parties agreed that EXO\'s artistic activities were the most important, and by agreement at that time, all EXO-CBX works and names would be assigned through INB100 Productions. . However, SM ignored the agreement and demanded that INB100 provide 10% of sales for the artist\'s work activities. Despite INB100 sending evidence, SM did not respond for more than two months.​We plan to report SM\'s injustice. This is what INB100 says .​However, this case seems to be a new topic for the K-Pop world . Awaiting continuous update.',0,'admin','tchanthy','2024-06-09 12:41:09.776','2024-06-09 12:41:09.776','2024-08-11 04:53:15.224'),(5,2,1,5,1,'ដុងសិល្បៈពេញខ្លួន ស្រីខួច កូនស្រី ពាក់មី ចាប់ដៃឪពុកធ្វើវីដេអូ vlog មានអ្នកចុចមើលរាប់លានដង','1723295945350-photo_11_2024-02-23_14-13-46.jpg','មួយពព្រិចភ្នែកសោះកូនស្រីច្បងរបស់តារាកំប្លែង នាយពាក់មី ឈ្មោះ រឹម សុរ៉ាស៊ី ហៅ ស្រីខួច អាយុ១៥ឆ្នាំហើយ ក្លាយជាយុវតីរូបស្រស់សោភាម្នាក់។ បើនិយាយពីដុងទេពកោសល្យសិល្បៈវិញ ស្រីខួច កាតតាមឪពុកពេញទំហឹងតែម្តង មិនថា ការសម្តែង ឬលេងកំប្លែង សុទ្ធតែនាងធ្លាប់ធ្វើតាំងពីកុមារមកម៉្លេះ។','វីដេអូ vlog របស់ ស្រីខួច និង នាយពាក់មី viral ខ្លាំងមិនធម្មតា ដោយមានអ្នកចុចទស្សនារាប់លានដងលើបណ្តាញសង្គមហ្វេសប៊ុក ព្រោះភាពកំប្លុកកំប្លែង និងពាក្យពេចន៍បែបអស់សំណើចរបស់ឪពុកកូនពីរនាក់នេះ ពិសេស concetp ប្លែកៗដែលអ្នកទាំងពីរផ្តល់ឱ្យអ្នកទស្សនា។ តាមរយៈវីដេអូ vlog នេះ គេមើលឃើញថា ពាក់មី បានបើកឱកាសឱ្យកូនស្រីធ្វើនូវអ្វីដែលនាងស្រលាញ់ ក៏ដូចជាចូលរួមវិស័យសិល្បៈដូចខ្លួនផងដែរ។ ក្រៅពីការផលិតវីដេអូ ស្រីខួច ចំណាយពេលលើការសិក្សា និងជួយប្រម៉ូតអាជីវកម្មក្រុមគ្រួសារផងដែរ៕',0,'tchanthy',NULL,'2024-06-10 06:23:30.585','2024-06-10 06:23:30.585','2024-08-11 04:57:03.240'),(6,3,1,5,1,'ក្រុមហ៊ុន​រថយន្តខ្មែរ GTV ប្រកាស​ចេញ​ភីកអាប់ខ្នាតធំថ្មីម៉ូឌែល គោព្រៃ-KOUPREY ប្រើម៉ាស៊ីន Hybrid តម្លៃជាង ៣ម៉ឺនដុល្លារ','1723295945350-photo_11_2024-02-23_14-13-46.jpg','ក្រុមហ៊ុន GTV Motor Cambodia នៅថ្ងៃទី៥ ខែមិថុនា ឆ្នាំ​២០២៤ បាន​ប្រកាស​ចេញរថយន្តភីកអាប់ថ្មី គឺម៉ូឌែល គោព្រៃ ដែលរួមមាន KOUPREY និង KOUPREY PRO តម្លៃជាង ៣ម៉ឺនដុល្លារ។','ទំហំរបស់​រថយន្ត KOUPREY នេះ គឺ ៥៦១៧ x ២០៩០ x ១៩១០ ដោយតួរថយន្ត ត្រូវបាន​រចនាម៉ូឌ​បែបទំនើប ជាស្ថាបត្យកម្ម​ដ៏ឆ្លាតវៃ ខណៈ​ចង្កៀងមុខក្រោយ ជាប្រភេទ LED។ វា​មាន​សមត្ថភាព​ដឹកបាន ៤,៥តោន និងកម្លាំងទាញសណ្តោងបាន ៣,៥តោន។ មិនតែប៉ុណ្ណោះ​ វាមានសមត្ថភាព​ទប់លំនឹង និងមានប្រព័ន្ធគ្រប់គ្រង​ដៃចង្កូតទន់រលូន ដោយប្រើប្រាស់​ដៃចង្កូតអេឡិចត្រូនិក។',0,'tchanthy',NULL,'2024-06-10 06:25:51.846','2024-06-10 06:25:51.846','2024-08-11 04:57:00.762'),(8,3,2,5,1,'Test','1723295945350-photo_11_2024-02-23_14-13-46.jpg','test','test',0,'Chanthy tha',NULL,'2024-08-05 11:55:52.972','2024-08-05 11:55:52.972','2024-08-05 12:17:42.912'),(9,3,3,5,1,'Testing12','1723295945350-photo_11_2024-02-23_14-13-46.jpg','Testing description','Testing12345',0,'Chanthy tha','Chanthy tha','2024-08-05 12:09:23.747','2024-08-05 12:09:23.747','2024-08-07 17:05:34.246'),(10,2,2,5,1,'News today123456','1723295945350-photo_11_2024-02-23_14-13-46.jpg','test','test',0,'Chanthy tha','Chanthy Tha','2024-08-05 12:12:48.792','2024-08-05 12:12:48.792','2024-08-11 04:53:19.492'),(11,3,2,5,1,'News Today 123','1723295945350-photo_11_2024-02-23_14-13-46.jpg','test','test',0,'Chanthy Tha','Chanthy Tha','2024-08-05 15:58:09.642','2024-08-05 15:58:09.642','2024-08-07 17:05:28.282'),(12,6,3,5,1,'fsdfsf','1723295945350-photo_11_2024-02-23_14-13-46.jpg','fsdfsdfds','fsdf',0,'Chanthy Tha','Chanthy Tha','2024-08-07 17:20:47.490','2024-08-07 17:20:47.490','2024-08-11 04:53:22.368'),(13,6,4,5,4,'SUGA encounters a problem while riding a scooter drunk and apologizes publicly','1723371886264-Screenshot 2024-08-11 115229.png','According to Yonhap News on August 7, the Seoul Yongsan Police Station is currently investigating SUGA (BTS) on charges of violating the road traffic law (drunk driving).','According to Yonhap News on August 7, the Seoul Yongsan Police Station is currently investigating SUGA (BTS) on charges of violating the road traffic law (drunk driving).',1,'Chanthy Tha','Chanthy','2024-08-07 18:12:19.636','2024-08-07 18:12:19.636','2024-08-12 09:02:40.395'),(14,6,3,5,1,'dsda1234','1723295945350-photo_11_2024-02-23_14-13-46.jpg','','dasd',0,'Chanthy Tha','Chanthy Tha','2024-08-07 18:28:05.874','2024-08-07 18:28:05.874','2024-08-09 02:43:24.956'),(15,4,4,5,1,'It\'s really hard for Brad Pitt, the whole dangerous kid who can do nothing but panic from a distance.','1723371863205-2Screenshot 2024-08-11 115100.png','Famous Hollywood actor Brad Pitt is deeply saddened by the tragic news that has befallen his son Pax Jolie-Pitt , and what makes Brad Pitt even more heartbroken is the fact that As a whole father, he could not step on his son.','Famous Hollywood actor Brad Pitt is deeply saddened by the tragic news that has befallen his son Pax Jolie-Pitt , and what makes Brad Pitt even more heartbroken is the fact that As a whole father, he could not step on his son.',1,'Chanthy Tha','Chanthy','2024-08-07 18:30:00.713','2024-08-07 18:30:00.713','2024-08-11 10:24:23.218'),(16,4,4,5,1,'\"Squid Game\" Director Announces Release Date for Season 2 and 3','1723371838404-1Screenshot 2024-08-11 115012.png','The release date for the long-awaited second season of \"Squid Game\" has finally been revealed.','The release date for the long-awaited second season of \"Squid Game\" has finally been revealed.',1,'Chanthy Tha','Chanthy','2024-08-09 02:44:29.622','2024-08-09 02:44:29.622','2024-08-11 10:23:58.415'),(17,4,4,5,3,'Angelina Jolie\'s son Pax was rushed to hospital after suffering a serious head injury.','1723371716078-Screenshot 2024-08-11 115616.png','Pax Jolie-Pitt , popularly known as the son of ex-lovers Angelina Jolie and Brad Pitt tj, was rushed to hospital after a tragic accident while riding an electric bicycle.','Pax, 21, was rushed to hospital with serious head injuries on July 29 after crashing while riding an electric bike at about 5 p.m. at an intersection in Los Angeles.\n\nHowever, for the cause of the accident, a source from the police told a foreign newspaper that Pax was riding an electric bike without a helmet and drove behind a car that stopped at a red light . It is unknown at this time what he will do after leaving the post.',1,'Chanthy Tha','Chanthy','2024-08-10 12:37:05.307','2024-08-10 12:37:05.307','2024-08-12 09:04:04.725'),(18,6,4,5,1,'Wow! Niko and The Toys make PEPSI INTO THE NEW ERA concert event a new history in Cambodia!','1723371772237-Screenshot 2024-08-11 115714.png','The most surprising thing for Pepsi Drink\'s amazing international concert \"PEPSI INTO THE NEW ERA\" on July 28, 2024, brought the most fun and excitement for the participants of the first floor of Aeon Mall Meanchey in the presence of Cambodian singer Niko and the handsome and unpopular singer from Thailand The Toys .','The most surprising thing for Pepsi Drink\'s amazing international concert \"PEPSI INTO THE NEW ERA\" on July 28, 2024, brought the most fun and excitement for the participants of the first floor of Aeon Mall Meanchey in the presence of Cambodian singer Niko and the handsome and unpopular singer from Thailand The Toys .',1,'Chanthy Tha','Chanthy','2024-08-10 13:19:05.697','2024-08-10 13:19:05.697','2024-08-11 10:22:52.251'),(19,6,4,5,1,'Prin and Meng Keo Pechta make the audience feel excited by the new hip hop and paro youth style.','1723371804723-Screenshot 2024-08-11 114800.png','The song \"When I Come to You\", which is the original tone of the Queen of Voices, Meng Keo Pechta, was sung by a handsome young man with a charming print. Strange feeling and the passion of today\'s youth.\n\nInterestingly, Ms. Meng Keo Pechta, the original singer, also appeared in the song \"When I came to you\" with the print. The cover song was released on the afternoon of July 30, 2024 yesterday on the YouTube channel Prince - Print Official.','The song \"When I Come to You\", which is the original tone of the Queen of Voices, Meng Keo Pechta, was sung by a handsome young man with a charming print. Strange feeling and the passion of today\'s youth. Interestingly, Ms. Meng Keo Pechta, the original singer, also appeared in the song \"When I came to you\" with the print. The cover song was released on the afternoon of July 30, 2024 yesterday on the YouTube channel Prince - Print Official.',1,'Chanthy Tha','Chanthy','2024-08-10 13:22:44.310','2024-08-10 13:22:44.310','2024-08-11 10:23:24.738'),(20,4,4,5,3,'Lisa ready to meet Thai PM in special meeting soon','1723455248632-Screenshot 2024-08-12 160732.png','According to recent reports, the youngest member of BLACKPINK , Lisa, is preparing her time for a meeting with Srettha Thavisin , the current Thai Prime Minister.','According to recent reports, the youngest member of BLACKPINK , Lisa, is preparing her time for a meeting with Srettha Thavisin , the current Thai Prime Minister.',1,'Chanthy','Chanthy','2024-08-11 10:28:55.372','2024-08-11 10:28:55.372','2024-08-12 09:34:08.657'),(21,6,4,5,1,'VannDa showcases Cambodian culture at Paris Olympics closing ceremony','1723466432741-454719455_122187637316084468_7773609824782155596_n.jpg','At the 2024 Paris Olympics closing ceremony yesterday, August 11, Cambodian rapper VannDa delivered a standout performance of his hit song \"Time to Rise\". The track, which has gained international acclaim, served as a powerful showcase of Cambodian culture, blending traditional Khmer musical elements with modern rap.','At the 2024 Paris Olympics closing ceremony yesterday, August 11, Cambodian rapper VannDa delivered a standout performance of his hit song \"Time to Rise\". The track, which has gained international acclaim, served as a powerful showcase of Cambodian culture, blending traditional Khmer musical elements with modern rap. \n\nAs the ceremony shifted attention to the upcoming Los Angeles 2028 Olympics, VannDa\'s performance stood out among notable moments, including H.E.R. playing the US national anthem during the host city handover and Tom Cruise\'s dramatic stunt transporting the Olympic flag to Los Angeles, California. Artists like Snoop Dogg, Billie Eilish and the Red Hot Chili Peppers also contributed to the event, showcasing iconic LA imagery.\n\nAccording to NBC News, French band Phoenix headlined the ceremony, celebrating French artistry with performances of \"Lisztomania\" and more. They were joined by Vampire Weekend\'s Ezra Koenig and VannDa, adding a global touch to the farewell event. ',1,'Chanthy','Chanthy','2024-08-12 09:05:51.932','2024-08-12 09:05:51.932','2024-08-12 12:40:32.758'),(22,6,4,5,2,'tetert323234234','1723463247617-photo_4_2024-08-12_18-40-51.jpg','tertert','tert',0,'Chanthy','Chanthy','2024-08-12 11:47:27.633','2024-08-12 11:47:27.633','2024-08-12 11:47:50.167'),(23,4,3,5,3,'fsdf123','1723465886686-2Screenshot 2024-08-11 115100.png','fsdf','fsdf',0,'Chanthy','Chanthy','2024-08-12 12:30:59.397','2024-08-12 12:30:59.397','2024-08-12 12:31:48.852'),(24,4,12,5,3,'fsfs','1723466810619-Screenshot 2024-08-12 180054.png','','fsf',1,'Chanthy','Chanthy','2024-08-12 12:46:50.640','2024-08-12 12:46:50.640','2024-08-12 12:46:50.640'),(25,6,11,5,3,'fsdf','1723466843869-Screenshot 2024-08-12 180054.png','','fsdf',1,'Chanthy','Chanthy','2024-08-12 12:47:23.884','2024-08-12 12:47:23.884','2024-08-12 12:47:23.884');
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
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newstags`
--

LOCK TABLES `newstags` WRITE;
/*!40000 ALTER TABLE `newstags` DISABLE KEYS */;
INSERT INTO `newstags` VALUES (1,4,2,1,'admin','tchanthy','2024-06-09 12:41:09.782','2024-06-09 16:57:50.665'),(2,4,1,1,'admin',NULL,'2024-06-09 16:53:52.162','2024-06-09 16:53:52.162'),(3,4,1,1,'tchanthy',NULL,'2024-06-09 16:54:50.972','2024-06-09 16:54:50.972'),(4,5,3,1,'tchanthy',NULL,'2024-06-10 06:23:30.597','2024-06-10 06:23:30.597'),(5,6,4,1,'tchanthy',NULL,'2024-06-10 06:25:51.852','2024-06-10 06:25:51.852'),(6,9,4,1,'Chanthy tha',NULL,'2024-08-05 12:09:23.755','2024-08-05 12:09:23.755'),(7,10,3,1,'Chanthy tha',NULL,'2024-08-05 12:12:48.801','2024-08-05 12:12:48.801'),(8,11,3,1,'Chanthy Tha',NULL,'2024-08-05 15:58:09.653','2024-08-05 15:58:09.653'),(9,12,4,1,'Chanthy Tha',NULL,'2024-08-07 17:20:47.496','2024-08-07 17:20:47.496'),(10,13,4,1,'Chanthy Tha',NULL,'2024-08-07 18:12:19.645','2024-08-07 18:12:19.645'),(11,14,4,1,'Chanthy Tha',NULL,'2024-08-07 18:28:05.879','2024-08-07 18:28:05.879'),(12,15,3,1,'Chanthy Tha',NULL,'2024-08-07 18:30:00.718','2024-08-07 18:30:00.718'),(13,16,3,1,'Chanthy Tha',NULL,'2024-08-09 02:44:29.636','2024-08-09 02:44:29.636'),(14,17,2,1,'Chanthy Tha',NULL,'2024-08-10 12:37:05.320','2024-08-10 12:37:05.320'),(15,18,3,1,'Chanthy Tha',NULL,'2024-08-10 13:19:05.704','2024-08-10 13:19:05.704'),(16,19,3,1,'Chanthy Tha',NULL,'2024-08-10 13:22:44.320','2024-08-10 13:22:44.320'),(17,20,4,1,'Chanthy',NULL,'2024-08-11 10:28:55.380','2024-08-11 10:28:55.380');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Music',1,'admin','tchanthy','2024-06-09 12:35:38.279','2024-06-10 09:13:52.555'),(2,'Sport',1,'tchanthy',NULL,'2024-06-09 16:56:27.465','2024-06-09 16:56:27.465'),(3,'Life and society',1,'tchanthy',NULL,'2024-06-10 06:22:50.044','2024-06-10 06:22:50.044'),(4,'Technology',1,'tchanthy','tchanthy','2024-06-10 06:25:21.955','2024-06-10 14:07:15.255'),(5,'fsdfsfsf224',0,'Chanthy','Chanthy','2024-08-12 11:46:51.414','2024-08-12 11:46:57.630');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Chanthy','$2b$10$FrApWXwNn/fU2VUYChpPEuFrvOnIMYG72LE4JHUI7eCGq2.Et4/UO','1723464513319-6b6214a65d42_photo_2_2024-02-23_14-11-22.jpg','admin',1,'2024-06-09 12:40:50.259','2024-08-12 12:08:33.333'),(2,'admin','$2b$10$FrApWXwNn/fU2VUYChpPEuFrvOnIMYG72LE4JHUI7eCGq2.Et4/UO',NULL,'monitor',1,'2024-06-09 14:40:06.325','2024-08-12 11:14:42.410'),(3,'admin','$2b$10$hDi4IJ3GRcrhDQ.kU/FV9emgi36aknpqxx4m6PrJqWR00G2uXa3zq',NULL,'superAdmin',1,'2024-06-09 15:47:36.819','2024-06-09 15:47:36.819'),(4,'npros','$2b$10$rSkpfgr2ysuQZ9MOHwGNJe1QpJ0bcKmyLXLe7KmpMUN24HLul44Ve',NULL,'superAdmin',0,'2024-06-09 15:49:01.551','2024-06-10 06:27:29.676'),(5,'tchanthy','$2b$10$FrApWXwNn/fU2VUYChpPEuFrvOnIMYG72LE4JHUI7eCGq2.Et4/UO','1723463130953-photo_4_2024-08-12_18-40-51.jpg','admin',1,'2024-06-09 16:12:05.590','2024-08-12 11:45:30.960'),(6,'cchanry','$2b$10$FrApWXwNn/fU2VUYChpPEuFrvOnIMYG72LE4JHUI7eCGq2.Et4/UO','1723463088099-photo_3_2024-08-12_18-40-51.jpg','admin',1,'2024-06-10 06:26:21.710','2024-08-12 11:44:48.111'),(7,'ssinet','$2b$10$FrApWXwNn/fU2VUYChpPEuFrvOnIMYG72LE4JHUI7eCGq2.Et4/UO','1723462881322-photo_1_2024-08-12_18-40-51.jpg','admin',1,'2024-06-10 06:26:51.109','2024-08-12 11:41:21.332'),(8,'admin','$2b$10$QRevgdcgqRlQO4J2d8j9gOVegTjTXzPV784KS0Qzbv3Hk7shbpmgy',NULL,'superAdmin',0,'2024-06-10 14:17:46.922','2024-06-10 14:17:46.922'),(9,'admin','$2b$10$Yh4u76pHCNK5.hWc4Zxkv.STJj.vGT52S5tt2ScSPlb8RIHGDzNaO',NULL,'superAdmin',0,'2024-06-10 14:17:57.960','2024-06-10 14:17:57.960'),(10,'admin','$2b$10$drsh6L1YzndNUL1hMkaM5.o9F9FCTIJRs2vFlhukCt6hdswU5Vu5W',NULL,'superAdmin',0,'2024-06-10 14:18:43.370','2024-06-10 14:18:43.370'),(11,'admin','$2b$10$32mrAtnilNX0tY0oabj8t.HmpayGTJTGYfO0.FHWoxKcQlupBTjlK',NULL,'superAdmin',0,'2024-06-10 14:19:29.325','2024-06-10 14:19:29.325'),(12,'Pros','$2b$10$/CE.gQx0RSnZijWrchN/N.ZdHYZN4TmE5IAeSwRZ5Yh/KASC3UyiS','1723465580309-photo_1_2024-08-12_18-40-51.jpg','guest',1,'2024-08-05 09:56:00.021','2024-08-12 12:26:20.314'),(13,'Testw','$2b$10$xxfBBlL6x5jaeMKgSjEG8eg.jcH29nDyNMlujJDIBJ/FXWNdvl9EO',NULL,'monitor',0,'2024-08-12 12:26:58.669','2024-08-12 12:27:20.215');
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

-- Dump completed on 2024-08-14  9:37:37
