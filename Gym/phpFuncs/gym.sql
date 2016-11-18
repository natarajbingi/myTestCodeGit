-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2016 at 01:41 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gym`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_table`
--

CREATE TABLE IF NOT EXISTS `admin_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `date_time` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `admin_table`
--

INSERT INTO `admin_table` (`id`, `username`, `password`, `type`, `date_time`) VALUES
(1, 'admin', 'admin', 'admin', '2016-11-04 12:54:41');

-- --------------------------------------------------------

--
-- Table structure for table `monthly_fee_table`
--

CREATE TABLE IF NOT EXISTS `monthly_fee_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cust_id` varchar(11) NOT NULL,
  `cust_name` varchar(255) NOT NULL,
  `monthly_pay_amt` varchar(255) NOT NULL,
  `month_of_pay_date` date NOT NULL,
  `date_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `monthly_fee_table`
--

INSERT INTO `monthly_fee_table` (`id`, `cust_id`, `cust_name`, `monthly_pay_amt`, `month_of_pay_date`, `date_time`) VALUES
(1, '6', 'ravi bala', '200', '2016-11-08', '2016-11-08 12:12:31');

-- --------------------------------------------------------

--
-- Table structure for table `register_table`
--

CREATE TABLE IF NOT EXISTS `register_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `dob` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `batch` varchar(255) NOT NULL,
  `advance` varchar(100) NOT NULL,
  `date_time` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `register_table`
--

INSERT INTO `register_table` (`id`, `fname`, `lname`, `gender`, `dob`, `address`, `email`, `mobile`, `batch`, `advance`, `date_time`) VALUES
(1, 'vinay', 'p', 'Male', '12-12-1998', 'bangalore', 'v@p.com', '9988001145', 'Evening', '800', '2016-11-07 18:05:34'),
(2, 'Suhas', 'p', 'Male', '12-12-1998', 'bangalore', 'suhas@p.com', '7788105566', 'Morning', '800', '2016-11-07 18:06:10'),
(3, 'Bhagavathi', 'S', 'Male', '12-12-1998', 'bangalore', 'bhagavathi@p.com', '8877665544', 'Evening', '800', '2016-11-07 18:06:46'),
(4, 'Abhilash', 'Joshi', 'Male', '12-12-1998', 'bangalore', 'abhilash@p.com', '9966554410', 'Morning', '800', '2016-11-07 18:07:20'),
(5, 'Nataraj', 'Bingi', 'Male', '12-12-1998', 'bangalore', 'natarajbingi@gmail.com', '7766445514', 'Evening', '800', '2016-11-07 18:07:46'),
(6, 'ravi', 'bala', 'Male', '2006-01-03', '33 Patalamma Temple Street, Basavanagudi', 'kruschika@gmail.com', '9980453166', 'Morning', '800', '2016-11-08 12:11:53');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
