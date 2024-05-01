CREATE DATABASE ofsfood;
use ofsfood;

CREATE TABLE users (
  id integer PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  user VARCHAR(255) NOT NULL UNIQUE,
  pass VARCHAR(255) NOT NULL,
  usertype integer NOT NULL,
  selectedAddress integer NOT NULL
);

CREATE TABLE locations (
  usersID integer NOT NULL,
  id integer NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  stte VARCHAR(255) NOT NULL,
  zipc VARCHAR(255) NOT NULL
);

CREATE TABLE cart (
  user integer NOT NULL,
  id integer NOT NULL,
  quantity integer NOT NULl
);

CREATE TABLE orderItems (
  orderNum integer NOT NULL,
  user integer NOT NULL,
  id integer NOT NULL,
  quantity integer NOT NULl
);

CREATE TABLE orders (
  orderNum integer NOT NULL,
  user integer NOT NULL,
  card integer NOT NULL,
  name VARCHAR(225) NOT NULL,
  experation integer NOT NULL,
  cvc integer NOT NULL,
  street VARCHAR(225) NOT NULL,
  city VARCHAR(225) NOT NULL,
  state VARCHAR(225) NOT NULL,
  zip integer NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE category (
  id integer PRIMARY KEY AUTO_INCREMENT,
  category VARCHAR(225) NOT NULL UNIQUE,
  image VARCHAR(225) NOT NULL
);

INSERT INTO category (category, image)
VALUES
('Fruits', 'Fruits');

INSERT INTO category (category, image)
VALUES
('Vegetables', 'Vegetables');

INSERT INTO category (category, image)
VALUES
('Dairy', 'Dairy');

INSERT INTO category (category, image)
VALUES
('Protein', 'Protein');

INSERT INTO category (category, image)
VALUES
('Canned', 'Canned');

INSERT INTO category (category, image)
VALUES
('Beverages', 'Beverages');

INSERT INTO category (category, image)
VALUES
('Deserts', 'Deserts');

CREATE TABLE inventory (
  id integer PRIMARY KEY AUTO_INCREMENT,
  category VARCHAR(225) NOT NULL,
  name VARCHAR(225) NOT NULL UNIQUE,
  image VARCHAR(225) NOT NULL,
  description VARCHAR(225) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  weight integer NOT NULL,
  stock integer NOT NULL
);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Fruits', 'Apple', 'Apple', 'Yummy Sweet Apple', 2.42, 160, 45);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Fruits', 'Orange', 'Orange', 'Slightly Sour Orange', 2.21, 210, 52);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Fruits', 'Lemon', 'Lemon', 'Much Similar To The Apple, But Does Not Taste As Good', 1.20, 115, 54);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Fruits', 'Grapes', 'Grapes', 'Make some juice', 1.20, 115, 54);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Vegetables', 'Lettuce', 'Lettuce', 'Great On Sandwiches', 3.24, 230, 43);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Vegetables', 'Zucchini', 'Zucchini', 'Dont Ever Purchace A Zucchini', 9999999.99, 999999999, 999999999);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Vegetables', 'Bell Pepper', 'Bell Pepper', 'Mix this in a Salad', 9999999.99, 999999999, 999999999);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Vegetables', 'Carrot', 'Carrot', 'Show you Cutlery skills today', 9999999.99, 999999999, 999999999);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Dairy', 'Milk', 'Milk', 'Healthy 2% Fat Milk', 3.95, 310, 26);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Dairy', 'Mozerella', 'Mozerella Cheese', 'Healthy Fat', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Dairy', 'Yogurt', 'Yogurt', 'Good Diet Food', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Dairy', 'Butter', 'Butter', 'Bring taste to life', 8.26, 300, 32);


INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Canned', 'Pineapple', 'Pineapple', 'Get the best flavor here', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Canned', 'Pumpkin', 'Pumpkin', 'Make the best pastries', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Canned', 'Beans', 'Canned Beans', 'Dive into the freshest gravy', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Canned', 'Beets', 'Sliced Beets', 'Fresh cuts for the Salad coming up', 8.26, 300, 32);



INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Beverages', 'Fanta', 'Fanta', 'Take away the heat with Fanta', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Beverages', 'Sprite', 'Sprite', 'Get the best drink with your lunch', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Beverages', 'Gatorade', 'Gatorade', 'Dive into the freshest gravy', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Beverages', 'Red Wine', 'Red Wine', 'Candlelight dinner here we go', 8.26, 300, 32);


INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Deserts', 'Ice Cream', 'Ice Cream', 'Miscellaneous Flavored Frozen Treat', 8.26, 290, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Deserts', 'Brownies', 'Brownies', 'Soft and crafted to melt your mouth', 8.26, 290, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Deserts', 'Muffins', 'Muffins', 'Take some on the go', 8.26, 290, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
('Deserts', 'Oreos', 'Oreos', 'A light snack for the sweetest', 8.26, 290, 32);
