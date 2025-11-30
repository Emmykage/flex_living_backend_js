CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()

);


 CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    serialNumber VARCHAR(100),
    price DECIMAL(10,2),
    type VARCHAR(100),
    startDate TIMESTAMP,
    status VARCHAR(100),
    warranty VARCHAR(100),
    note TEXT,    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()

    );

    ALTER TABLE products
    ADD COLUMN image_url VARCHAR(255);
