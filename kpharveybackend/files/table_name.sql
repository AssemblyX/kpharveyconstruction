-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: northernclinical
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_costannalysis`
--

DROP TABLE IF EXISTS `tbl_costannalysis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_costannalysis` (
  `costannalysis_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`costannalysis_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_costannalysis`
--

LOCK TABLES `tbl_costannalysis` WRITE;
/*!40000 ALTER TABLE `tbl_costannalysis` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_costannalysis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_nonprocedure`
--

DROP TABLE IF EXISTS `tbl_nonprocedure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_nonprocedure` (
  `nonprocedure_id` int(11) NOT NULL AUTO_INCREMENT,
  `nonprocedure_name` varchar(128) DEFAULT NULL,
  `nonprocedure_cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`nonprocedure_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='tbl_nonprocedurecol';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_nonprocedure`
--

LOCK TABLES `tbl_nonprocedure` WRITE;
/*!40000 ALTER TABLE `tbl_nonprocedure` DISABLE KEYS */;
INSERT INTO `tbl_nonprocedure` VALUES (1,'Study Coordinator complex - Per Visit',200.00),(2,'Subject Stipend',50.00),(3,'Study Coordinator simple - Per Visit',120.00),(4,'Physician, complex - Per Visit (both PI&Sub-I attending)',200.00),(5,'Physician, phone visit review',100.00),(6,'Physician, simple - Per Visit',180.00);
/*!40000 ALTER TABLE `tbl_nonprocedure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_nonprocedure_costannalysis_lk`
--

DROP TABLE IF EXISTS `tbl_nonprocedure_costannalysis_lk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_nonprocedure_costannalysis_lk` (
  `nonprocedure_id` int(11) NOT NULL,
  `tbl_costannalysis_costannalysis_id` int(11) NOT NULL,
  PRIMARY KEY (`nonprocedure_id`,`tbl_costannalysis_costannalysis_id`),
  KEY `fk_tbl_nonprocedure_costannalysis_lk_tbl_costannalysis1_idx` (`tbl_costannalysis_costannalysis_id`),
  CONSTRAINT `fk_tbl_nonprocedure_costannalysis_lk_tbl_costannalysis1` FOREIGN KEY (`tbl_costannalysis_costannalysis_id`) REFERENCES `tbl_costannalysis` (`costannalysis_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_nonprocedure_costannalysis_lk_tbl_nonprocedure1` FOREIGN KEY (`nonprocedure_id`) REFERENCES `tbl_nonprocedure` (`nonprocedure_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_nonprocedure_costannalysis_lk`
--

LOCK TABLES `tbl_nonprocedure_costannalysis_lk` WRITE;
/*!40000 ALTER TABLE `tbl_nonprocedure_costannalysis_lk` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_nonprocedure_costannalysis_lk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_physician`
--

DROP TABLE IF EXISTS `tbl_physician`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_physician` (
  `physician_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`physician_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_physician`
--

LOCK TABLES `tbl_physician` WRITE;
/*!40000 ALTER TABLE `tbl_physician` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_physician` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_procedure`
--

DROP TABLE IF EXISTS `tbl_procedure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_procedure` (
  `procedure_id` int(11) NOT NULL AUTO_INCREMENT,
  `procedure_name` varchar(128) DEFAULT NULL,
  `procedure_cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`procedure_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_procedure`
--

LOCK TABLES `tbl_procedure` WRITE;
/*!40000 ALTER TABLE `tbl_procedure` DISABLE KEYS */;
INSERT INTO `tbl_procedure` VALUES (1,'Study Consent',140.00),(2,'Medical/medication history review & PE',100.00),(3,'Vital signs',39.00),(4,'Inclusion/exclusion criteria review',19.00),(5,'Clinical chemistries and hematology',5.00),(6,'RSV serology',40.00),(7,'Influenza vaccine (offered, not required)',NULL),(8,'Confirm eligibility',19.00),(9,'Test article injection (all subjects)',45.00),(10,'Test article injection (subjects in groups A and C)',45.00),(11,'Hep A vaccine (subjects in groups B,D and E)',29.00),(12,'Hep A vaccine (subjects in groups A and C)',29.00),(13,'Observe and record immediate (30 mins post-injection) Aes-includes vitals',40.00),(14,'Telephone contact with AE review',NULL),(15,'Symptom diary',NULL),(16,'Collect/review diary data',29.00),(17,'All unsolicited Aes',NULL),(18,'Directed PE',75.00),(19,'MAEs, SAEs, SNMCs',20.00),(20,'Conconmitant medication',12.00),(21,'Study Completion',NULL);
/*!40000 ALTER TABLE `tbl_procedure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_procedure_costannalysis_lk`
--

DROP TABLE IF EXISTS `tbl_procedure_costannalysis_lk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_procedure_costannalysis_lk` (
  `procedure_id` int(11) NOT NULL,
  `costannalysis_id` int(11) NOT NULL,
  PRIMARY KEY (`procedure_id`,`costannalysis_id`),
  KEY `fk_tbl_procedure_costannalysis_lk_tbl_costannalysis1_idx` (`costannalysis_id`),
  CONSTRAINT `fk_tbl_procedure_costannalysis_lk_tbl_costannalysis1` FOREIGN KEY (`costannalysis_id`) REFERENCES `tbl_costannalysis` (`costannalysis_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_procedure_costannalysis_lk_tbl_procedure` FOREIGN KEY (`procedure_id`) REFERENCES `tbl_procedure` (`procedure_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_procedure_costannalysis_lk`
--

LOCK TABLES `tbl_procedure_costannalysis_lk` WRITE;
/*!40000 ALTER TABLE `tbl_procedure_costannalysis_lk` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_procedure_costannalysis_lk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_schedule`
--

DROP TABLE IF EXISTS `tbl_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_schedule` (
  `schedule_id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule_name1` varchar(128) DEFAULT NULL,
  `schedule_name2` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_schedule`
--

LOCK TABLES `tbl_schedule` WRITE;
/*!40000 ALTER TABLE `tbl_schedule` DISABLE KEYS */;
INSERT INTO `tbl_schedule` VALUES (1,'PS','Screening (-day 28 to -1)'),(2,'SV1','Screening (-day 7 to -1)'),(3,'SV2','Screening (-day 1)'),(4,'Rando V1','Week 0'),(5,'2','Week 2'),(6,'3','Week 4'),(7,'4','Week 6'),(8,'5','Week 8'),(9,'6','Week 10'),(10,'7','Week 12'),(11,'8','Week 16'),(12,'9','Week 20'),(13,'10','Week 24'),(14,'11','Week 28'),(15,'12','Week 32'),(16,'13','Week 36'),(17,'14','Week 40'),(18,'15','Week 44'),(19,'16','Week 48'),(20,'17','Week 52'),(21,'18','Week 64'),(22,'19','Week 76'),(23,'20','Week 88'),(24,'21','Week 104'),(25,'22','Week 116'),(26,'23','Week 128'),(27,'24','Week 140'),(28,'25','Week 156'),(29,'26','Week 168'),(30,'27','Week 180'),(31,'28','Week 192'),(32,'29','Week 208'),(33,'EOT','Week  4'),(34,'F-UP','Week 8');
/*!40000 ALTER TABLE `tbl_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_schedule_costannalysis`
--

DROP TABLE IF EXISTS `tbl_schedule_costannalysis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_schedule_costannalysis` (
  `tbl_schedule_schedule_id` int(11) NOT NULL,
  `tbl_costannalysis_costannalysis_id` int(11) NOT NULL,
  PRIMARY KEY (`tbl_schedule_schedule_id`,`tbl_costannalysis_costannalysis_id`),
  KEY `fk_tbl_schedule_costannalysis_tbl_costannalysis1_idx` (`tbl_costannalysis_costannalysis_id`),
  CONSTRAINT `fk_tbl_schedule_costannalysis_tbl_costannalysis1` FOREIGN KEY (`tbl_costannalysis_costannalysis_id`) REFERENCES `tbl_costannalysis` (`costannalysis_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_schedule_costannalysis_tbl_schedule1` FOREIGN KEY (`tbl_schedule_schedule_id`) REFERENCES `tbl_schedule` (`schedule_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_schedule_costannalysis`
--

LOCK TABLES `tbl_schedule_costannalysis` WRITE;
/*!40000 ALTER TABLE `tbl_schedule_costannalysis` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_schedule_costannalysis` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-05 13:58:20
