CREATE DATABASE  IF NOT EXISTS `realkickstart` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `realkickstart`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: realkickstart
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `challenges`
--

DROP TABLE IF EXISTS `challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `challenges` (
  `challenges_id` int(11) NOT NULL AUTO_INCREMENT,
  `challenges_title` varchar(45) NOT NULL,
  `challenges_desc` varchar(500) NOT NULL,
  `challenges_campus` varchar(45) NOT NULL,
  `challenges_points` int(5) NOT NULL,
  `challenges_isFeatured` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`challenges_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenges`
--

LOCK TABLES `challenges` WRITE;
/*!40000 ALTER TABLE `challenges` DISABLE KEYS */;
/*!40000 ALTER TABLE `challenges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finished_challenges`
--

DROP TABLE IF EXISTS `finished_challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `finished_challenges` (
  `finished_challenges_id` int(11) NOT NULL,
  `frn_users_id` varchar(12) NOT NULL,
  `frn_challenges_id` int(11) NOT NULL,
  `finished_challenges_date` date DEFAULT NULL,
  PRIMARY KEY (`finished_challenges_id`),
  KEY `fc_frn_users_id_idx` (`frn_users_id`),
  KEY `fc_frn_challenges_id_idx` (`frn_challenges_id`),
  CONSTRAINT `fc_frn_challenges_id` FOREIGN KEY (`frn_challenges_id`) REFERENCES `challenges` (`challenges_id`),
  CONSTRAINT `fc_frn_users_id` FOREIGN KEY (`frn_users_id`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finished_challenges`
--

LOCK TABLES `finished_challenges` WRITE;
/*!40000 ALTER TABLE `finished_challenges` DISABLE KEYS */;
/*!40000 ALTER TABLE `finished_challenges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kickstart_events`
--

DROP TABLE IF EXISTS `kickstart_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kickstart_events` (
  `events_id` int(11) NOT NULL AUTO_INCREMENT,
  `events_title` varchar(100) NOT NULL,
  `events_date` date NOT NULL,
  `events_start_time` time NOT NULL,
  `events_end_time` time NOT NULL,
  `events_locations` varchar(100) NOT NULL,
  `events_points` int(5) NOT NULL,
  `events_desc` varchar(1000) NOT NULL,
  `events_campus` varchar(20) NOT NULL,
  `events_isFinished` tinyint(1) NOT NULL DEFAULT '0',
  `events_isFeatured` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`events_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kickstart_events`
--

LOCK TABLES `kickstart_events` WRITE;
/*!40000 ALTER TABLE `kickstart_events` DISABLE KEYS */;
INSERT INTO `kickstart_events` VALUES (1,'Kick Start Wayfinding Station','2019-02-02','14:00:00','15:00:00','SW1 Entrance',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',1,0),(2,'Kick Start Wayfinding Station','2019-02-02','10:00:00','11:00:00','1st Floor Lobby',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Downtown',1,0),(3,'Kick Start Wayfinding Station','2019-02-11','14:00:00','15:00:00','1st Floor Atrium',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Richmond',1,0),(4,'Kick Start Wayfinding Station','2019-02-11','13:00:00','14:00:00','SW1 Entrance',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',1,0),(5,'Kick Start Wayfinding Station','2019-02-20','12:30:00','13:30:00','1st Floor Lobby',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Downtown',1,0),(6,'Kick Start Wayfinding Station','2019-02-20','11:00:00','12:00:00','1st Floor Atrium',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Richmond',1,0),(7,'Welcome Back Feast','2019-02-21','16:00:00','18:00:00','SW1 Entrance',1500,'Indigenous Services welcomes all new and returning indigenous students for a feast and welcome from BCIT staff, mentors and industry. Welcome begins at 11:30am and food will be served at noon.','Burnaby',1,0),(8,'Welcome Back Feast','2019-02-22','17:00:00','19:00:00','1st Floor Lobby',1500,'Indigenous Services welcomes all new and returning indigenous students for a feast and welcome from BCIT staff, mentors and industry. Welcome begins at 11:30am and food will be served at noon.','Downtown',1,0),(9,'Welcome Back Feast','2019-02-23','18:00:00','20:00:00','1st Floor Atrium',1500,'Indigenous Services welcomes all new and returning indigenous students for a feast and welcome from BCIT staff, mentors and industry. Welcome begins at 11:30am and food will be served at noon.','Richmond',1,0),(10,'Part-Time Studies Wayfinding Station','2019-02-23','14:00:00','15:00:00','SW1 Entrance',800,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',1,0),(11,'Part-Time Studies Wayfinding Station','2019-02-23','14:00:00','15:00:00','1st Floor Lobby',800,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Downtown',1,0),(12,'Part-Time Studies Wayfinding Station','2019-02-23','14:00:00','15:00:00','1st Floor Atrium',800,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Richmond',1,0),(13,'Kick Start Wayfinding Station','2019-04-05','09:30:00','10:30:00','SW1 Entrance',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',0,0),(14,'Kick Start Wayfinding Station','2019-04-05','10:30:00','11:30:00','1st Floor Lobby',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Downtown',0,0),(15,'Kick Start Wayfinding Station','2019-04-06','14:00:00','15:00:00','Main Entrances to NE1',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',0,0),(16,'Kick Start Wayfinding Station','2019-04-06','12:00:00','13:00:00','1st Floor Lobby',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Downtown',0,0),(17,'Kick Start Wayfinding Station','2019-04-07','09:00:00','10:00:00','Main Entrances to NE1',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',0,0),(18,'Kick Start Wayfinding Station','2019-04-07','08:00:00','09:00:00','1st Floor Atrium',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Richmond',0,0),(19,'Kick Start Wayfinding Station','2019-04-07','12:00:00','13:00:00','SW1 Entrance',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',0,0),(20,'Welcome Back Feast','2019-04-20','11:00:00','13:30:00','5th Floor 581',1500,'Indigenous Services welcomes all new and returning indigenous students for a feast and welcome from BCIT staff, mentors and industry. Welcome begins at 11:30am and food will be served at noon.','Downtown',0,1),(21,'Welcome Back Feast','2019-04-21','12:30:00','15:00:00','SW1 Room 1521',1500,'Indigenous Services welcomes all new and returning indigenous students for a feast and welcome from BCIT staff, mentors and industry. Welcome begins at 11:30am and food will be served at noon.','Burnaby',0,1),(22,'Welcome Back Feast','2019-04-22','18:30:00','21:00:00','5th Floor 581',1500,'Indigenous Services welcomes all new and returning indigenous students for a feast and welcome from BCIT staff, mentors and industry. Welcome begins at 11:30am and food will be served at noon.','Downtown',0,1),(23,'Welcome Back Feast','2019-04-23','17:30:00','20:00:00','SW1 Room 1521',1500,'Indigenous Services welcomes all new and returning indigenous students for a feast and welcome from BCIT staff, mentors and industry. Welcome begins at 11:30am and food will be served at noon.','Burnaby',0,1),(24,'Part-Time Studies Wayfinding Station','2019-04-04','10:00:00','12:00:00','1st Floor Lobby',800,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Downtown',0,0),(25,'Part-Time Studies Wayfinding Station','2019-04-04','10:30:00','12:30:00','SW1 Entrance',800,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',0,0),(26,'Part-Time Studies Wayfinding Station','2019-04-05','10:00:00','12:00:00','1st Floor Lobby',800,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Downtown',0,0),(27,'Part-Time Studies Wayfinding Station','2019-04-05','10:45:00','12:45:00','SW1 Entrance',800,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',0,0),(28,'Part-Time Studies Wayfinding Station','2019-04-06','11:40:00','13:40:00','1st Floor Atrium',800,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Richmond',0,0),(29,'Part-Time Studies Wayfinding Station','2019-04-07','12:00:00','14:00:00','SW1 Entrance',800,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',0,0),(30,'Part-Time Studies Wayfinding Station','2019-04-07','12:00:00','14:00:00','1st Floor Atrium',800,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Richmond',0,0),(31,'Kick Start Wayfinding Station','2019-03-07','12:00:00','13:00:00','SW1 Entrance',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',0,0),(32,'Kick Start Wayfinding Station','2019-03-12','13:00:00','14:00:00','1st Floor Lobby',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Downtown',0,0),(33,'Kick Start Wayfinding Station','2019-03-12','14:00:00','15:00:00','SW1 Entrance',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',0,0),(34,'Kick Start Wayfinding Station','2019-03-12','15:00:00','16:00:00','1st Floor Lobby',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Downtown',0,0),(35,'Welcome Back Feast','2019-03-04','16:00:00','18:00:00','1st Floor Atrium',1500,'Indigenous Services welcomes all new and returning indigenous students for a feast and welcome from BCIT staff, mentors and industry. Welcome begins at 11:30am and food will be served at noon.','Richmond',0,0),(36,'Welcome Back Feast','2019-03-04','15:00:00','17:00:00','1st Floor Lobby',1500,'Indigenous Services welcomes all new and returning indigenous students for a feast and welcome from BCIT staff, mentors and industry. Welcome begins at 11:30am and food will be served at noon.','Downtown',0,0),(37,'Part-Time Studies Wayfinding Station','2019-03-09','14:00:00','16:00:00','SW1 Entrance',800,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby',0,0),(38,'Part-Time Studies Wayfinding Station','2019-03-09','13:00:00','15:00:00','1st Floor Atrium',800,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Richmond',0,0);
/*!40000 ALTER TABLE `kickstart_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participations`
--

DROP TABLE IF EXISTS `participations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participations` (
  `participation_id` int(11) NOT NULL AUTO_INCREMENT,
  `frn_users_id` varchar(12) NOT NULL,
  `frn_events_id` int(11) NOT NULL,
  PRIMARY KEY (`participation_id`),
  KEY `p_frn_users_id_idx` (`frn_users_id`),
  KEY `p_frn_events_id_idx` (`frn_events_id`),
  CONSTRAINT `p_frn_events_id` FOREIGN KEY (`frn_events_id`) REFERENCES `kickstart_events` (`events_id`),
  CONSTRAINT `p_frn_users_id` FOREIGN KEY (`frn_users_id`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participations`
--

LOCK TABLES `participations` WRITE;
/*!40000 ALTER TABLE `participations` DISABLE KEYS */;
INSERT INTO `participations` VALUES (1,'A01874296',1),(2,'A01961395',2),(3,'A01969294',3),(4,'A12341234',1),(5,'A12341234',2),(6,'A12341234',3),(7,'A00054504',1),(8,'A00116519',2),(9,'A00135457',3),(10,'A00149041',1),(11,'A00227334',2),(12,'A00232294',3),(13,'A00305816',1),(14,'A00410384',2),(15,'A00478347',3),(16,'A00499736',1),(17,'A00532123',2),(18,'A00543511',3),(19,'A00559613',1),(20,'A00561978',2),(21,'A00569802',3),(22,'A00579625',1),(23,'A00594956',2),(24,'A00629659',3),(25,'A00637097',1),(26,'A00647288',2),(27,'A00734732',3);
/*!40000 ALTER TABLE `participations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redeemed_rewards`
--

DROP TABLE IF EXISTS `redeemed_rewards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `redeemed_rewards` (
  `redeemed_rewards_id` int(11) NOT NULL AUTO_INCREMENT,
  `frn_users_id` varchar(11) NOT NULL,
  `frn_rewards_id` int(11) NOT NULL,
  `redeemed_date` date DEFAULT NULL,
  PRIMARY KEY (`redeemed_rewards_id`),
  KEY `rr_frn_users_id_idx` (`frn_users_id`),
  KEY `rr_frn_rewards_id_idx` (`frn_rewards_id`),
  CONSTRAINT `rr_frn_rewards_id` FOREIGN KEY (`frn_rewards_id`) REFERENCES `rewards` (`rewards_id`),
  CONSTRAINT `rr_frn_users_id` FOREIGN KEY (`frn_users_id`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redeemed_rewards`
--

LOCK TABLES `redeemed_rewards` WRITE;
/*!40000 ALTER TABLE `redeemed_rewards` DISABLE KEYS */;
/*!40000 ALTER TABLE `redeemed_rewards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rewards`
--

DROP TABLE IF EXISTS `rewards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rewards` (
  `rewards_id` int(11) NOT NULL AUTO_INCREMENT,
  `rewards_title` varchar(100) NOT NULL,
  `rewards_points` int(5) NOT NULL,
  `rewards_desc` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`rewards_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rewards`
--

LOCK TABLES `rewards` WRITE;
/*!40000 ALTER TABLE `rewards` DISABLE KEYS */;
INSERT INTO `rewards` VALUES (1,'Free Coffee',500,'A free brewed coffee'),(2,'Free Donut',500,'A free donut'),(3,'Coffee Giftcard $5',500,'A Starbucks giftcard '),(4,'Coffee Giftcard $20',2000,'A Starbucks  giftcard '),(5,'Coffee Giftcard $50',4000,'A Starbucks  giftcard'),(6,'Restaurant Giftcard $25',4000,'a giftcard you can spend on various restaurants in Vancouver'),(7,'Restaurant Giftcard $50',6000,'a giftcard you can spend on various restaurants in Vancouver'),(8,'Free Daily Parking',1000,'free parking for a day'),(9,'Free Weekly Parking',3000,'free parking for a week'),(10,'Free Monthly Parking',10000,'free parking for a month'),(11,'Tuition Voucher $150',12000,'save on tuition'),(12,'Tuition Voucher $300',20000,'save more on tuition'),(13,'A Donut Box',2000,'a 50-Timbits box or dozen at Timhorton\'s');
/*!40000 ALTER TABLE `rewards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `users_id` varchar(12) NOT NULL,
  `users_pw` varchar(40) NOT NULL,
  `users_type` varchar(10) NOT NULL,
  `users_point` int(5) NOT NULL DEFAULT '0',
  `users_firstName` varchar(50) NOT NULL,
  `users_lastName` varchar(50) NOT NULL,
  `users_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('A00000000','Password','admin',99999,'admin','admin','vbridgen1d@tuttocitta.it'),('A00054504','I16J1J5g','student',1000,'Jasper','Galbraeth','jgalbraethz@fema.gov'),('A00116519','ryDi905cyFPA','student',0,'Hervey','Avon','havon6@liveinternet.ru'),('A00135457','0y2mp0mLqmcO','student',1000,'Peyter','Wines','pwinesh@imageshack.us'),('A00149041','1q8I5n4c','student',0,'Gram','Dundredge','gdundredgee@t-online.de'),('A00227334','hmLqjiMv','student',1000,'Haydon','Pellington','hpellingtonw@noaa.gov'),('A00232294','JHEnBfTko','student',0,'Cirstoforo','Liddall','cliddallm@rambler.ru'),('A00305816','xPzMCnEUM2q','student',1000,'Aron','O\'Hallagan','aohallagan1b@samsung.com'),('A00410384','xddsFl','student',1000,'Evelyn','McCullen','emccullen2@squidoo.com'),('A00478347','KC2GUEzjMwL9','student',0,'Cristiano','Lodovichi','clodovichil@tiny.cc'),('A00499736','9duOXmAxBH','student',1000,'Art','Kief','akief3@gravatar.com'),('A00532123','jzvAUz8zO','student',1000,'Haroun','Harcus','hharcus13@abc.net.au'),('A00543511','5edfJo5','student',1000,'Haven','Barrie','hbarrieg@simplemachines.org'),('A00559613','rqbM7cLQ','student',1000,'Royce','Edwardes','redwardesd@eepurl.com'),('A00561978','mppghXrPkVH','student',1000,'Gaven','Ebbs','gebbs1@harvard.edu'),('A00569802','l4CyXNLEq','student',1000,'Brnaby','Gabey','bgabeyk@usda.gov'),('A00579625','2hn4g99JVO','student',1000,'Farrel','Lodemann','flodemannr@oaic.gov.au'),('A00594956','iu2EInv','student',0,'Tye','O\'Nions','tonionsv@vkontakte.ru'),('A00629659','qvkrfNM9gK','student',1000,'Alley','Martensen','amartensen18@freewebs.com'),('A00637097','x6BkOLDrdsJ','student',1000,'Tremain','Klejna','tklejnan@flavors.me'),('A00647288','JAUyuPvxSKYR','student',0,'Sawyer','Hillaby','shillabyy@walmart.com'),('A00734732','klb8Fg32R','student',1000,'Valentine','Bridgen','vbridgen1d@tuttocitta.it'),('A00764151','Y4iLRtw','student',1000,'Sutherland','Renzini','srenzinix@microsoft.com'),('A00911441','XFaZIChV5m','student',0,'Wake','Gimlet','wgimletu@state.tx.us'),('A00971560','EOtkSK','student',0,'Irwinn','Dodimead','idodimead14@rakuten.co.jp'),('A00984378','T9gIimKJ','student',1000,'Garrott','Routham','groutham7@xinhuanet.com'),('A01115548','p3iz7VK','student',0,'Pail','Whylie','pwhylie17@addthis.com'),('A01135113','M5TL5L','student',1000,'Iorgo','Edmondson','iedmondson16@ihg.com'),('A01162510','udYLvYExQkcv','student',0,'Berkeley','Bevington','bbevingtonf@webs.com'),('A01208491','XIivTxY1Tl','student',1000,'Vasili','Tremellan','vtremellan8@geocities.jp'),('A01215862','uUwiBdGI','student',0,'Jeffy','Dowsett','jdowsettb@nytimes.com'),('A01223712','eWTfY0','student',0,'Brnaba','Siney','bsineyc@yahoo.co.jp'),('A01255468','xfx3wO','student',1000,'Tomas','Trethewey','ttrethewey12@examiner.com'),('A01274251','dF5djoK0j39r','student',0,'Taber','Burdge','tburdges@creativecommons.org'),('A01351957','vVh9Zt6Gy','student',1000,'Theodor','Giveen','tgiveen4@ning.com'),('A01382840','2xN1mXNynK','student',0,'Aldrich','Gooda','agooda5@oaic.gov.au'),('A01422294','aGzXvivL7nX','student',0,'Willem','Budd','wbudd15@stumbleupon.com'),('A01480785','a1RlOQOkg','student',1000,'Langston','Copins','lcopins10@noaa.gov'),('A01484703','ywGI8yIqMB6O','student',1000,'Reider','Wilshaw','rwilshaw11@accuweather.com'),('A01490607','nkaKbbBn1PX','student',0,'Morgan','Dabes','mdabest@newyorker.com'),('A01524400','EsEMTWmlI5B','student',2000,'Mohammed','Brecon','mbrecono@scribd.com'),('A01599716','zgNJUKCw','student',1400,'Normy','Wallentin','nwallentini@mozilla.com'),('A01627069','UEs7Fwxv','student',0,'Jonas','Coyte','jcoytej@marketwatch.com'),('A01639069','8NqIUn19','student',0,'Mallory','Hearne','mhearnea@usnews.com'),('A01648159','2DwAOJhk4a','student',0,'Bradley','McIlhone','bmcilhoneq@privacy.gov.au'),('A01657063','Ty85jQbL','student',1200,'Dalt','Garrie','dgarrie1a@prweb.com'),('A01695233','NrCinfHZ9NP','student',0,'Putnam','Stetson','pstetson0@shutterfly.com'),('A01830112','kae0Z5','student',1000,'Joseph','Bletso','jbletso1c@barnesandnoble.com'),('A01874296','W7mpNeiSho','staff',0,'Kincaid','Borzone','kborzone19@si.edu'),('A01961395','QGdl3moMmm','staff',0,'Brent','Farren','bfarrenp@reddit.com'),('A01969294','CrLcCsQzP','staff',0,'Griff','Sirkett','gsirkett9@blogger.com'),('A12341234','1234','staff',0,'John','Doe','email2@gmail.com'),('A12345678','1234','student',1000,'Owen','Gan','email@eamil.com');
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

-- Dump completed on 2019-03-04 12:48:36
