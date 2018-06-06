const express = require('express');
const promise = require("bluebird");
const pg = require('pg');
const bodyParser = require("body-parser");
const Student = require('./models/Student');
const House = require('./models/House');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", (request, response) => {
    response.render("home/index");
});

app.get('/students', (request, response) => {
    Student.all()
        .then(students => {
            const templateData = {};
            templateData.students = students;
            response.render('students/index.ejs', templateData);
        })
});

app.get('/students/:id', (request, response) => {
    const student_id = request.params.id;
    Student.find(student_id)
    .then(student => {
    response.render('students/show', {student: student});
    })
});

app.get('/houses', (request, response) => {
    House.all()
        .then(houses => {
            const templateData = {};
            templateData.houses = houses;
            response.render('houses/index.ejs', templateData);
        })
});

app.get('/houses/:id', (request, response) => {
    const house_id = request.params.id;
    Promise.all([
        Student.allInHouse(house_id),
        House.find(house_id),
    ]).then(([students, house]) => {
            response.render("houses/show", {students: students, house: house});
        });
});



app.listen(PORT, () => {
    console.log(`Express web server listening on port ${PORT}`);
});

