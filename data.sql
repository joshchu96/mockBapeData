DROP DATABASE IF EXISTS bape;

CREATE DATABASE bape;

\c bape;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Customers;


CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    product_name TEXT NOT NULL,
    product_price INTEGER NOT NULL,
    other_product_details TEXT
);

CREATE TABLE Customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    other_customer_details TEXT
);

CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES Customers (customer_id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES Products (product_id) ON DELETE CASCADE,
    order_date DATE NOT NULL,
    other_order_details TEXT
);


INSERT INTO Products 
(product_name, product_price, other_product_details)
VALUES 
('Milo Sweater', 250, 'monkey designed sweater'),
('Bapestas', 300, 'mock af1 shoes'),
('Bapepack', 500, '4.5L backpack'),
('Milo snapback', 75, null);

INSERT INTO Customers 
(customer_name, customer_email, other_customer_details)
VALUES
('Josh Choo', 'joshchoo@fakemail.com', 'longtime monkey fnatic'),
('Jacob Sirarcha', 'hotman@fakemail.com', 'streetwear collector'),
('Takashi Yorohama','japaneseman@fakemail.com','GU artist');

INSERT INTO Orders 
(customer_id, product_id, order_date, other_order_details)
VALUES
(1, 2, '2024-09-12', 'Josh wants the bapests is size 10.5' ), --Josh purchased bapestas on 09/12/24
(1,3, '2024-09-11', 'Backpack unit color: Black and Camo'), --Josh purchased bapepack on 09/11/24
(2,1, '2024-12-24', 'Christmas day sale on Sweater apparel 25%'), --Sriracha purchased sweater on 12/24/24
(3,1, '2024-12-24', 'Sweeater Apparel reduce 25% sale'), -- Takashi bought sweater on 12/24/24
(3,4, '2024-11-30', 'Snapback purchased in size: LARGE'); --Takashi bought a hat on 11/31/24






