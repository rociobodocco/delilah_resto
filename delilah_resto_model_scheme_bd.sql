-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema delilah_resto_model
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema delilah_resto_model
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `delilah_resto_model` DEFAULT CHARACTER SET utf8 ;
USE `delilah_resto_model` ;

-- -----------------------------------------------------
-- Table `delilah_resto_model`.`payoptions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah_resto_model`.`payoptions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `active` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah_resto_model`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah_resto_model`.`rol` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah_resto_model`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah_resto_model`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(200) NOT NULL,
  `name` VARCHAR(450) NOT NULL,
  `lastname` VARCHAR(450) NOT NULL,
  `phone` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `adress` VARCHAR(450) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `rol_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_rol1_idx` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_rol1`
    FOREIGN KEY (`rol_id`)
    REFERENCES `delilah_resto_model`.`rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 74
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah_resto_model`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah_resto_model`.`orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `total_price` DECIMAL(6,2) NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `users_id` INT(11) NOT NULL,
  `payoptions_id` INT(11) NOT NULL,
  `state` ENUM('nuevo', 'confirmado', 'finalizado', 'cancelado') NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orders_payoptions1_idx` (`payoptions_id` ASC) VISIBLE,
  INDEX `fk_orders_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_orders_payoptions1`
    FOREIGN KEY (`payoptions_id`)
    REFERENCES `delilah_resto_model`.`payoptions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `delilah_resto_model`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 39
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah_resto_model`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah_resto_model`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `price` DECIMAL(5,2) NOT NULL,
  `image` VARCHAR(450) NULL DEFAULT NULL,
  `active` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `delilah_resto_model`.`orders_has_products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah_resto_model`.`orders_has_products` (
  `orders_id` INT(11) NOT NULL,
  `products_id` INT(11) NOT NULL,
  `quantity` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`orders_id`, `products_id`),
  INDEX `fk_orders_has_products_products1_idx` (`products_id` ASC) VISIBLE,
  INDEX `fk_orders_has_products_orders1_idx` (`orders_id` ASC) VISIBLE,
  CONSTRAINT `fk_orders_has_products_orders1`
    FOREIGN KEY (`orders_id`)
    REFERENCES `delilah_resto_model`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_has_products_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `delilah_resto_model`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
