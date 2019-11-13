DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    isbn VARCHAR(255),
    image_url VARCHAR(255),
    book_description VARCHAR(255),
    bookshelf VARCHAR(255)
);


INSERT INTO books (title, author, isbn, image_url, book_description, bookshelf)
VALUES ('fakeBook', 'Dr Suess', '912-02', 'testurl', 'description of book', 'good books');