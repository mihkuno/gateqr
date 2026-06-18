-- Create user table
CREATE TABLE `user` (
    `auto_id` INT AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`auto_id`)
) ENGINE=InnoDB;

-- Create department table
CREATE TABLE `department` (
    `auto_id` INT AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`auto_id`)
) ENGINE=InnoDB;

-- Create registration table
CREATE TABLE `registration` (
    `auto_id` INT AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `department_id` INT NOT NULL,
    `id` CHAR(10) NULL,
    `role` ENUM('student', 'employee', 'visitor') NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `vehicle_make` VARCHAR(100) NOT NULL,
    `vehicle_plate` VARCHAR(50) NOT NULL,
    `is_owner` BOOLEAN NOT NULL,
    `status` ENUM('dept_val', 'osa_val', 'osa_dist', 'revoked', 'rejected', 'expired') NOT NULL,
    `invalid_reason` VARCHAR(255) NULL,
    `dept_val_at` TIMESTAMP NULL,
    `osa_val_at` TIMESTAMP NULL,
    `osa_dist_at` TIMESTAMP NULL,
    `dist_sched` DATETIME NULL,
    `expires_at` TIMESTAMP NULL,
    `revoked_at` TIMESTAMP NULL,
    `rejected_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `doc_id` VARCHAR(255) NULL,
    `doc_load` VARCHAR(255) NULL,
    `doc_qr` VARCHAR(255) NULL,
    `doc_or` VARCHAR(255) NOT NULL,
    `doc_cr` VARCHAR(255) NOT NULL,
    `doc_license` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`auto_id`),
    CONSTRAINT `fk_registration_user` 
        FOREIGN KEY (`user_id`) REFERENCES `user` (`auto_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_registration_department` 
        FOREIGN KEY (`department_id`) REFERENCES `department` (`auto_id`) 
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create entrylog table
CREATE TABLE `entrylog` (
    `auto_id` INT AUTO_INCREMENT,
    `registration_id` INT NOT NULL,
    `in` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `out` TIMESTAMP NULL,
    PRIMARY KEY (`auto_id`),
    CONSTRAINT `fk_entrylog_registration` 
        FOREIGN KEY (`registration_id`) REFERENCES `registration` (`auto_id`) 
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;