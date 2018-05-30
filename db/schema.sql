DROP DATABASE IF EXISTS hogwarts_crud;

CREATE DATABASE hogwarts_crud;

\c hogwarts_crud;

DROP TABLE IF EXISTS houses;

CREATE TABLE houses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    img_url VARCHAR(255)
);

DROP TABLE IF EXISTS students; 

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    image VARCHAR(255),
    house_id INTEGER REFERENCES houses(id)
);

