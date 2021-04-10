CREATE TABLE IF NOT EXISTS chapters (
    id serial PRIMARY KEY,
    name VARCHAR(127) NOT NULL
);

CREATE TABLE IF NOT EXISTS paragraphs (
    id serial PRIMARY KEY,
    name VARCHAR(127) NOT NULL,
    chapter_id INTEGER NOT NULL,
    FOREIGN KEY (chapter_id)
          REFERENCES chapters (id)
);

CREATE TABLE IF NOT EXISTS steps (
    id serial PRIMARY KEY,
    paragraph_id INTEGER NOT NULL,
    theory TEXT NOT NULL,
    question JSONB NOT NULL,
    correct_answers JSONB,
    has_answer BOOLEAN NOT NULL,
    FOREIGN KEY (paragraph_id)
              REFERENCES paragraphs (id)
);
