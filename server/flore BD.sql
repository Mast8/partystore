


CREATE DATABASE partystore;

CREATE TABLE roles(
  role_id SERIAL,
  role_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(150) NOT NULL,
  user_email VARCHAR(150) NOT NULL UNIQUE,
  user_password VARCHAR(100) NOT NULL,
  PRIMARY KEY (user_id),
  role_id int,
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE categories(
  category_id SERIAL,
  category_name VARCHAR(100) NOT NULL,
  PRIMARY KEY (category_id)
);

CREATE TABLE products(
  product_id SERIAL,
  product_name VARCHAR(150) NOT NULL,
  product_description VARCHAR(150) NOT NULL,
  product_image VARCHAR(150) NOT NULL,
  product_price VARCHAR(50) NOT NULL,
  PRIMARY KEY (product_id),
  category_id int,
  FOREIGN KEY (category_id) REFERENCES categories(category_id) 
);

--fake users data

-- insert into users (user_name, user_email, user_password) values ('Jacob', 'jacob@gmail.com', 'kthl8822');

--fake todos data

-- insert into todos (user_id, description) values ('60dc16dd-c7f1-4fde-827a-90c0e101555c', 'clean room');

insert into roles (role_id, role_name) values (112, 'Admin');
insert into roles (role_id, role_name) values (113, 'Client');

insert into categories (category_id, category_name ) values (1, 'Rent');
insert into categories (category_id, category_name ) values (2, 'Flowers');
insert into categories (category_id, category_name ) values (3, 'Clothes');
insert into categories (category_id, category_name ) values (4, 'Decorations');


