CREATE DATABASE  IF NOT EXISTS `kickstart` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `kickstart`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: kickstart
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
-- Table structure for table `finished_events`
--

DROP TABLE IF EXISTS `finished_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `finished_events` (
  `fk_users_id` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fk_events_id` int(11) NOT NULL,
  `finished_date` date NOT NULL,
  PRIMARY KEY (`fk_users_id`,`fk_events_id`),
  KEY `fk_fk_events_id_idx` (`fk_events_id`),
  CONSTRAINT `fk_fk_events_id` FOREIGN KEY (`fk_events_id`) REFERENCES `kickstart_events` (`events_id`),
  CONSTRAINT `fk_fk_users_id` FOREIGN KEY (`fk_users_id`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finished_events`
--

LOCK TABLES `finished_events` WRITE;
/*!40000 ALTER TABLE `finished_events` DISABLE KEYS */;
INSERT INTO `finished_events` VALUES ('A00305816',2019010001,'2019-02-07'),('A00561978',2019010002,'2019-02-07'),('A00594956',2019010002,'2019-02-07'),('A00637097',2019010001,'2019-02-07'),('A00734732',2019010003,'2019-02-07'),('A01215862',2019010003,'2019-02-07'),('A01382840',2019010001,'2019-02-07'),('A01422294',2019010003,'2019-02-07'),('A01484703',2019010001,'2019-02-07'),('A01648159',2019010003,'2019-02-07'),('A01830112',2019010002,'2019-02-07'),('A01874296',2019010002,'2019-02-07');
/*!40000 ALTER TABLE `finished_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kickstart_events`
--

DROP TABLE IF EXISTS `kickstart_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kickstart_events` (
  `events_id` int(11) NOT NULL,
  `events_title` varchar(100) NOT NULL,
  `events_date` date NOT NULL,
  `events_start_time` time NOT NULL,
  `events_end_time` time NOT NULL,
  `events_locations` varchar(100) NOT NULL,
  `events_point` int(5) NOT NULL,
  `events_desc` varchar(1000) DEFAULT NULL,
  `events_campus` varchar(20) NOT NULL,
  PRIMARY KEY (`events_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kickstart_events`
--

LOCK TABLES `kickstart_events` WRITE;
/*!40000 ALTER TABLE `kickstart_events` DISABLE KEYS */;
INSERT INTO `kickstart_events` VALUES (2019010001,'Kick Start Wayfinding Station','2019-02-07','16:30:00','18:30:00','SW1 Entrance',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby'),(2019010002,'Kick Start Wayfinding Station','2019-02-07','16:30:00','18:30:00','1st Floor Lobby',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Downtown'),(2019010003,'Welcome Back Feast','2019-02-07','16:30:00','18:30:00','SW1 Entrance',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby'),(2019020001,'Kick Start Wayfinding Station','2019-03-02','07:00:00','08:15:00','1st Floor Atrium',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Richmond'),(2019020002,'Kick Start Wayfinding Station','2019-03-02','08:00:00','10:00:00','Main Entrances to NE1',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby'),(2019020003,'Kick Start Wayfinding Station','2019-03-07','09:00:00','12:00:00','1st Floor Lobby',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Downtown'),(2019020004,'Welcome Back Feast','2019-03-07','11:30:00','13:30:00','SW1 Room 1521',1000,'Indigenous Services welcomes all new and returning indigenous students for a feast and welcome from BCIT staff, mentors and industry. Welcome begins at 11:30am and food will be served at noon.','Burnaby'),(2019020005,'Part-Time Studies Wayfinding Station','2019-03-07','16:30:00','18:30:00','1st Floor Lobby',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Downtown'),(2019020006,'Part-Time Studies Wayfinding Station','2019-03-07','16:30:00','18:30:00','SW1 Entrance',1000,'Get help on your first day at BCIT! Kick Start volunteers will be available to help answer any questions that you may have.','Burnaby');
/*!40000 ALTER TABLE `kickstart_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participating_events`
--

DROP TABLE IF EXISTS `participating_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participating_events` (
  `fk_users_id` varchar(12) NOT NULL,
  `fk_events_id` int(11) NOT NULL,
  `registered_date` date NOT NULL,
  PRIMARY KEY (`fk_users_id`,`fk_events_id`),
  KEY `fk_fk_events_id_idx` (`fk_events_id`),
  KEY `fk_events_id_idx` (`fk_events_id`),
  CONSTRAINT `fk_events_id` FOREIGN KEY (`fk_events_id`) REFERENCES `kickstart_events` (`events_id`),
  CONSTRAINT `fk_users_id` FOREIGN KEY (`fk_users_id`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participating_events`
--

LOCK TABLES `participating_events` WRITE;
/*!40000 ALTER TABLE `participating_events` DISABLE KEYS */;
INSERT INTO `participating_events` VALUES ('A00232294',2019020002,'2019-02-15'),('A00410384',2019020001,'2019-02-14'),('A00499736',2019020001,'2019-02-15'),('A00561978',2019020001,'2019-02-14'),('A00911441',2019020002,'2019-02-14'),('A00984378',2019020002,'2019-02-14'),('A01351957',2019020001,'2019-02-15'),('A01382840',2019020002,'2019-02-13'),('A01639069',2019020002,'2019-02-15'),('A01695233',2019020001,'2019-02-13');
/*!40000 ALTER TABLE `participating_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redeemed_rewards`
--

DROP TABLE IF EXISTS `redeemed_rewards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `redeemed_rewards` (
  `fk_users_id` varchar(12) NOT NULL,
  `fk_rewards_id` int(11) NOT NULL,
  `redeemed_date` datetime NOT NULL,
  PRIMARY KEY (`fk_users_id`,`fk_rewards_id`),
  KEY `fk_rewards_id_idx` (`fk_rewards_id`),
  KEY `redeemed_fk_rewards_id_idx` (`fk_rewards_id`),
  CONSTRAINT `redeemed_fk_rewards_id` FOREIGN KEY (`fk_rewards_id`) REFERENCES `rewards` (`rewards_id`),
  CONSTRAINT `redeemed_fk_users_id` FOREIGN KEY (`fk_users_id`) REFERENCES `users` (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redeemed_rewards`
--

LOCK TABLES `redeemed_rewards` WRITE;
/*!40000 ALTER TABLE `redeemed_rewards` DISABLE KEYS */;
INSERT INTO `redeemed_rewards` VALUES ('A00559613',4,'2019-01-20 00:00:00'),('A00971560',2,'2019-01-08 00:00:00'),('A01135113',2,'2019-01-01 00:00:00'),('A01255468',3,'2019-01-05 00:00:00'),('A01484703',2,'2019-01-12 00:00:00'),('A01961395',3,'2019-01-15 00:00:00');
/*!40000 ALTER TABLE `redeemed_rewards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rewards`
--

DROP TABLE IF EXISTS `rewards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rewards` (
  `rewards_id` int(11) NOT NULL,
  `rewards_title` varchar(100) NOT NULL,
  `rewards_points` int(5) NOT NULL,
  `rewards_desc` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`rewards_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rewards`
--

LOCK TABLES `rewards` WRITE;
/*!40000 ALTER TABLE `rewards` DISABLE KEYS */;
INSERT INTO `rewards` VALUES (1,'Monthly Parking',10000,'Monthly Parking PAss'),(2,'Daily Parking',1000,'Daily Parking Pass'),(3,'Free Coffee',1000,'Free Coffee Voucher'),(4,'Coffee Giftcard 5',1000,'Coffee Gift Card $5'),(5,'Coffee Giftcard 20',3000,'Coffee Gift Card $20'),(6,'Restaurant Giftcard 50',8000,'Restaurant Credit Card $50'),(7,'Tuition Voucher 150',20000,'Tuition $150'),(8,'Tuition Voucher 300',40000,'Tuition $300');
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
  `users_point` int(5) DEFAULT '0',
  `users_firstName` varchar(50) NOT NULL,
  `users_lastName` varchar(50) NOT NULL,
  `users_email` varchar(255) NOT NULL,
  PRIMARY KEY (`users_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('A00000000','Password','admin',99999,'admin','admin','vbridgen1d@tuttocitta.it'),('A00054504','I16J1J5g','student',8700,'Jasper','Galbraeth','jgalbraethz@fema.gov'),('A00116519','ryDi905cyFPA','staff',9800,'Hervey','Avon','havon6@liveinternet.ru'),('A00135457','0y2mp0mLqmcO','student',8900,'Peyter','Wines','pwinesh@imageshack.us'),('A00149041','1q8I5n4c','staff',8900,'Gram','Dundredge','gdundredgee@t-online.de'),('A00227334','hmLqjiMv','student',9900,'Haydon','Pellington','hpellingtonw@noaa.gov'),('A00232294','JHEnBfTko','staff',9600,'Cirstoforo','Liddall','cliddallm@rambler.ru'),('A00305816','xPzMCnEUM2q','student',7800,'Aron','O\'Hallagan','aohallagan1b@samsung.com'),('A00410384','xddsFl','student',7900,'Evelyn','McCullen','emccullen2@squidoo.com'),('A00478347','KC2GUEzjMwL9','staff',9900,'Cristiano','Lodovichi','clodovichil@tiny.cc'),('A00499736','9duOXmAxBH','student',9900,'Art','Kief','akief3@gravatar.com'),('A00532123','jzvAUz8zO','student',9900,'Haroun','Harcus','hharcus13@abc.net.au'),('A00543511','5edfJo5','student',6900,'Haven','Barrie','hbarrieg@simplemachines.org'),('A00559613','rqbM7cLQ','student',7900,'Royce','Edwardes','redwardesd@eepurl.com'),('A00561978','mppghXrPkVH','student',6700,'Gaven','Ebbs','gebbs1@harvard.edu'),('A00569802','l4CyXNLEq','student',8700,'Brnaby','Gabey','bgabeyk@usda.gov'),('A00579625','2hn4g99JVO','student',6500,'Farrel','Lodemann','flodemannr@oaic.gov.au'),('A00594956','iu2EInv','staff',8900,'Tye','O\'Nions','tonionsv@vkontakte.ru'),('A00629659','qvkrfNM9gK','student',7900,'Alley','Martensen','amartensen18@freewebs.com'),('A00637097','x6BkOLDrdsJ','student',9700,'Tremain','Klejna','tklejnan@flavors.me'),('A00647288','JAUyuPvxSKYR','staff',7400,'Sawyer','Hillaby','shillabyy@walmart.com'),('A00734732','klb8Fg32R','student',9900,'Valentine','Bridgen','vbridgen1d@tuttocitta.it'),('A00764151','Y4iLRtw','student',1700,'Sutherland','Renzini','srenzinix@microsoft.com'),('A00911441','XFaZIChV5m','staff',9900,'Wake','Gimlet','wgimletu@state.tx.us'),('A00971560','EOtkSK','staff',5800,'Irwinn','Dodimead','idodimead14@rakuten.co.jp'),('A00984378','T9gIimKJ','student',4700,'Garrott','Routham','groutham7@xinhuanet.com'),('A01115548','p3iz7VK','staff',5700,'Pail','Whylie','pwhylie17@addthis.com'),('A01135113','M5TL5L','student',9900,'Iorgo','Edmondson','iedmondson16@ihg.com'),('A01162510','udYLvYExQkcv','staff',8600,'Berkeley','Bevington','bbevingtonf@webs.com'),('A01208491','XIivTxY1Tl','student',8900,'Vasili','Tremellan','vtremellan8@geocities.jp'),('A01215862','uUwiBdGI','staff',8900,'Jeffy','Dowsett','jdowsettb@nytimes.com'),('A01223712','eWTfY0','staff',9900,'Brnaba','Siney','bsineyc@yahoo.co.jp'),('A01255468','xfx3wO','student',9500,'Tomas','Trethewey','ttrethewey12@examiner.com'),('A01274251','dF5djoK0j39r','staff',9200,'Taber','Burdge','tburdges@creativecommons.org'),('A01351957','vVh9Zt6Gy','student',9900,'Theodor','Giveen','tgiveen4@ning.com'),('A01382840','2xN1mXNynK','staff',3800,'Aldrich','Gooda','agooda5@oaic.gov.au'),('A01422294','aGzXvivL7nX','staff',9800,'Willem','Budd','wbudd15@stumbleupon.com'),('A01480785','a1RlOQOkg','staff',8800,'Langston','Copins','lcopins10@noaa.gov'),('A01484703','ywGI8yIqMB6O','student',7800,'Reider','Wilshaw','rwilshaw11@accuweather.com'),('A01490607','nkaKbbBn1PX','staff',8700,'Morgan','Dabes','mdabest@newyorker.com'),('A01524400','EsEMTWmlI5B','student',9600,'Mohammed','Brecon','mbrecono@scribd.com'),('A01599716','zgNJUKCw','student',7900,'Normy','Wallentin','nwallentini@mozilla.com'),('A01627069','UEs7Fwxv','staff',6900,'Jonas','Coyte','jcoytej@marketwatch.com'),('A01639069','8NqIUn19','staff',9900,'Mallory','Hearne','mhearnea@usnews.com'),('A01648159','2DwAOJhk4a','staff',9900,'Bradley','McIlhone','bmcilhoneq@privacy.gov.au'),('A01657063','Ty85jQbL','student',9800,'Dalt','Garrie','dgarrie1a@prweb.com'),('A01695233','NrCinfHZ9NP','staff',9700,'Putnam','Stetson','pstetson0@shutterfly.com'),('A01830112','kae0Z5','student',8900,'Joseph','Bletso','jbletso1c@barnesandnoble.com'),('A01874296','W7mpNeiSho','staff',8800,'Kincaid','Borzone','kborzone19@si.edu'),('A01961395','QGdl3moMmm','staff',9800,'Brent','Farren','bfarrenp@reddit.com'),('A01969294','CrLcCsQzP','staff',9500,'Griff','Sirkett','gsirkett9@blogger.com'),('A12345678','1234','student',1000,'Owen','Gan','email@eamil.com');
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

-- Dump completed on 2019-02-28 20:44:36
