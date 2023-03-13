DROP DATABASE IF EXISTS employee_info_db;

CREATE DATABASE employee_info_db;

USE employee_info_db;

CREATE TABLE department (

id INT NOT NULL AUTO_INCREMENT,

name VARCHAR(35) NOT NULL,

PRIMARY KEY(id)

);

CREATE TABLE role (

id INT NOT NULL AUTO_INCREMENT,

title VARCHAR(35) NOT NULL,

salary DECIMAL(10,2) NOT NULL,

department_id INT NOT NULL,

PRIMARY KEY (id)

);

CREATE TABLE employee (

id INT NOT NULL AUTO_INCREMENT,

first_name VARCHAR(35) NOT NULL,

last_name VARCHAR(35) NOT NULL,

role_id INT NOT NULL,

manager_id INT,

PRIMARY KEY (id)

);
