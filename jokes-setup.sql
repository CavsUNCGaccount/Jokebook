-- SQLite schema to store jokes data

-- Categories table to store joke categories
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Jokes table to store joke setup and delivery, linked to categories
CREATE TABLE jokes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setup TEXT NOT NULL,
    delivery TEXT NOT NULL,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert category data
INSERT INTO categories (name) VALUES ('funnyJoke');
INSERT INTO categories (name) VALUES ('lameJoke');

-- Insert funny jokes
INSERT INTO jokes (setup, delivery, category_id)
VALUES ('Why did the student eat his homework?', 'Because the teacher told him it was a piece of cake!', 1);
INSERT INTO jokes (setup, delivery, category_id)
VALUES ('What kind of tree fits in your hand?', 'A palm tree', 1);
INSERT INTO jokes (setup, delivery, category_id)
VALUES ('What is worse than raining cats and dogs?', 'Hailing taxis', 1);

-- Insert lame jokes
INSERT INTO jokes (setup, delivery, category_id)
VALUES ('Which bear is the most condescending?', 'Pan-DUH', 2);
INSERT INTO jokes (setup, delivery, category_id)
VALUES ('What would the Terminator be called in his retirement?', 'The Exterminator', 2);
