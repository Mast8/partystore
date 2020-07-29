


CREATE DATABASE flowershop;

CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(150) NOT NULL,
  user_email VARCHAR(150) NOT NULL UNIQUE,
  user_password VARCHAR(50) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE roles(
  role_id SERIAL,
  user_id UUID,
  role_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (role_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE products(
  product_id SERIAL,
  product_name VARCHAR(150) NOT NULL,
  product_description VARCHAR(150) NOT NULL,
  product_image VARCHAR(150) NOT NULL,
  product_price VARCHAR(50) NOT NULL,
  PRIMARY KEY (product_id)
);

CREATE TABLE categories(
  category_id SERIAL,
  product_id int,
  category_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (category_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

--fake users data

-- insert into users (user_name, user_email, user_password) values ('Jacob', 'jacob@gmail.com', 'kthl8822');

--fake todos data

-- insert into todos (user_id, description) values ('60dc16dd-c7f1-4fde-827a-90c0e101555c', 'clean room');