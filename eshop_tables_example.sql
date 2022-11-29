CREATE TABLE products(
    Id INT NOT NULL,
    title varchar(255),
    image varchar(255),
    price decimal(12,2),
    PRIMARY KEY (Id)
)

CREATE TABLE orders(
    id INT NOT NULL,
    customer_name varchar(255),
    customer_email varchar(255),
    PRIMARY KEY (id)
)

CREATE TABLE cart(
    id INT NOT NULL,
    order_id INT,
    product_id INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(Id)
)