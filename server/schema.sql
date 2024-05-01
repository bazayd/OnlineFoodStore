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
  totalPrice DECIMAL(10, 2) NOT NULL,
  totalCount integer NOT NULL,
  card VARCHAR(225) NOT NULL,
  name VARCHAR(225) NOT NULL,
  experation VARCHAR(225) NOT NULL,
  cvc VARCHAR(225) NOT NULL,
  street VARCHAR(225) NOT NULL,
  city VARCHAR(225) NOT NULL,
  state VARCHAR(225) NOT NULL,
  zip VARCHAR(225) NOT NULL,
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
('Fruits', 'Apple', 'Apple', 'Sweet and Yummy', 1.99, 150, 100),
('Fruits', 'Orange', 'Orange', 'Slightly Sour', 2.49, 180, 80),
('Fruits', 'Lemon', 'Lemon', 'Similar to Apple', 0.99, 80, 120),
('Fruits', 'Grapes', 'Grapes', 'Great for Juice', 3.99, 250, 60),
('Vegetables', 'Lettuce', 'Lettuce', 'Perfect for Sandwiches', 2.49, 200, 90),
('Vegetables', 'Zucchini', 'Zucchini', 'Not Recommended', 1.79, 300, 40),
('Vegetables', 'Bell Pepper', 'Bell Pepper', 'Great in Salads', 2.99, 180, 70),
('Vegetables', 'Carrot', 'Carrot', 'Ideal for Cooking', 1.29, 120, 110),
('Dairy', 'Milk', 'Milk', 'Healthy 2% Fat', 2.99, 1000, 30),
('Dairy', 'Mozerella', 'Mozerella Cheese', 'Rich in Fat', 4.49, 250, 50),
('Dairy', 'Yogurt', 'Yogurt', 'Healthy Diet', 1.79, 200, 80),
('Dairy', 'Butter', 'Butter', 'Enhances Taste', 3.29, 250, 60),
('Canned', 'Pineapple', 'Pineapple', 'Delicious Flavor', 2.99, 500, 40),
('Canned', 'Pumpkin', 'Pumpkin', 'Ideal for Pastries', 1.99, 400, 70),
('Canned', 'Beans', 'Canned Beans', 'Freshest Gravy', 1.49, 350, 90),
('Canned', 'Beets', 'Sliced Beets', 'Fresh Salad Cuts', 1.79, 300, 80),
('Beverages', 'Fanta', 'Fanta', 'Refreshing Heat Away', 1.99, 500, 60),
('Beverages', 'Sprite', 'Sprite', 'Perfect with Lunch', 1.99, 500, 60),
('Beverages', 'Gatorade', 'Gatorade', 'Fresh and Energizing', 2.49, 600, 50),
('Beverages', 'Red Wine', 'Red Wine', 'Romantic Dinner Choice', 8.99, 750, 20),
('Deserts', 'Ice Cream', 'Ice Cream', 'Assorted Flavors', 3.99, 500, 40),
('Deserts', 'Brownies', 'Brownies', 'Melts in Your Mouth', 2.49, 300, 70),
('Deserts', 'Muffins', 'Muffins', 'Convenient Snack', 1.79, 250, 80),
('Deserts', 'Oreos', 'Oreos', 'Perfect Sweet Snack', 1.49, 200, 90),
('Protein', 'Beef Steak', 'Beef Steak', 'Tender and Juicy', 12.99, 400, 25),
('Protein', 'Eggs', 'Eggs', 'Versatile Protein Source', 3.49, 500, 50),
('Protein', 'Turkey Breast', 'Turkey Breast', 'Lean and Flavorful', 6.99, 350, 35),
('Protein', 'Tuna Steak', 'Tuna Steak', 'Rich in Omega-3', 8.49, 300, 40);

-- Fruits
INSERT INTO inventory (category, name, image, description, price, weight, stock) VALUES
('Fruits', 'Banana', 'Banana', 'Nutritious and Energizing', 1.99, 120, 60),
('Fruits', 'Strawberry', 'Strawberry', 'Sweet and Juicy', 3.49, 200, 40),
('Fruits', 'Watermelon', 'Watermelon', 'Perfect for Summer', 5.99, 5000, 20),
('Fruits', 'Peach', 'Peach', 'Soft and Fragrant', 2.99, 150, 50),
('Fruits', 'Mango', 'Mango', 'Exotic and Delicious', 4.99, 300, 30),
('Fruits', 'Kiwi', 'Kiwi', 'Tangy and Refreshing', 2.49, 100, 70),
('Fruits', 'Grapefruit', 'Grapefruit', 'Tart and Citrusy', 1.79, 300, 45),
('Fruits', 'Cherry', 'Cherry', 'Perfect for Snacking', 3.99, 250, 55),
('Fruits', 'Pear', 'Pear', 'Crisp and Sweet', 2.79, 180, 65);

-- Vegetables
INSERT INTO inventory (category, name, image, description, price, weight, stock) VALUES
('Vegetables', 'Broccoli', 'Broccoli', 'Nutrient-Rich Superfood', 2.99, 300, 40),
('Vegetables', 'Cucumber', 'Cucumber', 'Cool and Refreshing', 1.49, 200, 60),
('Vegetables', 'Spinach', 'Spinach', 'Packed with Iron', 2.49, 150, 50),
('Vegetables', 'Tomato', 'Tomato', 'Versatile Culinary Ingredient', 0.99, 100, 70),
('Vegetables', 'Onion', 'Onion', 'Adds Depth to Any Dish', 1.29, 120, 80),
('Vegetables', 'Celery', 'Celery', 'Crunchy and Low-Calorie', 1.79, 180, 55),
('Vegetables', 'Cabbage', 'Cabbage', 'Rich in Vitamin C', 1.99, 250, 45),
('Vegetables', 'Potato', 'Potato', 'Versatile Staple Food', 1.19, 200, 75);

-- Dairy
INSERT INTO inventory (category, name, image, description, price, weight, stock) VALUES
('Dairy', 'Cheddar Cheese', 'Cheddar Cheese', 'Sharp and Flavorful', 5.99, 200, 30),
('Dairy', 'Almond Milk', 'Almond Milk', 'Dairy-Free Alternative', 3.49, 1000, 40),
('Dairy', 'Greek Yogurt', 'Greek Yogurt', 'Creamy and Protein-Packed', 4.29, 500, 50),
('Dairy', 'Cottage Cheese', 'Cottage Cheese', 'Light and Tangy', 3.99, 300, 60),
('Dairy', 'Whipping Cream', 'Whipping Cream', 'Perfect for Desserts', 2.79, 250, 35),
('Dairy', 'Soy Milk', 'Soy Milk', 'Plant-Based Nutrition', 3.99, 1000, 40),
('Dairy', 'Sour Cream', 'Sour Cream', 'Creamy Condiment', 1.99, 200, 45),
('Dairy', 'Buttermilk', 'Buttermilk', 'Tangy and Refreshing', 2.49, 500, 55),
('Dairy', 'Feta Cheese', 'Feta Cheese', 'Salty and Tangy', 4.99, 200, 25);

-- Canned
INSERT INTO inventory (category, name, image, description, price, weight, stock) VALUES
('Canned', 'Corn', 'Corn', 'Sweet and Tender', 1.99, 350, 40),
('Canned', 'Peas', 'Peas', 'Delicate and Green', 1.49, 300, 60),
('Canned', 'Green Beans', 'Green Beans', 'Crisp and Flavorful', 1.79, 350, 50),
('Canned', 'Tomato Sauce', 'Tomato Sauce', 'Savory Pasta Sauce', 2.49, 500, 70),
('Canned', 'Peaches', 'Peaches', 'Summery and Sweet', 2.99, 450, 30),
('Canned', 'Pears', 'Pears', 'Tender and Juicy', 2.79, 400, 40),
('Canned', 'Tuna', 'Tuna', 'Versatile Protein', 1.99, 150, 60);

-- Beverages
INSERT INTO inventory (category, name, image, description, price, weight, stock) VALUES
('Beverages', 'Green Tea', 'Green Tea', 'Antioxidant Powerhouse', 3.49, 200, 40),
('Beverages', 'Orange Juice', 'Orange Juice', 'Freshly Squeezed', 4.99, 1000, 50),
('Beverages', 'Apple Juice', 'Apple Juice', 'Naturally Sweet', 3.99, 750, 30),
('Beverages', 'Coconut Water', 'Coconut Water', 'Hydrating and Refreshing', 2.99, 500, 40),
('Beverages', 'Lemonade', 'Lemonade', 'Tart and Refreshing', 1.99, 600, 60),
('Beverages', 'Iced Tea', 'Iced Tea', 'Classic Refreshment', 2.49, 500, 45),
('Beverages', 'Cranberry Juice', 'Cranberry Juice', 'Tangy and Tart', 3.49, 750, 55),
('Beverages', 'Ginger Beer', 'Ginger Beer', 'Spicy and Refreshing', 2.79, 330, 25),
('Beverages', 'Energy Drink', 'Energy Drink', 'Boost Your Energy', 2.99, 500, 35);

-- Deserts
INSERT INTO inventory (category, name, image, description, price, weight, stock) VALUES
('Deserts', 'Chocolate', 'Chocolate', 'Decadent and Rich', 4.99, 200, 30),
('Deserts', 'Vanilla Ice Cream', 'Vanilla Ice Cream', 'Classic Treat', 3.49, 500, 40),
('Deserts', 'Chocolate Chip Cookies', 'Chocolate Chip Cookies', 'Homemade Goodness', 2.99, 300, 50),
('Deserts', 'Cheesecake', 'Cheesecake', 'Creamy and Indulgent', 6.99, 600, 60),
('Deserts', 'Cupcakes', 'Cupcakes', 'Fun and Festive', 2.49, 150, 35),
('Deserts', 'Doughnuts', 'Doughnuts', 'Sweet and Doughy', 1.99, 200, 45),
('Deserts', 'Gelato', 'Gelato', 'Italian Delight', 5.99, 400, 25),
('Deserts', 'Pudding Cups', 'Pudding Cups', 'Creamy and Delicious', 2.79, 150, 30),
('Deserts', 'Fruit Tart', 'Fruit Tart', 'Colorful and Fresh', 4.49, 300, 35);

-- Protein
INSERT INTO inventory (category, name, image, description, price, weight, stock) VALUES
('Protein', 'Chicken Breast', 'Chicken Breast', 'Lean and Versatile', 7.99, 400, 20),
('Protein', 'Salmon Fillet', 'Salmon Fillet', 'Rich in Omega-3', 9.99, 300, 40),
('Protein', 'Tofu', 'Tofu', 'Plant-Based Protein', 3.49, 250, 50),
('Protein', 'Pork Chop', 'Pork Chop', 'Juicy and Flavorful', 6.49, 350, 30),
('Protein', 'Lamb Chops', 'Lamb Chops', 'Tender and Succulent', 10.99, 400, 25),
('Protein', 'Quinoa', 'Quinoa', 'Complete Protein Source', 5.99, 300, 35),
('Protein', 'Black Beans', 'Black Beans', 'Fiber-Rich Protein', 2.49, 400, 45),
('Protein', 'Soybeans', 'Soybeans', 'Plant-Based Protein', 4.99, 350, 50),
('Protein', 'Ground Beef', 'Ground Beef', 'Versatile Cooking Ingredient', 8.99, 500, 30),
('Protein', 'Turkey Burger', 'Turkey Burger', 'Lean Alternative to Beef', 6.49, 400, 40);
