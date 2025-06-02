CREATE TABLE IF NOT EXISTS jdbc.snippet (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    language VARCHAR(100),
    code TEXT NOT NULL,
    tags TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    folder_id VARCHAR(255),
    copy_count INTEGER DEFAULT 0 CHECK (copy_count >= 0),
    user_id INTEGER NOT NULL
);
