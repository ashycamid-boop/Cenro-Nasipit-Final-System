-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2026 at 05:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cenro_nasipit`
--

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL,
  `property_number` varchar(100) DEFAULT NULL,
  `office_division` varchar(255) DEFAULT NULL,
  `equipment_type` varchar(100) DEFAULT NULL,
  `year_acquired` year(4) DEFAULT NULL,
  `shelf_life` varchar(50) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `processor` varchar(255) DEFAULT NULL,
  `ram_size` varchar(50) DEFAULT NULL,
  `gpu` varchar(255) DEFAULT NULL,
  `range_category` varchar(100) DEFAULT NULL,
  `computer_name` varchar(255) DEFAULT NULL,
  `os_version` varchar(255) DEFAULT NULL,
  `office_productivity` varchar(255) DEFAULT NULL,
  `endpoint_protection` varchar(255) DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `accountable_person` varchar(255) DEFAULT NULL,
  `accountable_person_id` int(11) DEFAULT NULL,
  `accountable_sex` varchar(20) DEFAULT NULL,
  `accountable_employment` varchar(100) DEFAULT NULL,
  `actual_user` varchar(255) DEFAULT NULL,
  `actual_user_id` int(11) DEFAULT NULL,
  `actual_user_sex` varchar(20) DEFAULT NULL,
  `actual_user_employment` varchar(100) DEFAULT NULL,
  `nature_of_work` varchar(255) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `qr_code_path` varchar(255) DEFAULT NULL,
  `status` enum('Available','In Use','Returned','Under Maintenance','Damaged','Out of Service','Disposed') NOT NULL DEFAULT 'In Use',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `property_number`, `office_division`, `equipment_type`, `year_acquired`, `shelf_life`, `brand`, `model`, `processor`, `ram_size`, `gpu`, `range_category`, `computer_name`, `os_version`, `office_productivity`, `endpoint_protection`, `serial_number`, `accountable_person`, `accountable_person_id`, `accountable_sex`, `accountable_employment`, `actual_user`, `actual_user_id`, `actual_user_sex`, `actual_user_employment`, `nature_of_work`, `remarks`, `qr_code_path`, `status`, `created_at`, `updated_at`, `created_by`, `updated_by`) VALUES
(1, 'DSK-2022-04-01', 'DENR-CENRO Nasipit', 'Desktop', '2022', 'Beyond 5 Years', 'HP', 'HP ProDesk 400 G7', 'Intel Core i5-10400', '8GB DDR4', 'Intel UHD Graphics 630', NULL, 'DENR-ADM-PC-01', 'Windows 10', 'Microsoft Office 2019', 'Windows Defender / Windows Firewall', 'HPG7400SN56789', '', NULL, 'Female', 'Temporary', '', NULL, '', '', '', '', 'uploads/qr/eq-1.png', 'Out of Service', '2026-03-06 03:01:17', '2026-03-20 03:51:59', NULL, NULL),
(3, 'UPS-2021-04-01', 'DENR-CENRO Nasipit', 'UPS', '2021', 'Within 5 Years', 'IDEAL', 'S10LC', '', '', '', NULL, 'UPS-CENRO-01', '', '', '', 'UPS-CENRO-01', '24', NULL, 'Male', 'Part-Time', '25', NULL, 'Male', 'Contractual', 'Technical Works', '', 'uploads/qr/eq-3.png', 'In Use', '2026-03-06 03:33:53', '2026-03-06 03:33:55', NULL, NULL),
(4, 'PRN-2022-06-03', 'DENR-CENRO Nasipit', 'Printers', '2022', 'Within 5 Years', 'Epson', 'L3210', '', '', '', NULL, 'CENRO-PRN-01', '', '', '', 'X3AB123456', '23', NULL, 'Male', 'Permanent', '', NULL, '', '', '', '', 'uploads/qr/eq-4.png', 'Available', '2026-03-06 03:46:41', '2026-03-06 04:16:52', NULL, NULL),
(5, 'LTP-2023-05-21', 'DENR – CENRO Nasipit', 'Laptop', '2023', 'Beyond 5 Years', 'Lenovo', 'ThinkPad E14', 'Intel Core i5-1135G7', '8GB DDR4', 'Intel Iris Xe Graphics', NULL, 'CENRO-LTP-01', 'Windows 11', 'Microsoft 365 (Office 365)', 'Windows Defender / Windows Firewall', 'LNVTP12345678', '24', NULL, 'Male', 'Consultant', '26', NULL, 'Female', 'Permanent', 'Technical Works', '', 'uploads/qr/eq-5.png', 'In Use', '2026-03-06 03:50:23', '2026-03-20 03:01:39', NULL, NULL),
(6, 'DSK-2022-09-04', 'DENR – CENRO Nasipit', 'Desktop', '2022', 'Beyond 5 Years', 'HP', 'ProDesk 400 G6', 'Intel Core i5-9500', '8GB DDR4', 'Intel UHD Graphics 630', NULL, 'CENRO-DSK-01', 'Windows 10', 'Microsoft Office 2019', 'Trend Micro', 'HPG640012345', '22', NULL, 'Male', 'Permanent', '', NULL, '', '', '', '', 'uploads/qr/eq-6.png', 'Under Maintenance', '2026-03-06 03:53:00', '2026-03-20 03:00:37', NULL, NULL),
(7, 'DSK-2022-04-04', 'DENR – CENRO Nasipit', 'Desktop', '2022', 'Beyond 5 Years', 'HP', 'ProDesk 400 G7', 'Intel Core i5-10400', '8GB DDR4', 'Intel UHD Graphics 630', NULL, 'CENRO-DSK-02', 'Windows 10 Pro', 'Microsoft Office 2019', 'Windows Defender / Windows Firewall', 'HPG7400SN56789', '28', NULL, 'Male', 'Permanent', '26', NULL, 'Female', 'Permanent', 'Technical Works', '', 'uploads/qr/eq-7.png', 'In Use', '2026-03-14 09:08:20', '2026-03-20 03:00:29', NULL, NULL),
(8, 'DSK-2022-04-04', 'DENR – CENRO Nasipit', 'Desktop', '2022', 'Beyond 5 Years', 'HP', 'ProDesk 400 G7', 'Intel Core i5-10400', '8GB DDR4', 'Intel UHD Graphics 630', NULL, 'CENRO-DSK-02', 'Windows 10 Pro', 'Microsoft Office 2019', 'Windows Defender / Windows Firewall', 'HPG7400SN56789', '28', NULL, 'Male', 'Permanent', '26', NULL, 'Female', 'Permanent', 'Technical Works', 'Returned to Property', 'uploads/qr/eq-8.png', 'Returned', '2026-03-14 09:08:21', '2026-03-20 03:51:15', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` int(11) NOT NULL,
  `property_name` varchar(255) NOT NULL,
  `property_type` varchar(100) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Available','In Use','Under Maintenance','Damaged','Out of Service','Disposed') DEFAULT 'Available',
  `custodian_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_requests`
--

CREATE TABLE `service_requests` (
  `id` int(10) UNSIGNED NOT NULL,
  `ticket_no` varchar(64) NOT NULL,
  `ticket_date` date NOT NULL,
  `requester_name` varchar(255) DEFAULT NULL,
  `requester_position` varchar(150) DEFAULT NULL,
  `requester_office` varchar(150) DEFAULT NULL,
  `requester_division` varchar(150) DEFAULT NULL,
  `requester_phone` varchar(50) DEFAULT NULL,
  `requester_email` varchar(150) DEFAULT NULL,
  `request_type` varchar(150) DEFAULT NULL,
  `request_description` text DEFAULT NULL,
  `feedback_rating` varchar(50) DEFAULT NULL,
  `requester_signature_path` varchar(255) DEFAULT NULL,
  `auth1_name` varchar(255) DEFAULT NULL,
  `auth1_position` varchar(150) DEFAULT NULL,
  `auth1_date` date DEFAULT NULL,
  `auth1_signature_path` varchar(255) DEFAULT NULL,
  `auth2_name` varchar(255) DEFAULT NULL,
  `auth2_position` varchar(150) DEFAULT NULL,
  `auth2_date` date DEFAULT NULL,
  `auth2_signature_path` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'open',
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `ack_signature_path` text DEFAULT NULL,
  `acknowledged_at` datetime DEFAULT NULL,
  `acknowledged_by_name` varchar(191) DEFAULT NULL,
  `acknowledged_by` varchar(150) DEFAULT NULL,
  `rating` varchar(32) DEFAULT NULL,
  `rating_comment` text DEFAULT NULL,
  `rated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_requests`
--

INSERT INTO `service_requests` (`id`, `ticket_no`, `ticket_date`, `requester_name`, `requester_position`, `requester_office`, `requester_division`, `requester_phone`, `requester_email`, `request_type`, `request_description`, `feedback_rating`, `requester_signature_path`, `auth1_name`, `auth1_position`, `auth1_date`, `auth1_signature_path`, `auth2_name`, `auth2_position`, `auth2_date`, `auth2_signature_path`, `status`, `created_by`, `created_at`, `updated_at`, `ack_signature_path`, `acknowledged_at`, `acknowledged_by_name`, `acknowledged_by`, `rating`, `rating_comment`, `rated_at`) VALUES
(20, '2026-03-0001', '2026-03-04', 'Joel Andoy Caluya', 'Administrative Assistant II', 'CENRO Nasipit', 'Conservation Development Section', '09753425462', 'joelcaluya@gmail.com', 'Assist in the Orientation of Watershed', 'Set up projector and sound system', 'excellent', 'public/uploads/signatures/sig_CN-2026-03-0001_requester_1772617674.png', 'Joryn Cagulangan', 'Chief Conservation and Development Section', '2026-03-06', 'public/uploads/signatures/auth1_69aa5f14257ea.png', 'Joan P. Jumawid', 'EMS l/Planning Designate', '2026-03-06', 'public/uploads/signatures/auth2_69aa5efc6bbda.png', 'Completed', 22, '2026-03-04 09:47:54', '2026-04-03 02:42:54', 'public/uploads/ack_signatures/ack_20_1773628110.png', '2026-03-16 10:28:30', NULL, 'Joel Andoy Caluya', NULL, NULL, NULL),
(21, '2026-03-0002', '2026-03-04', 'Rich Ian James I. Balaido', 'Team Leader', 'CENRO Nasipit', 'Conservation Development Section', '09647281928', 'richian@gmail.com', 'Hardware Support', 'Requesting technical assistance to check the office monitor as the screen is flickering during use which affects normal office work.', NULL, 'public/uploads/signatures/sig_CN-2026-03-0002_requester_1772617816.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 23, '2026-03-04 09:50:16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, '2026-03-0003', '2026-03-04', 'Jay Ivan Ebarzabal Tadena', 'Project Office Staff', 'CENRO Nasipit', 'Conservation Development Section', '09090481882', 'jayivan@gmail.com', 'Printer Repair', 'Requesting technical assistance to check the office printer as it is not printing documents properly.', NULL, 'public/uploads/signatures/sig_CN-2026-03-0003_requester_1772617900.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 25, '2026-03-04 09:51:40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, '2026-03-0004', '2026-03-04', 'Joel Andoy Caluya', 'Administrative Assistant II', 'CENRO Nasipit', 'Conservation Development Section', '09753425462', 'joelcaluya@gmail.com', 'Network Support', 'Requesting assistance to check the internet connection in the office as it is slow and frequently disconnecting.', NULL, 'public/uploads/signatures/sig_CN-2026-03-0004_requester_1772617970.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 22, '2026-03-04 09:52:50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(24, '2026-03-0005', '2026-03-04', 'Rich Ian James I. Balaido', 'Project support staff', 'CENRO Nasipit', 'Conservation Development Section', '09647281928', 'richian@gmail.com', 'Software Installation', 'Requesting installation of necessary software required for office work and report preparation.', NULL, 'public/uploads/signatures/sig_CN-2026-03-0005_requester_1772618027.png', 'PJ Mordeno', 'Chief Conservation and Development Section', NULL, 'public/uploads/signatures/auth1_69bbacd049125.png', NULL, NULL, NULL, NULL, 'pending', 23, '2026-03-04 09:53:47', '2026-03-19 07:59:12', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, '2026-03-0006', '2026-03-04', 'Jay Ivan Ebarzabal Tadena', 'Project Office Staff', 'CENRO Nasipit', 'Conservation Development Section', '09090481882', 'jayivan@gmail.com', 'Network Connectivity Support', 'Requesting support to troubleshoot network connectivity issues in the office as computers are unable to connect to the internet.', NULL, 'public/uploads/signatures/sig_CN-2026-03-0006_requester_1772618122.png', 'PJ Mordeno', 'Chief Conservation and Development Section', '2026-03-16', 'public/uploads/signatures/auth1_69b7b5ce36db5.png', 'PJ Mordeno', 'EMS l/Planning Designate', '2026-03-16', 'public/uploads/signatures/auth2_69b7b5ce37de2.png', 'Ongoing', 25, '2026-03-04 09:55:22', '2026-03-23 07:28:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(26, '2026-03-0007', '2026-03-06', 'Ashmen Sultan Camid', 'Project support staff', 'CENRO Nasipit', 'Conservation Development Section', '09090481884', 'ashycamid@gmail.com', 'System Maintenance', 'Requesting assistance to check the office computer as it is running very slow when opening files and applications.', NULL, 'public/uploads/signatures/sig_CN-2026-03-0007_requester_1772775518.png', 'PJ Mordeno', 'Chief Conservation and Development Section', '2026-03-16', 'public/uploads/signatures/auth1_69b7a70f33166.png', 'PJ Mordeno', 'EMS l/Planning Designate', '2026-03-16', 'public/uploads/signatures/auth2_69b7a4cd420ff.png', 'Completed', 26, '2026-03-06 05:38:38', '2026-04-03 02:15:51', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(28, '2026-04-0001', '2026-04-03', 'Joel Andoy Caluya', 'Project support staff', 'CENRO Nasipit', 'Conservation Development Section', '09753425462', 'joelcaluya@gmail.com', 'Hardware Support', 'OK', NULL, 'public/uploads/signatures/sig_CN-2026-04-0001_requester_1775180301.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'pending', 22, '2026-04-03 01:38:21', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `service_request_actions`
--

CREATE TABLE `service_request_actions` (
  `id` int(10) UNSIGNED NOT NULL,
  `service_request_id` int(10) UNSIGNED NOT NULL,
  `action_date` date DEFAULT NULL,
  `action_time` time DEFAULT NULL,
  `action_details` text DEFAULT NULL,
  `action_staff_id` int(11) DEFAULT NULL,
  `action_signature_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_request_actions`
--

INSERT INTO `service_request_actions` (`id`, `service_request_id`, `action_date`, `action_time`, `action_details`, `action_staff_id`, `action_signature_path`, `created_at`, `updated_at`) VALUES
(7, 20, '2026-03-06', '13:10:00', 'Kindly set up the projector and sound system', 1, 'public/uploads/signatures/action_20_69b764d344397.png', '2026-03-16 02:03:13', NULL),
(8, 20, '2026-03-16', '10:02:00', 'Already set up', 1, 'public/uploads/signatures/action_20_69b764d346690.png', '2026-03-16 02:03:13', NULL),
(11, 26, '2026-03-16', '14:45:00', 'HAHHAHA', 1, 'public/uploads/signatures/action_26_69b7b64602e21.png', '2026-03-16 07:50:30', NULL),
(12, 26, '2026-03-16', '15:49:00', 'HAHAHHA', 1, 'public/uploads/signatures/action_26_69b7b646035a8.png', '2026-03-16 07:50:30', NULL),
(13, 24, '2026-03-14', '20:22:00', 'HAHSBHJSABDJ', 1, 'public/uploads/signatures/action_24_69bbacd05c027.png', '2026-03-19 07:59:12', NULL),
(14, 25, '2026-03-16', '15:48:00', 'HAHHAHAHA', 27, NULL, '2026-03-23 07:28:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `spot_reports`
--

CREATE TABLE `spot_reports` (
  `id` int(10) UNSIGNED NOT NULL,
  `reference_no` varchar(100) NOT NULL,
  `incident_datetime` datetime DEFAULT NULL,
  `memo_date` datetime DEFAULT NULL,
  `location` text DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `team_leader` varchar(255) DEFAULT NULL,
  `custodian` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Draft',
  `status_comment` text DEFAULT NULL,
  `case_status` varchar(64) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `submitted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spot_reports`
--

INSERT INTO `spot_reports` (`id`, `reference_no`, `incident_datetime`, `memo_date`, `location`, `summary`, `team_leader`, `custodian`, `status`, `status_comment`, `case_status`, `created_at`, `updated_at`, `submitted_by`) VALUES
(13, '2026-03-04-0001', '2026-03-04 17:56:00', '2026-03-04 17:56:00', 'Brgy Rizal, Buenavista, Agusan del Norte', 'On July 12, 2025, around 10:17 AM, personnel from DENR CENRO Nasipit together with the Buenavista Municipal Police Station (MPS) apprehended 11 pieces of Antipolo lumber (88 board feet) with an estimated market value of Php 2,640.00, along with one STIHL chainsaw at Brgy. Rizal, Buenavista, Agusan del Norte.\r\n\r\nThe confiscated forest products and chainsaw were placed under the custody of the Buenavista DENR MIAC, specifically under FR Victor M. Tindoy Jr., for safekeeping.\r\nAn investigation is currently being conducted to identify the responsible individual(s) and to determine the appropriate case to be filed. A Chainsaw (CSW) report will follow for further documentation.', 'FR Victor M. Tindoy, Jr.', 'FR Victor M. Tindoy, Jr.', 'Pending', '', 'under-investigation', '2026-03-04 18:00:26', '2026-03-19 16:48:00', 23),
(14, '2026-03-04-0002', '2026-03-04 18:01:00', '2026-03-04 18:01:00', 'Brgy Rizal, Buenavista, Agusan del Norte', 'Personnel from DENR MIAC together with local authorities conducted a routine forest protection patrol in the area and discovered illegally cut timber without proper documentation. The team confiscated several pieces of lumber and logging equipment found at the site. The confiscated forest products were transported to the DENR storage facility for proper documentation and safekeeping.', 'FR Victor M. Tindoy, Jr.', 'FR Victor M. Tindoy, Jr.', 'Approved', '', 'Under Investigation', '2026-03-04 18:12:10', '2026-03-06 13:17:03', 26),
(15, '2026-03-14-0001', '2026-03-15 06:37:00', '2026-03-15 06:37:00', 'Brgy. San Isidro, Cabadbaran City, Agusan del Norte', 'Personnel from DENR MIAC conducted a routine forest protection patrol in the area of Brgy. San Isidro, Cabadbaran City. During the patrol, the team discovered illegally cut timber without proper transport documents. The suspected individual was apprehended while transporting forest products using a private vehicle. The confiscated timber and equipment were brought to the DENR storage facility for proper documentation and legal processing.', 'FR Victor M. Tindoy Jr.', 'FR Victor M. Tindoy Jr.', 'Approved', '', 'under-investigation', '2026-03-15 06:41:28', '2026-03-16 15:41:13', 23),
(17, '2026-03-24-0002', '2026-03-24 12:37:00', '2026-03-24 12:37:00', 'Brgy. San Isidro, Cabadbaran City, Agusan del Norte', 'On or about 2:15 PM of March 12, 2026, a joint team from DENR CENRO Butuan and the local police conducted a checkpoint operation along the national highway in Brgy. San Isidro, Butuan City. During inspection, one closed van was flagged for transporting undocumented forest products.', 'FR Victor M. Tindoy Jr.', 'FR Victor M. Tindoy Jr.', 'Rejected', '', 'under-investigation', '2026-03-24 13:53:24', '2026-03-25 08:36:12', 23);

-- --------------------------------------------------------

--
-- Table structure for table `spot_report_files`
--

CREATE TABLE `spot_report_files` (
  `id` int(10) UNSIGNED NOT NULL,
  `report_id` int(10) UNSIGNED NOT NULL,
  `file_type` varchar(50) NOT NULL,
  `file_path` varchar(1024) NOT NULL,
  `orig_name` varchar(512) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spot_report_files`
--

INSERT INTO `spot_report_files` (`id`, `report_id`, `file_type`, `file_path`, `orig_name`, `created_at`) VALUES
(51, 13, 'person_evidence', '/uploads/spot_reports/2026-03-04-0001/person_69a802ba6870d.jpg', 'person#0:522334832_1510853866954991_1541524868942332275_n.jpg', '2026-03-04 18:00:26'),
(52, 13, 'vehicle_evidence', '/uploads/spot_reports/2026-03-04-0001/vehicle_69a802ba6b2ff.jpg', 'vehicle#0:toyota vios.jpg', '2026-03-04 18:00:26'),
(53, 13, 'item_evidence', '/uploads/spot_reports/2026-03-04-0001/item_69a802ba6c4e0.jpg', 'item#0:Antipolo Lumber.jpg', '2026-03-04 18:00:26'),
(54, 13, 'item_evidence', '/uploads/spot_reports/2026-03-04-0001/item_69a802ba6dcb2.jpg', 'item#1:chainsaw.jpg', '2026-03-04 18:00:26'),
(55, 13, 'evidence', '/uploads/spot_reports/2026-03-04-0001/evi_69a802ba6fab3.jpg', 'chainsaw.jpg', '2026-03-04 18:00:26'),
(56, 13, 'evidence', '/uploads/spot_reports/2026-03-04-0001/evi_69a802ba709f1.jpg', 'Antipolo Lumber.jpg', '2026-03-04 18:00:26'),
(57, 13, 'evidence', '/uploads/spot_reports/2026-03-04-0001/evi_69a802ba71fc2.jpg', 'toyota vios.jpg', '2026-03-04 18:00:26'),
(58, 13, 'pdf', '/uploads/spot_reports/2026-03-04-0001/doc_69a802ba732a4.pdf', 'spot_report.pdf', '2026-03-04 18:00:26'),
(59, 14, 'person_evidence', '/uploads/spot_reports/2026-03-04-0002/person_69a8057a1bca4.jpg', 'person#0:521809640_1076494124094599_4255448632622050603_n.jpg', '2026-03-04 18:12:10'),
(60, 14, 'vehicle_evidence', '/uploads/spot_reports/2026-03-04-0002/vehicle_69a8057a1d84f.jpg', 'vehicle#0:toyota vios.jpg', '2026-03-04 18:12:10'),
(61, 14, 'item_evidence', '/uploads/spot_reports/2026-03-04-0002/item_69a8057a1e433.jpg', 'item#0:Antipolo Lumber.jpg', '2026-03-04 18:12:10'),
(62, 14, 'item_evidence', '/uploads/spot_reports/2026-03-04-0002/item_69a8057a1f7d9.jpg', 'item#1:chainsaw.jpg', '2026-03-04 18:12:10'),
(63, 14, 'evidence', '/uploads/spot_reports/2026-03-04-0002/evi_69a8057a211e5.jpg', 'chainsaw.jpg', '2026-03-04 18:12:10'),
(64, 14, 'evidence', '/uploads/spot_reports/2026-03-04-0002/evi_69a8057a21d1b.jpg', 'Antipolo Lumber.jpg', '2026-03-04 18:12:10'),
(65, 14, 'evidence', '/uploads/spot_reports/2026-03-04-0002/evi_69a8057a22a1c.jpg', 'toyota vios.jpg', '2026-03-04 18:12:10'),
(66, 14, 'pdf', '/uploads/spot_reports/2026-03-04-0002/doc_69a8057a23349.pdf', 'spot_report.pdf', '2026-03-04 18:12:10');

-- --------------------------------------------------------

--
-- Table structure for table `spot_report_items`
--

CREATE TABLE `spot_report_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `report_id` int(10) UNSIGNED NOT NULL,
  `item_no` varchar(50) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` varchar(100) DEFAULT NULL,
  `thickness_in` decimal(10,3) DEFAULT NULL,
  `width_in` decimal(10,3) DEFAULT NULL,
  `length_ft` decimal(10,3) DEFAULT NULL,
  `volume_bdft` decimal(15,3) DEFAULT NULL,
  `volume` varchar(100) DEFAULT NULL,
  `value` decimal(15,2) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `status` varchar(64) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spot_report_items`
--

INSERT INTO `spot_report_items` (`id`, `report_id`, `item_no`, `type`, `description`, `quantity`, `thickness_in`, `width_in`, `length_ft`, `volume_bdft`, `volume`, `value`, `remarks`, `status`, `created_at`, `updated_at`) VALUES
(12, 13, '1', 'Forest Product', 'Antipolo Lumber', '11 pcs', 2.000, 4.000, 8.000, NULL, '88 Bd.ft', 2640.00, 'Confiscated during operation', 'Seized', '2026-03-04 18:00:26', '2026-03-25 08:48:48'),
(13, 13, '2', 'Forest Product', 'Antipolo Lumber', '11 pcs', 2.000, 4.000, 8.000, NULL, '88 Bd.ft', NULL, 'Confiscated during operation', 'Seized', '2026-03-04 18:00:26', '2026-03-25 08:48:19'),
(14, 14, '1', 'Forest Product', 'Mahogany Lumber', '20 pcs', 2.000, 8.000, 10.000, NULL, '120 Bd.ft', 8500.00, 'No transport permit', 'Confiscated', '2026-03-04 18:12:10', '2026-03-25 08:47:44'),
(15, 14, '2', 'Equipment', 'Chainsaw (Husqvarna)', '1 unit', NULL, NULL, NULL, NULL, '', NULL, 'Used for illegal cutting', 'Seized', '2026-03-04 18:12:10', '2026-03-24 11:43:47'),
(16, 15, '1', 'Equipment', 'Narra Lumber', '15 pcs', NULL, NULL, NULL, NULL, '15 pcs', 15.00, 'No transport permit', 'Confiscated', '2026-03-15 06:41:28', '2026-03-15 06:41:28'),
(17, 15, '2', 'Equipment', 'Chainsaw (Husqvarna)', '1 unit', NULL, NULL, NULL, NULL, '', 15000.00, 'Used for illegal cutting', 'Seized', '2026-03-15 06:41:28', '2026-03-15 06:41:28'),
(19, 17, '1', 'Forest Product', 'Lauan lumber', '25', 2.000, 6.000, 8.000, 200.000, '200.00 Bd.ft.', 25000.00, '', 'Seized', '2026-03-24 13:53:24', '2026-03-24 13:53:24');

-- --------------------------------------------------------

--
-- Table structure for table `spot_report_persons`
--

CREATE TABLE `spot_report_persons` (
  `id` int(10) UNSIGNED NOT NULL,
  `report_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spot_report_persons`
--

INSERT INTO `spot_report_persons` (`id`, `report_id`, `name`, `age`, `gender`, `address`, `contact`, `role`, `status`, `created_at`, `updated_at`) VALUES
(11, 13, 'Ralph Espinosa', '28', 'Male', 'Brgy 3, Buenavista Agusan del Norte', '09838725708', 'Driver', 'On Bail', '2026-03-04 18:00:26', '2026-03-04 18:00:26'),
(12, 14, 'Ronaldo Canete', '24', 'Male', 'Brgy Rizal, Buenavista, Agusan del Norte', '09765394812', 'Driver', 'Convicted', '2026-03-04 18:12:10', '2026-03-04 18:12:10'),
(13, 15, 'Juan Dela Cruz', '29', 'Male', 'Brgy. San Isidro, Cabadbaran City', '09123456789', 'Driver', 'On Bail', '2026-03-15 06:41:28', '2026-03-15 06:41:28');

-- --------------------------------------------------------

--
-- Table structure for table `spot_report_vehicles`
--

CREATE TABLE `spot_report_vehicles` (
  `id` int(10) UNSIGNED NOT NULL,
  `report_id` int(10) UNSIGNED NOT NULL,
  `plate` varchar(100) DEFAULT NULL,
  `make` varchar(255) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `engine` varchar(255) DEFAULT NULL,
  `status` varchar(64) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `spot_report_vehicles`
--

INSERT INTO `spot_report_vehicles` (`id`, `report_id`, `plate`, `make`, `color`, `owner`, `contact`, `engine`, `status`, `remarks`, `created_at`, `updated_at`) VALUES
(12, 13, '54G234', 'Toyota - Vios', 'Red', 'Ramon Dela Cruz', '09878493872', '4HF1-987654', 'Seized', 'Used to transport illegal lumber', '2026-03-04 18:00:26', '2026-03-04 18:00:26'),
(13, 14, '78H76', 'Toyota - Rush', 'White', 'Miels Flores', '09674893984', 'ENG-567823', 'Confiscated', 'Used for transporting lumber', '2026-03-04 18:12:10', '2026-03-04 18:12:10'),
(14, 15, 'ABC 2345', 'Mitsubishi L300', 'White', 'Pedro Santos', '09647283918', 'ENG-45872', 'Confiscated', 'Used for transporting lumber', '2026-03-15 06:41:28', '2026-03-15 06:41:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `office_unit` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `role` enum('Admin','Enforcement Officer','Enforcer','Property Custodian','Office Staff') NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `contact_number`, `office_unit`, `profile_picture`, `role`, `status`, `created_at`, `updated_at`, `last_login`, `position`) VALUES
(1, 'ashmencamid1@gmail.com', '$2y$10$S1jkS8/CThELVNlaGZ3WTOc3yXjmivIO6kYwqsdQh47I43gL2NRSW', 'PJ Mordeno', '09090481882', 'Planning Unit', 'public/uploads/user_1_1772616918_63939eba.png', 'Admin', 1, '2026-03-04 09:34:53', '2026-04-03 02:38:31', '2026-04-03 02:38:31', 'ICT Focal'),
(22, 'joelcaluya@gmail.com', '$2y$10$2dB.mvuVTZAZSKaHrrCx2.VyvHFB9L26xwUwRUCrRNMtm2t0PzOFe', 'Joel Andoy Caluya', '09753425462', 'NGP', 'public/uploads/1772616976_5934b59d.png', 'Enforcement Officer', 1, '2026-03-04 09:36:16', '2026-04-03 02:50:41', '2026-04-03 02:50:41', 'Administrative Assistant II'),
(23, 'richian@gmail.com', '$2y$10$nmrcGojk4oavy1eyxGJ7mOyq0TT1wfuUTLXiaZdtfCVnp8WtzQ0Cq', 'Rich Ian James Illut Balaido', '09647281928', 'Antongalon ENR Monitoring Information and Assistance Center', 'public/uploads/user_23_1772617203_578c3f6f.png', 'Enforcer', 1, '2026-03-04 09:38:59', '2026-04-03 01:29:11', '2026-04-03 01:29:11', 'Supply Officer'),
(24, 'joryncagulangan@gmail.com', '$2y$10$JKroM56hHyuaql2W3JsQUO9447yxKuBmncxO3L99.d3V/oS/Hz/vO', 'Joryn Cagulangan', '09848374389', 'Support Unit', 'public/uploads/user_24_1772617283_fcfd96cb.png', 'Property Custodian', 1, '2026-03-04 09:41:14', '2026-04-03 01:56:36', '2026-04-03 01:56:36', 'Supply Officer'),
(25, 'jayivan@gmail.com', '$2y$10$S1jkS8/CThELVNlaGZ3WTOc3yXjmivIO6kYwqsdQh47I43gL2NRSW', 'Jay Ivan Ebarzabal Tadena', '09090481882', 'Survey and Mapping Unit', 'public/uploads/user_25_1772617390_85ad6de1.png', 'Office Staff', 1, '2026-03-04 09:42:58', '2026-04-03 01:57:22', '2026-04-03 01:57:22', 'Office Staff'),
(26, 'ashycamid@gmail.com', '$2y$10$7pCIMOlqCYTl79uPSrPuN.laABfrSi2xKJcH676sLJP.WMx1.3tLG', 'Ashmen Sultan Camid', '09090481884', 'Planning Unit', 'public/uploads/user_26_1772617500_ae5ab879.png', 'Enforcer', 1, '2026-03-04 09:44:29', '2026-04-03 01:29:28', '2026-04-03 01:29:28', 'Administrative Assistant II'),
(27, 'joanjumawid@gmail.com', '$2y$10$Pazkdqjz5N9neWmx5w.W8Os2QVV.sRhKRLKtZ1NQ5zkaWlXWBON5u', 'Joan P. Jumawid', '09090481883', 'Planning Unit', 'public/uploads/user_27_1773993937_5f026444.png', 'Admin', 1, '2026-03-04 09:34:53', '2026-03-24 01:24:38', '2026-03-24 01:24:38', 'ICT Focal'),
(28, 'ronnelfalo@gmail.com', '$2y$10$h6Ij1pWnwdhEUWTaUq.DyODiZF8/RVXMeeE6wQly1uzwKM4vE/2lS', 'Ronnel A. Falo', '09647123412', 'Licensing and Permitting Unit', 'public/uploads/1772865085_cba9525e.png', 'Enforcement Officer', 1, '2026-03-07 06:31:25', '2026-03-23 04:33:31', NULL, 'Administrative Assistant II'),
(29, 'poisonflowerloque@gmail.com', '$2y$10$Qpg3YZ6uyLj14HJTdQXGJu.PuwGhRCwnpEOQrvdtWh0QqtCWKaY5e', 'Ivy Asio Loque', '09302534580', 'Lumbocan ENR Monitoring Information and Assistance Center', 'public/uploads/user_29_1774332946_c2d8737b.png', 'Enforcer', 1, '2026-03-19 07:56:18', '2026-03-24 06:15:46', NULL, 'forest ranger');

-- --------------------------------------------------------

--
-- Table structure for table `user_name_parts`
--

CREATE TABLE `user_name_parts` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL DEFAULT '',
  `middle_name` varchar(255) NOT NULL DEFAULT '',
  `last_name` varchar(255) NOT NULL DEFAULT '',
  `suffix` varchar(50) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_name_parts`
--

INSERT INTO `user_name_parts` (`user_id`, `first_name`, `middle_name`, `last_name`, `suffix`, `created_at`, `updated_at`) VALUES
(22, 'Joel', 'Andoy', 'Caluya', '', '2026-03-04 09:36:16', '2026-03-07 06:39:08'),
(23, 'Rich Ian James', 'Illut', 'Balaido', '', '2026-03-04 09:38:59', '2026-03-20 03:45:48'),
(24, 'Joryn', '', 'Cagulangan', '', '2026-03-04 09:41:14', '2026-03-04 09:41:14'),
(25, 'Jay Ivan', 'Ebarzabal', 'Tadena', '', '2026-03-04 09:42:58', '2026-03-04 09:42:58'),
(26, 'Ashmen', 'Sultan', 'Camid', '', '2026-03-04 09:44:29', '2026-03-04 09:44:29'),
(28, 'Ronnel', 'A.', 'Falo', '', '2026-03-07 06:31:25', '2026-03-07 06:31:25'),
(29, 'Ivy', 'Asio', 'Loque', '', '2026-03-19 07:56:18', '2026-03-23 04:35:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipment_ibfk_1` (`accountable_person_id`),
  ADD KEY `equipment_ibfk_2` (`actual_user_id`),
  ADD KEY `fk_equipment_created_by` (`created_by`),
  ADD KEY `fk_equipment_updated_by` (`updated_by`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `custodian_id` (`custodian_id`);

--
-- Indexes for table `service_requests`
--
ALTER TABLE `service_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_ticket_no` (`ticket_no`),
  ADD KEY `idx_created_by` (`created_by`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `service_request_actions`
--
ALTER TABLE `service_request_actions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_service_request_id` (`service_request_id`);

--
-- Indexes for table `spot_reports`
--
ALTER TABLE `spot_reports`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference_no` (`reference_no`),
  ADD KEY `fk_spot_reports_submitted_by` (`submitted_by`);

--
-- Indexes for table `spot_report_files`
--
ALTER TABLE `spot_report_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `spot_report_items`
--
ALTER TABLE `spot_report_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `spot_report_persons`
--
ALTER TABLE `spot_report_persons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `spot_report_vehicles`
--
ALTER TABLE `spot_report_vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_name_parts`
--
ALTER TABLE `user_name_parts`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `properties`
--
ALTER TABLE `properties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_requests`
--
ALTER TABLE `service_requests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `service_request_actions`
--
ALTER TABLE `service_request_actions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `spot_reports`
--
ALTER TABLE `spot_reports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `spot_report_files`
--
ALTER TABLE `spot_report_files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `spot_report_items`
--
ALTER TABLE `spot_report_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `spot_report_persons`
--
ALTER TABLE `spot_report_persons`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `spot_report_vehicles`
--
ALTER TABLE `spot_report_vehicles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `equipment`
--
ALTER TABLE `equipment`
  ADD CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`accountable_person_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `equipment_ibfk_2` FOREIGN KEY (`actual_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_equipment_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_equipment_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`custodian_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `service_request_actions`
--
ALTER TABLE `service_request_actions`
  ADD CONSTRAINT `fk_sra_request` FOREIGN KEY (`service_request_id`) REFERENCES `service_requests` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `spot_reports`
--
ALTER TABLE `spot_reports`
  ADD CONSTRAINT `fk_spot_reports_submitted_by` FOREIGN KEY (`submitted_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `spot_report_files`
--
ALTER TABLE `spot_report_files`
  ADD CONSTRAINT `fk_srf_report` FOREIGN KEY (`report_id`) REFERENCES `spot_reports` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `spot_report_items`
--
ALTER TABLE `spot_report_items`
  ADD CONSTRAINT `fk_sri_report` FOREIGN KEY (`report_id`) REFERENCES `spot_reports` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `spot_report_persons`
--
ALTER TABLE `spot_report_persons`
  ADD CONSTRAINT `fk_srp_report` FOREIGN KEY (`report_id`) REFERENCES `spot_reports` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `spot_report_vehicles`
--
ALTER TABLE `spot_report_vehicles`
  ADD CONSTRAINT `fk_srv_report` FOREIGN KEY (`report_id`) REFERENCES `spot_reports` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_name_parts`
--
ALTER TABLE `user_name_parts`
  ADD CONSTRAINT `fk_user_name_parts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
