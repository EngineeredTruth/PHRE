CREATE TABLE listings
(
  id serial primary key,
  name varchar(100),
  internal_name varchar(100),
  developer varchar(40),
  project_type varchar(30),
  listing_type varchar(30),
  units varchar(10)[],
  price integer,
  address varchar(255),
  location varchar(255)
);

CREATE TABLE pictures
(
  internal_name varchar(100),
  index integer,
  thumb boolean,
  title varchar(100)
);

CREATE TABLE users
(
  id serial primary key,
  name varchar(60),
  external_id varchar(100)
);
