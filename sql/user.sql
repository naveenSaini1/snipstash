-- Create the user table

CREATE TABLE IF NOT EXISTS jdbc.user (
    u_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bio TEXT,
    age INTEGER CHECK (age >= 0),
    password TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL
);
