-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2016 at 09:48 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.5.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo`
--

-- --------------------------------------------------------

--
-- Dumping data for table `itemprices`
--

INSERT INTO `itemprices` (`id`, `price`, `date`, `createdAt`, `updatedAt`, `itemdictId`) VALUES
(1, 30000, '2016-07-06 00:00:00', '2016-07-08 00:00:00', '2016-07-08 00:00:00', 1),
(2, 40000, '2016-07-08 00:00:00', '2016-07-08 00:00:00', '2016-07-08 00:00:00', 1),
(3, 35000, '2016-07-08 00:00:00', '2016-07-08 00:00:00', '2016-07-08 00:00:00', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `itemprices`
--
ALTER TABLE `itemprices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `itemdictId` (`itemdictId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `itemprices`
--
ALTER TABLE `itemprices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `itemprices`
--
ALTER TABLE `itemprices`
  ADD CONSTRAINT `itemprices_ibfk_1` FOREIGN KEY (`itemdictId`) REFERENCES `itemdicts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
