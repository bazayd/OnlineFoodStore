CREATE DATABASE ofsfood;
use ofsfood;

CREATE TABLE users (
  id integer PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  user VARCHAR(255) NOT NULL UNIQUE,
  pass VARCHAR(255) NOT NULL,
  addr VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  stte VARCHAR(255) NOT NULL,
  zipc VARCHAR(255) NOT NULL,
  usertype integer NOT NULL
);

INSERT INTO users (email, user, pass, addr, city, stte, zipc, usertype)
VALUES 
('joe@smith.com', 'joe', 'smith', '111 Average Road', 'Normalton', 'California', '11111', 1);

CREATE TABLE inventory (
  id integer PRIMARY KEY AUTO_INCREMENT,
  category integer NOT NULL,
  name VARCHAR(225) NOT NULL UNIQUE,
  image VARCHAR(225) NOT NULL,
  description VARCHAR(225) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  weight integer NOT NULL,
  stock integer NOT NULL
);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(1, 'Apple', 'Apple', 'Yummy Sweet Apple', 2.42, 160, 45);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(1, 'Orange', 'Orange', 'Slightly Sour Orange', 2.21, 210, 52);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(1, 'Lemon', 'Lemon', 'Much Similar To The Apple, But Does Not Taste As Good', 1.20, 115, 54);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(2, 'Lettuce', 'Lettuce', 'Great On Sandwiches', 3.24, 230, 43);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(2, 'Zucchini', 'Zucchini', 'Dont Ever Purchace A Zucchini', 9999999.99, 999999999, 999999999);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(3, 'Milk', 'Milk', 'Juice From Cows', 3.95, 310, 26);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(3, 'Ice Cream', 'Ice Cream', 'Miscellaneous Flavored Frozen Treat', 8.26, 290, 32);