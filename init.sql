DROP TABLE IF EXISTS order_products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_products (
    product_id INTEGER NOT NULL REFERENCES products(id),
    order_id INTEGER NOT NULL REFERENCES orders(id),
    PRIMARY KEY (product_id, order_id)
);

INSERT INTO users (first_name, last_name, email, password)
VALUES (
    'Bruce',
    'Wayne',
    'bruce.wayne@esgi.fr',
    'test123'
);

INSERT INTO products (name, price, image_url)
VALUES
    ('Produit 1', 50, 'https://picsum.photos/id/183/400/275'),
    ('Produit 2', 35, 'https://picsum.photos/id/133/400/275'),
    ('Produit 3', 62, 'https://picsum.photos/id/514/400/275'),
    ('Produit 4', 18, 'https://picsum.photos/id/551/400/275'),
    ('Produit 5', 23, 'https://picsum.photos/id/605/400/275'),
    ('Produit 6', 44, 'https://picsum.photos/id/655/400/275');
