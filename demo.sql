CREATE DATABASE IF NOT EXISTS `demo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `demo`;

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unitPrice` float DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `items` (`id`, `productName`, `quantity`, `unitPrice`, `amount`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Table', 1, 350, 350, 'dinner table model AE-11', '2016-05-31 04:22:04', '2016-05-31 04:30:31'),
(2, 'Chair', 10, 50, 500, 'dinner table model AC-11', '2016-05-31 06:21:29', '2016-05-31 06:21:29'),
(3, 'Doors', 5, 400, 2000, 'Doors for bed rooms Model AG-56', '2016-05-31 06:36:52', '2016-05-31 06:37:53');


ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
