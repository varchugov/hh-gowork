CREATE TABLE IF NOT EXISTS users
(
	id serial PRIMARY KEY,
	username VARCHAR(127),
	email VARCHAR(127) NOT NULL,
	password_hash VARCHAR(127) NOT NULL,
	session_token VARCHAR(127),
	current_user_step INTEGER REFERENCES steps (id)
);

CREATE TABLE IF NOT EXISTS users_correct_answers
(
	id serial PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users (id),
	step_id INTEGER NOT NULL REFERENCES steps (id),
	user_answer JSONB NOT NULL
);
