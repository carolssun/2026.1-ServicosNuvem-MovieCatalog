CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    poster TEXT NOT NULL,
    genre VARCHAR(100) NOT NULL,
    summary TEXT NOT NULL,
    release_date DATE NOT NULL,
    duration INT NOT NULL,
    age_rating VARCHAR(20) NOT NULL,
    direction VARCHAR(255) NOT NULL,
    departure_date DATE
);