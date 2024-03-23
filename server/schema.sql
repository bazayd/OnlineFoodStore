CREATE DATABASE accounts;
use accounts;

CREATE TABLE users (
  id integer PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  user VARCHAR(255) NOT NULL,
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

CREATE DATABASE notes_app;
USE notes_app;



CREATE TABLE notes (
  id integer PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  contents TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes (title, contents)
VALUES 
('My First Note', 'A note about something'),
('My Second Note', 'A note about something else');

