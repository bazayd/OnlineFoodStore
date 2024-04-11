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
(1, 'Grapes', 'Grapes', 'Make some juice', 1.20, 115, 54);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(2, 'Lettuce', 'Lettuce', 'Great On Sandwiches', 3.24, 230, 43);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(2, 'Zucchini', 'Zucchini', 'Dont Ever Purchace A Zucchini', 9999999.99, 999999999, 999999999);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(2, 'Bell Pepper', 'Bell Pepper', 'Mix this in a Salad', 9999999.99, 999999999, 999999999);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(2, 'Carrot', 'Carrot', 'Show you Cutlery skills today', 9999999.99, 999999999, 999999999);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(3, 'Milk', 'Milk', 'Healthy 2% Fat Milk', 3.95, 310, 26);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(3, 'Mozerella', 'Mozerella Cheese', 'Healthy Fat', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(3, 'Yogurt', 'Yogurt', 'Good Diet Food', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(3, 'Butter', 'Butter', 'Bring taste to life', 8.26, 300, 32);


INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(5, 'Pineapple', 'Pineapple', 'Get the best flavor here', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(5, 'Pumpkin', 'Pumpkin', 'Make the best pastries', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(5, 'Canned Beans', 'Canned Beans', 'Dive into the freshest gravy', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(5, 'Sliced Beets', 'Sliced Beets', 'Fresh cuts for the Salad coming up', 8.26, 300, 32);



INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(6, 'Fanta', 'Fanta', 'Take away the heat with Fanta', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(6, 'Sprite', 'Sprite', 'Get the best drink with your lunch', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(6, 'Gatorade', 'Gatorade', 'Dive into the freshest gravy', 8.26, 300, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(6, 'Red Wine', 'Red Wine', 'Candlelight dinner here we go', 8.26, 300, 32);


INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(7, 'Ice Cream', 'Ice Cream', 'Miscellaneous Flavored Frozen Treat', 8.26, 290, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(7, 'Brownies', 'Brownies', 'Soft and crafted to melt your mouth', 8.26, 290, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(7, 'Muffins', 'Muffins', 'Take some on the go', 8.26, 290, 32);

INSERT INTO inventory (category, name, image, description, price, weight, stock)
VALUES
(7, 'Oreos', 'Oreos', 'A light snack for the sweetest', 8.26, 290, 32);
