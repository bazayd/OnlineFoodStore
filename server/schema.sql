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
  catg integer NOT NULL,
  label VARCHAR(225) NOT NULL,
  imag VARCHAR(225) NOT NULL,
  descr VARCHAR(225) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  weit integer NOT NULL,
  stock integer NOT NULL
);

INSERT INTO inventory (catg, label, imag, descr, price, weit, stock)
VALUES
(1, 'Fuji Apple', 'Apple', 'Yummy Sweet Apple', 2.42, 160, 45);

INSERT INTO inventory (catg, label, imag, descr, price, weit, stock)
VALUES
(1, 'Orange', 'Orange', 'Slightly Sour Orange', 2.21, 210, 52);