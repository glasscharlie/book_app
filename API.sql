DROP TABLE IF EXISTS apiData;

CREATE TABLE apiData (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    isbn VARCHAR(255),
    image_url VARCHAR(255),
    book_description VARCHAR(255),
    bookshelf VARCHAR(255)
);