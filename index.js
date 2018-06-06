const express = require('express');
const promise = require("bluebird");
const pg = require('pg');
const bodyParser = require("body-parser");
const Student = require('./models/Student');
const House = require('./models/House');
const methodOverride = require("method-override");


const PORT = process.env.PORT || 3000;

const app = express();
app.use(methodOverride("_method"));

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

app.get('/students/new', (request, response) => {
    House.all().then(houses => {
        response.render('students/new', { houses: houses });
    });
});
app.get('/students/:id', (request, response) => {
    const student_id = request.params.id;
    Student.find(student_id)
    .then(student => {
    response.render('students/show', {student: student});
    })
});

app.post('/students/new', (request, response) => {
    const newStudent = request.body;
    newStudent.id = request.params.id;
    Promise.all([
        Student.create(newStudent),
    ]).then(students=> {
            response.redirect('/students');
        });
});

app.delete("/students/:id", (request, response) => {
    const id = request.params.id;
    Student.delete(id)
        .then(student => {
            response.redirect("..");
        });
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

