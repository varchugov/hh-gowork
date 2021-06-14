INSERT INTO students (username) VALUES ('Artur');
INSERT INTO students (username) VALUES ('BorisTheBlade');
INSERT INTO students (username) VALUES ('AnotherStudent');


-- this is salted hash of 'test' password
-- we should not manually set id here because the autoincrement sequence in DB does not gets updated in this case
-- and subsequents inserts through API are failed
INSERT INTO users (email, password_hash, current_user_step) VALUES ('test@example.com', '$2a$10$S2cQSOY4lWkYBNJX5hRQtulN7NygiUDDveBNTmhZcesqByDquUsrS', 2);

