DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DEC(10,2) default 0.00,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mr.Boston", "vodka", 19.95, 20), ("Titos", "vodka", 29.95, 40), ("Absolut", "vodka", 24.95, 20), ("Jameson", "whiskey", 19.95, 30), ("Tullamore Dew", "whiskey", 49.95, 28), ("The Irishman", "whiskey", 39.95, 80), ("Bombay", "gin", 29.95, 29), ("Beefeater", "gin", 9.95, 19), ("Hendrick's", "gin", 49.95, 10), ("Grey Goose", "vodka", 19.95, 20)
