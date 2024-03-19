CREATE DATABASE accounts;
use accounts;

CREATE TABLE users (
  id integer PRIMARY KEY AUTO_INCREMENT,
  user VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  usertype integer NOT NULL
);

INSERT INTO users (user, pass, usertype)
VALUES 
('joe', 'smith', 1);

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

