const db = require("../db/connection");

const Student = {};

Student.all = () => {
    return db.any('SELECT * FROM students');
}

Student.find = (id) => {
    return db.one('SELECT * FROM students WHERE student_id = ${id}', { id: id });
};

Student.allInHouse = house_id => {
    return db.any(`SELECT * FROM students WHERE house_id = ${house_id}`, {
        house_id: house_id
    });
};
module.exports = Student;