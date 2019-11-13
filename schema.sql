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
VALUES ('fakeBook', 'Dr Suess', '912-02', 'https://images-na.ssl-images-amazon.com/images/I/51Y0D3occqL._SX373_BO1,204,203,200_.jpg', 'description of book', 'good books');

INSERT INTO books (title, author, isbn, image_url, book_description, bookshelf)
VALUES ('fakeBookTwo', 'JK Rowling', '156-092', 'https://images-na.ssl-images-amazon.com/images/I/51Y0D3occqL._SX373_BO1,204,203,200_.jpg', 'description of book', 'good books');