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


app.get('/', (request, response) => {
    response.render("students/index");
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
    const id = Number(request.params.id);
    Student.find(id)
    .then(student => {
    const templateData = {};
    templateData.student = student;
    response.render('students/show', templateData);
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

app.get('/houses', (request, reponse) => {
    response.render('/houses');
})

app.get('/houses/:id', (request, response) => {
    const id = Number(request.params.id);
    House.find(id)
        .then(house => {
            const templateData = {};
            templateData.house = house;
        }).then(students => {
            const templateData = {};
            templateData.student = student;
        })
    response.render('houses/show', templateData);
});

app.listen(PORT, () => {
    console.log(`Express web server listening on port ${PORT}`);
});

