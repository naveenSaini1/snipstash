CREATE TABLE IF NOT EXISTS jdbc.folder (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    snippet_length INTEGER DEFAULT 0 CHECK (snippet_length >= 0),
    user_id INTEGER NOT NULL
);