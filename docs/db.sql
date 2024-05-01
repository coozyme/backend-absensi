
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
);

CREATE TABLE IF NOT EXISTS `users` (
  `id`int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` tinyint(1) DEFAULT '0',
  `role_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
);

CREATE TABLE IF NOT EXISTS `absensi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `clock_in` TIME,
  `clock_out` TIME,
  `longitude_clockin` DECIMAL(10, 6),
  `latitude_clockin` DECIMAL(10, 6),
  `longitude_clockout` DECIMAL(10, 6),
  `latitude_clockout` DECIMAL(10, 6),
  `photo_clockin` text,
  `photo_clockout` text,
  `created_at` DATE DEFAULT (CURRENT_DATE),
  `deleted_at` DATE DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);


CREATE TABLE `cuti` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `limit` int NOT NULL DEFAULT 12,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `request_cuti` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cuti_id` int NOT NULL,
  `type_cuti` ENUM('FULL DAY','HALF DAY AFTER BREAK','HALF DAY BEFORE BREAK'),
  `status_cuti` ENUM('PENDING','APPROVED','REJECTED','CANCELLED'),
  `reason` text,
  `start_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`cuti_id`) REFERENCES `cuti` (`id`)
);


INSERT INTO roles (title) VALUES ('Admin Personalia'), ('Manager'), ('Kepala Bagian'), ('Karyawan');
