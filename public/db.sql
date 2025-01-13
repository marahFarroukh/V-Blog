CREATE DATABASE blog ;
CREATE TABLE users (
    id integer unsigned not null,
    user_name varchar(50),
    email varchar(50),
    password varchar(50),
    permission integer / ENUM ("admin" , "writer" , "guest")
    created_at timestamp,
    updated_at timestamp
);